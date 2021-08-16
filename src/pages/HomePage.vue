<template>
  <q-page>
    <carousel />
  </q-page>
</template>

<script lang="ts">
import Carousel from 'src/components/HomePage/Carousel.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Carousel },
  name: 'HomePage',
});
</script>
