<template>
  <q-header elevated>
    <q-toolbar class="bg-black-cr q-px-none" style="height: 3.75rem">
      <q-btn icon="menu" flat stretch class="lt-md" />
      <logo />

      <q-btn-group class="gt-sm" stretch flat>
        <q-btn-dropdown
          flat
          stretch
          no-icon-animation
          label="Navegar"
          no-caps
        />
        <q-btn stretch flat to="/" label="Mangá" no-caps />
        <q-btn stretch flat to="/" label="Jogos" no-caps />
        <q-btn stretch flat to="/" label="Notícias" no-caps />
      </q-btn-group>
      <q-space />
      <q-btn icon="search" flat stretch />
      <q-btn icon="bookmark_border" flat stretch class="gt-xs" />
      <q-btn-dropdown flat stretch no-icon-animation>
        <template v-slot:label>
          <q-avatar>
            <img src="https://avatars.githubusercontent.com/u/55464917?v=4" />
          </q-avatar>
        </template>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import Logo from 'src/components/layout/Logo.vue';
export default {
  components: {
    Logo,
  },
};
</script>

<style scoped>
.q-btn-group > * {
  font-size: 1rem;
}
</style>
