<template>
  <q-page>
    <carousel v-if="!loading" />
  </q-page>
</template>

<script lang="ts">
import Carousel from 'src/components/HomePage/Carousel.vue';
import { useCrunchyrollStore } from 'src/stores/crunchyroll';
import { defineComponent, ref, watch } from 'vue';
const $store = useCrunchyrollStore();

export default defineComponent({
  components: { Carousel },
  name: 'HomePage',
  setup() {
    const loading = ref(true);

    const fetchHomeFeed = () => {
      void $store.getHomeFeed().then(() => {
        loading.value = false;
      });
    };
    if (Object.keys($store.token).length == 0) {
      const tokenWatch = watch(
        () => $store.token,
        () => {
          fetchHomeFeed();
          tokenWatch();
        }
      );
    } else {
      fetchHomeFeed();
    }

    const homeFeedItems = $store.homeFeedItems;
    return {
      loading,
      homeFeedItems,
    };
  },
});
</script>
