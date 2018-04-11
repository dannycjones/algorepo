<template>
  <v-card>
    <v-card-title><h4>{{ niceName }}</h4></v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-tile v-for="key in Object.keys(user)" :key="key">
        <v-list-tile-content>{{key}}:</v-list-tile-content>
        <v-list-tile-content class="align-end">{{ user[key] }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import moment from 'moment';

import axios from '~/plugins/axios';

export default {
  name: 'id',
  asyncData ({ params, error }) {
    return axios.get('/api/users/' + params.id)
      .then((res) => {
        return { user: res.data };
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'user not found' });
      });
  },
  head () {
    return {
      title: `user: ${this.user.name}`
    };
  },
  methods: {
    timeSince (date) {
      return moment(date).fromNow();
    },
    fullDateStr (date) {
      return moment(date).toString();
    }
  },
  computed: {
    niceName () {
      return this.user.name || this.user.username;
    }
  }
};
</script>
<style scoped>
</style>
