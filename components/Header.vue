<template>
  <header>
    <v-toolbar color="primary" dark>
      <nuxt-link tag="v-toolbar-title" :to="{ name: 'index' }">AlgoRepo</nuxt-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn nuxt :to="{ name: 'calculators' }" flat>Calculators</v-btn>
        <v-menu offset-y v-if="user">
          <v-btn flat color="primary" dark slot="activator">{{ userDisplayName }} <v-icon>arrow_drop_down</v-icon></v-btn>
          <v-list>
            <v-list-tile nuxt :to="{ name: 'users-id' }" disabled>
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile @click="onLogoutClick">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn v-else @click.native.stop="showLoginDialog" flat>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </header>
</template>

<script>
import axios from '~/plugins/axios';

export default {
  computed: {
    user () {
      return this.$store.state.user;
    },
    userDisplayName () {
      return this.user.name || this.user.username;
    }
  },
  methods: {
    showLoginDialog () {
      this.$store.commit('showLoginDialog');
    },
    onLogoutClick () {
      axios.get('/api/auth/logout').then(res => {
        this.$store.commit('clearUser');
      }).catch(console.error);
    }
  }
};
</script>
