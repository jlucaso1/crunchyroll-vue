<template>
  <q-layout view="hHh lpR fFf">
    <navbar />
    <q-page-container>
      <router-view />
    </q-page-container>
    <c-footer />
  </q-layout>
</template>

<script lang="ts">
import Navbar from 'src/components/layout/Navbar.vue';
import CFooter from 'src/components/layout/CFooter.vue';

export default {
  components: {
    Navbar,
    CFooter,
  },
};
</script>
