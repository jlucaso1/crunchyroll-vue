<template>
  <q-page>
    <carousel />
    <container>Conteúdo</container>
  </q-page>
</template>

<script lang="ts">
import Carousel from 'src/components/HomePage/Carousel.vue';
import Container from 'src/components/layout/Container.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Container, Carousel },
  name: 'HomePage',
});
</script>
