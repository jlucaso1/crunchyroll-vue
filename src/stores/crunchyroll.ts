import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { IHomeFeedItem, IToken, ITokenCms } from 'src/utils/types';

export const useCrunchyrollStore = defineStore({
  id: 'crunchyroll',
  state: () => ({
    token: {} as IToken,
    tokenCms: {} as ITokenCms,
    homeFeedItems: [] as IHomeFeedItem[],
  }),
  actions: {
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
  },
});
