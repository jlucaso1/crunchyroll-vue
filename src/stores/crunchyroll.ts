import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';
import { IHomeFeedItem, IProfile, IToken, ITokenCms } from 'src/utils/types';

export const useCrunchyrollStore = defineStore({
  id: 'crunchyroll',
  state: () => ({
    token: {} as IToken,
    tokenCms: {} as ITokenCms,
    homeFeedItems: [] as IHomeFeedItem[],
    profile: {} as IProfile,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !this.tokenExpired;
    },
    tokenExpired(): boolean {
      if(Object.entries(this.token).length == 0) {
        return true;
      }
      return this.token.timestamp + this.token.expires_in * 60 * 60 < Date.now()
    }
  },
  actions: {
    login(auth: { username: string; password: string }) {
      const data = {
        username: auth.username,
        password: auth.password,
        grant_type: 'password',
        scope: 'offline_access',
      };
      return api({
        method: 'post',
        url: '/auth/v1/token',
        headers: {
          Authorization:
            'Basic c3FrbHVramp3Mmp3cGk0ajVsdnQ6cEdLM2d3UjRJZlhzeEstMnl1SGxaSXlqU25wR1JLdVc=',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: new URLSearchParams(data),
      }).then((res) => {
        this.token = res.data as IToken;
        this.token.timestamp = Date.now();
        api.defaults.headers = {
          Authorization: 'Bearer ' + this.token.access_token,
        };
        LocalStorage.set('token', this.token);
      });
    },
    logout() {
      return new Promise((resolve) => {
        this.token = {} as IToken;
        this.tokenCms = {} as ITokenCms;
        this.profile = {} as IProfile;
        this.homeFeedItems = [] as IHomeFeedItem[];
        LocalStorage.clear();
        resolve(null);
      })
    },
    getToken() {
      return api
        .post('/auth/v1/token', 'grant_type=client_id', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic cnFpM2drNHhiMXphenZpdHF3aHI6S0RTZV96cy15R2JQYUlocDhBcEpycFR6MndMSXBXd2s=',
          },
        })
        .then(({ data: token }: { data: IToken }) => {
          this.token = token;
          api.defaults.headers = {
            Authorization: 'Bearer ' + token.access_token,
          };
          // return this.getCmsToken();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCmsToken() {
      return api
        .get('/index/v2')
        .then(({ data: { tokenCms } }: { data: { tokenCms: ITokenCms } }) => {
          this.tokenCms = tokenCms;
          api.defaults.params = {
            Policy: tokenCms.policy,
            Signature: tokenCms.signature,
            'Key-Pair-Id': tokenCms.key_pair_id,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHomeFeed() {
      return api
        .get('/content/v1/home_feed')
        .then(({ data: { items } }: { data: { items: IHomeFeedItem[] } }) => {
          this.homeFeedItems = items;
          return items;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProfile() {
      return api('/accounts/v1/me/profile').then((res) => {
        this.profile = res.data as IProfile;
      });
    },
    refreshToken() {
      return api({
        method: 'POST',
        url: '/auth/v1/token',
        headers: {
          'authorization': 'Basic bm9haWhkZXZtXzZpeWcwYThsMHE6',
        }
      }).then((res) => {
        this.token = res.data as IToken;
        this.token.timestamp = Date.now();
        api.defaults.headers = {
          Authorization: 'Bearer ' + this.token.access_token,
        };
        LocalStorage.set('token', this.token);
      })
    }
  },
});
