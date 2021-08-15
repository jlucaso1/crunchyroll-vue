<template>
  <q-layout view="hHh lpR fFf">
    <navbar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Navbar from 'src/components/layout/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
