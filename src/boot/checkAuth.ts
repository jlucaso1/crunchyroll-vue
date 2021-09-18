import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';
import { IToken } from 'src/utils/types';
import { useCrunchyrollStore } from 'src/stores/crunchyroll';
import { api } from './axios';

export default boot(() => {
  //
  if (LocalStorage.has('token')) {
    const token = LocalStorage.getItem('token') as IToken;
    const store = useCrunchyrollStore();
    if (token.timestamp + token.expires_in * 60 * 60 < Date.now()) {
      console.log('expired');
      if (token.refresh_token) {
        console.log('has refresh token');
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
});
