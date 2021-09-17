<template>
  <q-page padding class="flex items-center justify-center">
    <div class="container column q-gutter-y-md">
      <div class="text-center text-h4">Bem-vindo à Crunchyroll</div>
      <div class="text-center text-subtitle2">
        Cadastre-se ou entre com sua conta para assistir animes fantásticos onde
        quiser.
      </div>
      <q-btn label="Criar Conta" color="orange" />
      <q-btn label="Entrar" color="orange" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  // name: 'PageName'
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>