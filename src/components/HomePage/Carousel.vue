<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <keep-alive>
      <div>
        <q-carousel
          swipeable
          :autoplay="6000"
          infinite
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="white"
          height="100%"
          arrows
          ref="carousel"
          keep-alive
          @update:model-value="OnUpdateCarousel"
        >
          <q-carousel-slide
            v-for="(item, index) in carouselItems"
            :key="index"
            :name="index"
            class="q-px-auto q-py-lg"
            :class="index % 2 ? 'bg-orange' : 'bg-info'"
          >
            <q-img
              @click="$router.push('/series/' + item.id)"
              class="block q-mx-auto cursor-pointer"
              :style="{
                width: gtSm ? '100%' : 'calc(55.47% + 1rem)',
                maxWidth: gtSm ? '960px' : '426px',
                maxHeight: gtSm ? '540px' : '639px',
              }"
              :src="carouselImages()[index]"
            />
          </q-carousel-slide>
        </q-carousel>
        <container>
          <div class="carousel-tabs" v-if="gtSm">
            <q-btn
              v-for="(item, index) in carouselItems"
              :key="index"
              class="carousel-tabs-tab no-border-radius"
              :class="index == activeTabName ? 'bg-secondary' : 'bg-black-cr'"
              no-caps
              dense
              flat
              @click="OnClickCarouselTab(index)"
            >
              <q-linear-progress
                v-if="index == activeTabName"
                :value="tabProgress"
                class="absolute-top"
                color="orange"
              />
              <div
                class="carousel-tabs-text ellipsis-2 text-subtitle2 text-left"
              >
                {{ item.title }}
              </div>
            </q-btn>
          </div>
        </container>
      </div>
    </keep-alive>
  </transition>
</template>

<script lang="ts">
import { ref, computed, onUnmounted, onMounted } from 'vue';
import { Screen } from 'quasar';
import Container from '../layout/Container.vue';
import { QCarousel } from 'quasar';
import { useCrunchyrollStore } from 'src/stores/crunchyroll';
import { api } from 'src/boot/axios';
import { ICarouselItem } from 'src/utils/types';
export default {
  components: { Container },
  setup() {
    const $store = useCrunchyrollStore();
    const tabProgress = ref(0);
    const carousel = ref<QCarousel>();
    const activeTabName = ref(0);
    const loading = ref(true);

    var interval = setInterval(() => {
      tabProgress.value += 60 / 6000;
    }, 60);

    onUnmounted(() => {
      clearInterval(interval);
    });
    const carouselItems = ref<ICarouselItem[]>([]);
    onMounted(() => {
      void api
        .get($store.homeFeedItems[0].__links__.resource.href)
        .then(({ data: { items } }: { data: { items: ICarouselItem[] } }) => {
          carouselItems.value = items;
          loading.value = false;
        });
    });

    return {
      loading,
      carousel,
      slide: ref(0),
      carouselItems,
      gtSm: computed(() => Screen.gt.sm),
      activeTabName,
      carouselImages: () => {
        const images = [];
        for (let i = 0; i < carouselItems.value.length; i++) {
          if (Screen.gt.sm) {
            images.push(
              'https://static.crunchyroll.com/fms/landscape_poster/960x540/' +
                carouselItems.value[i].images.landscape_poster
            );
          } else {
            images.push(
              'https://static.crunchyroll.com/fms/portrait_poster/426x639/' +
                carouselItems.value[i].images.portrait_poster
            );
          }
        }
        return images;
      },
      tabProgress,
      OnUpdateCarousel: (name: number) => {
        tabProgress.value = 0;
        activeTabName.value = name;
      },
      OnClickCarouselTab: (name: number) => {
        carousel.value?.goTo(name);
      },
    };
  },
};
</script>

<style scoped lang="scss">
.carousel-tabs {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  grid-gap: 0.75rem;
  gap: 0.75rem;
  grid-auto-columns: minmax(auto, 10.25rem);
  margin-top: 1.25rem;
}
.carousel-tabs-text {
  line-height: 1rem;
  font-size: 0.75rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #fff;
  display: -webkit-box;
  max-height: 2rem;
  overflow: hidden;
  text-align: left;
}
.carousel-tabs-tab {
  padding: 0.6875rem 0.5rem;
}
</style>
