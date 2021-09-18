<template>
  <q-btn-dropdown flat stretch v-if="profile.avatar">
    <template v-slot:label>
      <q-avatar>
        <img
          :src="`https://static.crunchyroll.com/assets/avatar/170x170/${profile?.avatar}`"
        />
      </q-avatar>
    </template>
    <div>
      <div class="items-center q-mx-md q-gutter-y-md q-py-md">
        <div class="flex items-center q-gutter-x-md">
          <q-avatar size="64px">
            <img
              :src="`https://static.crunchyroll.com/assets/avatar/170x170/${profile?.avatar}`"
            />
          </q-avatar>

          <div class="text-subtitle2 q-mt-md q-mb-xs">
            {{ profile?.username }}
          </div>
        </div>

        <q-btn
          color="warning"
          label="VIRAR PREMIUM"
          icon="workspace_premium"
          class="full-width"
        />
      </div>
      <q-separator color="white" size="2px" />
      <q-btn flat dense>
        <div class="row q-mx-md q-gutter-y-md q-py-md q-gutter-x-md">
          <div><q-icon name="person" size="md" /></div>
          <div>
            <div>Minha Conta</div>
            <sub>Gerencie seu perfil e configurações.</sub>
          </div>
        </div>
      </q-btn>
      <div>
        <q-btn label="Sair da conta" color="red" @click="OnLogout"/>
      </div>
    </div>
  </q-btn-dropdown>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import { useCrunchyrollStore } from 'src/stores/crunchyroll';
import {useRouter} from 'vue-router'
import { Notify } from 'quasar';
export default {
  setup() {
    const store = useCrunchyrollStore();
    const loading = ref(true);
    const profile = computed(() => store.profile);
    const router = useRouter();
    onMounted(() => {
      store.getProfile().finally(() => (loading.value = true));
    })
    return {
      loading,
      profile,
      OnLogout() {
        void store.logout().then(() => {
          void router.push('/auth');
          Notify.create({message: 'Você saiu com sucesso!', color: 'success'})
        });
      }
    };
  },
};
</script>
