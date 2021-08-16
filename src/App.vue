<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useCrunchyrollStore } from './stores/crunchyroll';

export default defineComponent({
  name: 'App',
  setup() {
    useCrunchyrollStore().getToken();
  },
});
</script>
