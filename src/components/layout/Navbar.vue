<template>
  <q-header elevated>
    <q-toolbar
      class="bg-black-cr"
      :class="{ 'q-px-none': ltSm }"
      style="height: 3.75rem"
    >
      <q-btn icon="menu" flat stretch class="lt-md" />
      <q-btn stretch flat dense to="/">
        <logo />
      </q-btn>
      <q-btn-group class="gt-sm q-px-sm" stretch flat>
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
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </template>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import Logo from 'src/components/layout/Logo.vue';
import { Screen } from 'quasar';
export default {
  components: {
    Logo,
  },
  setup() {
    return {
      ltSm: Screen.lt.sm,
    };
  },
};
</script>
