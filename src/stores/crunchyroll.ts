import { defineStore } from 'pinia';

export const useCounterStore = defineStore('crunchyroll', {
  state() {
    return { count: 0 };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
});
