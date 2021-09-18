import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';
import { IToken } from 'src/utils/types';
import { useCrunchyrollStore } from 'src/stores/crunchyroll';
import { api } from './axios';

export default boot(async ({router}) => {
  //
  const store = useCrunchyrollStore();
  if (LocalStorage.has('token')) {
    const token = LocalStorage.getItem('token') as IToken;
    console.log(token);
    if (token.timestamp + token.expires_in * 1000 < Date.now()) {
      console.log('expired');
      if (token.refresh_token) {
        console.log('has refresh token');
        await store.refreshToken();
      }
    } else {
      store.token = token;
      api.defaults.headers = {
        Authorization: 'Bearer ' + token.access_token,
      };
    }
  } else {
    console.log('first time');
  }
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.isAuthenticated) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })
});
