<template>
  <b-container class="container">
    <h1 class="title">
      Users
    </h1>
    <h2 class="info">
      {{ niceName }}
    </h2>
    <b-row>
      <b-col>
        <b-card no-body tag="section">
          <b-list-group flush>
            <b-list-group-item v-for="key in Object.keys(user)" :key="key">{{ `${key}: ${user[key]}` }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
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
