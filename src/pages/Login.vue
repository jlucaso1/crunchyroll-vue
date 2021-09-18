<template>
  <q-page padding class="flex justify-center items-center">
    <q-form @submit="onSubmit" class="q-gutter-y-sm container">
      <q-img
        src="https://logodownload.org/wp-content/uploads/2020/02/crunchyroll-logo.png"
      />
      <q-input
        filled
        v-model="username"
        label="E-mail ou Nome de Usuário"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Por favor digite algo!']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Senha"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Por favor digite algo!']"
      />
      <div>
        <q-btn label="Entrar" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { useCrunchyrollStore } from 'src/stores/crunchyroll';
import { ref } from 'vue';

import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {},
  setup() {
    const store = useCrunchyrollStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    return {
      username,
      password,

      onSubmit() {
        store
          .login({ username: username.value, password: password.value })
          .then(() => {
            void router.push('/');
            console.log('sucesso');
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
