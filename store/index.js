import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      loginModalVisible: false
    },
    mutations: {
      setUser (state, user) {
        state.user = user;
      },
      clearUser (state) {
        state.user = null;
      },
      setLoginModalVisibility (state, visible) {
        state.loginModalVisible = visible;
      }
    },
    actions: {
      async nuxtServerInit ({ commit }, { req }) {
        if (req.session && req.session.passport && req.session.passport.user) {
          commit('setUser', { username: req.session.passport.user });
        } else {
          commit('clearUser');
        }
      },
      loginModalHidden ({ commit }, ctx) {
        commit('setLoginModalVisibility', false);
      },
      showLoginModal ({ commit }, ctx) {
        commit('setLoginModalVisibility', true);
      },
      setUser ({ commit }, user) {
        commit('setUser', user);
      },
      clearUser ({ commit }) {
        commit('clearUser');
      }
    }
  });
};

export default createStore;
