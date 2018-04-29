<template>
  <section>
    <h1 class="title">
      Calculators
    </h1>
    <v-layout row>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-list two-line>
            <template v-for="(calculator, index) in calculators">
              <v-list-tile nuxt :to="{ name: 'calculators-id', params: { id: calculator._id } }" ripple :key="calculator._id">
                <v-list-tile-content>
                  <v-list-tile-title>{{ calculator.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ calculator.description }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ 'Updated ' + timeSince(calculator.updatedAt) }}</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < calculators.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn @click="onNewClick" color="primary">New Calculator</v-btn>
  </section>
</template>

<script>
import moment from 'moment';

import axios from '~/plugins/axios';

export default {
  async asyncData () {
    let { data } = await axios.get('/api/calculators');
    return { calculators: data };
  },
  head () {
    return {
      title: 'calculators'
    };
  },
  methods: {
    timeSince (date) {
      return moment(date).fromNow();
    },
    async onNewClick () {
      const calculator = {
        name: 'My New Calculator',
        description: '',
        blocks: []
      }

      const { data: { calculator: newCalc } } = await axios.post('/api/calculators', { calculator });
      console.log('newCalc', newCalc);

      this.$router.push({ name: 'calculators-id', params: { id: newCalc._id } });
    }
  }
};
</script>

<style scoped>
</style>
