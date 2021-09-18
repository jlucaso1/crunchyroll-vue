<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useCrunchyrollStore } from './stores/crunchyroll';
// import { useCrunchyrollStore } from './stores/crunchyroll';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useCrunchyrollStore();
    if (Object.entries(store.token).length === 0) {
      void useRouter().replace('/auth');
    }
  },
});
</script>
