<template>
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
          class="block q-mx-auto"
          :style="{
            width: gtSm ? '100%' : 'calc(55.47% + 1rem)',
            maxWidth: '960px',
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
          <div class="carousel-tabs-text ellipsis-2 text-subtitle2 text-left">
            {{ item.title }}
          </div>
        </q-btn>
      </div>
    </container>
  </div>
</template>

<script lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import { Screen } from 'quasar';
import Container from '../layout/Container.vue';
import { QCarousel } from 'quasar';
const carouselItems = [
  {
    id: 478,
    images: {
      landscape_poster: '1629041017902__ena11.png',
      portrait_poster: '1629041332349_2_0_arousel_1064_1596.png',
    },
    link: 'https://got.cr/fenappep1-car2',
    slug: 'Fena: Pirate Princess Series Premiere',
    title: 'Fena: Pirate Princess Series Premiere',
    description:
      'Watch the two episode premiere of Fena: Pirate Princess right here!',
    button_text: 'WATCH NOW',
  },
  {
    id: 480,
    images: {
      landscape_poster: '1629041374528__ahy33.png',
      portrait_poster: '1628869296677_jahyvertical.png',
    },
    link: 'https://got.cr/jahyep3-car2',
    slug: 'The Great Jahy Will Not Be Defeated! New Episode',
    title: 'The Great Jahy Will Not Be Defeated! New Episode',
    description:
      'Watch the latest episode of The Great Jahy Will Not Be Defeated right here!',
    button_text: 'WATCH NOW',
  },
  {
    id: 481,
    images: {
      landscape_poster: '1629041530309__2_0_1920_1080.png',
      portrait_poster: '1629041535369_1064_1596_obile.png',
    },
    link: 'https://bit.ly/373SLAd',
    slug: 'AD: Honkai Impact 3rd',
    title: 'AD: Honkai Impact 3rd',
    description: 'Check out the latest in Honkai Impact 3rd right HERE!',
    button_text: 'PLAY NOW',
  },
  {
    id: 479,
    images: {
      landscape_poster: '1628869223921__2_0_arousel_1920x1080.png',
      portrait_poster: '1628869231796__2_0_arousel_1064_1596.png',
    },
    link: 'http://got.cr/tokyorevengers-car2',
    slug: 'Tokyo Revengers New Episodes',
    title: 'Tokyo Revengers New Episodes',
    description:
      'Watch the latest episode of Tokyo Revengers only here on Crunchyroll!',
    button_text: 'WATCH NOW',
  },
  {
    id: 482,
    images: {
      landscape_poster:
        '1628869526065_21_05_ames_itrasphere_ey_rt2_nsite_ifecycle_arousel_2_0_3200x1800px.jpg',
      portrait_poster:
        '1628869535906_21_05_ames_itrasphere_ey_rt2_nsite_ifecycle_arousel_2_0_1800x2700px.jpg',
    },
    link: 'https://got.cr/mitra_carousel_20',
    slug: 'Mitrasphere Global Launch',
    title: 'Mitrasphere Global Launch',
    description:
      'Play the latest mobile RPG from Crunchyroll Games Mitrasphere today!',
    button_text: 'PLAY NOW',
  },
  {
    id: 483,
    images: {
      landscape_poster: '1628869600477__arousel_2_0_.jpg',
      portrait_poster: '1628869607182__arousel_2_0_2_.jpg',
    },
    link: 'https://got.cr/August2021SotS-car2',
    slug: 'Crunchyroll Store Pre-Orders Closing',
    title: 'Crunchyroll Store Pre-Orders Closing',
    description:
      "Don't miss out on these pre-orders before they close in the Crunchyroll Store!",
    button_text: 'SHOP NOW',
  },
];
export default {
  components: { Container },
  setup() {
    const tabProgress = ref(0);
    const carousel = ref<QCarousel>();
    const activeTabName = ref(0);

    var interval = setInterval(() => {
      tabProgress.value += 60 / 6000;
    }, 60);

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
      carousel,
      slide: ref(0),
      carouselItems,
      gtSm: computed(() => Screen.gt.sm),
      activeTabName,
      carouselImages: () => {
        const images = [];
        for (let i = 0; i < carouselItems.length; i++) {
          if (Screen.gt.sm) {
            images.push(
              'https://static.crunchyroll.com/fms/landscape_poster/960x540/' +
                carouselItems[i].images.landscape_poster
            );
          } else {
            images.push(
              'https://static.crunchyroll.com/fms/portrait_poster/426x639/' +
                carouselItems[i].images.portrait_poster
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
