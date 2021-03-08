import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMultiTabState from 'vuex-multi-tab-state';

export default createStore({
  state: {
    presence: {
      startTimestamp: null,
      endTimestamp: null,
      details: 'I just installed Discord RPC!',
      state: 'Made by AlekEagle',
      largeImageKey: 'logo',
      largeImageText: 'Discord RPC',
      smallImageKey: 'alek',
      smallImageText: 'Made by AlekEagle',
      buttons: [],
      applicationID: '556520551451983881'
    }
  },
  mutations: {
    appID(state: any, payload) {
      state.presence.applicationID = payload;
    },
    timestamps(state: any, payload) {
      if (!payload) {
        state.presence.startTimestamp = null;
        state.presence.endTimestamp = null;
        return;
      }
      state.presence.startTimestamp =
        payload.end && !payload.start ? new Date(Date.now()) : payload.start;
      state.presence.endTimestamp = payload.end;
    },
    largeImage(state: any, payload) {
      if (!payload || !payload.key) {
        state.presence.largeImageKey = null;
        state.presence.largeImageText = '';
        return;
      }
      state.presence.largeImageKey = payload.key;
      state.presence.largeImageText = payload.text;
    },
    smallImage(state: any, payload) {
      if (!payload || !payload.key) {
        state.presence.smallImageKey = null;
        state.presence.smallImageText = '';
        return;
      }
      state.presence.smallImageKey = payload.key;
      state.presence.smallImageText = payload.text;
    },
    details(state: any, payload) {
      state.presence.details = payload.details;
      state.presence.state = payload.state;
    },
    buttons(state: any, payload) {
      state.presence.buttons = payload;
    }
  },
  getters: {
    presence: (state: any) => {
      return state.presence;
    },
    appID(state: any) {
      return state.presence.applicationID;
    },
    timestamps(state: any) {
      return {
        start: state.presence.startTimestamp,
        end: state.presence.endTimestamp
      };
    },
    largeImage(state: any) {
      return {
        key: state.presence.largeImageKey,
        text: state.presence.largeImageText
      };
    },
    smallImage(state: any) {
      return {
        key: state.presence.smallImageKey,
        text: state.presence.smallImageText
      };
    },
    details(state: any) {
      return {
        details: state.presence.details,
        state: state.presence.state
      };
    },
    buttons(state: any) {
      return state.presence.buttons;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState(), createMultiTabState()]
});
