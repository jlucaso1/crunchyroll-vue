<template>
  <footer class="footer">
    <container>
      <div class="flex wrap justify-between">
        <div class="list">
          <div class="text-h6">Navegação</div>
          <router-link to="/">Séries Populares</router-link>
          <router-link to="/">Séries em Simulcast</router-link>
          <router-link to="/">Ler Mangá</router-link>
          <router-link to="/">Calendário de Lançamentos</router-link>
          <router-link to="/">Originals</router-link>
          <router-link to="/">Notícias</router-link>
          <router-link to="/">Fórum</router-link>
          <router-link to="/">Jogos</router-link>
        </div>
        <div class="list">
          <div class="text-h6">Contate-nos</div>
          <router-link to="/">Youtube</router-link>
          <router-link to="/">Facebook</router-link>
          <router-link to="/">Twitter</router-link>
          <router-link to="/">Instagram</router-link>
        </div>
      </div>
    </container>
  </footer>
</template>

<script>
import Container from './Container.vue';
export default {
  components: {
    Container,
  },
};
</script>

<style>
.foo Containerter {
  background: #000 linear-gradient(180deg, #0000, #213944);
  position: relative;
}
.list > * {
  display: flex;
  color: white;
  text-decoration: none;
}
.sections {
  display: flex;
  flex-wrap: wrap;
}
</style>
