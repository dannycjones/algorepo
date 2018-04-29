<template>
  <div>
    <h1>Calculators</h1>
    <h2>{{ calculator.name }}</h2>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 sm8>
          <v-card>
            <v-card-title primary-title>
              <h3 class="headline mb-0">Calculator</h3>
              <calculator-form :calculator="calculator"></calculator-form>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Information</h3>
                <span v-if="calculator.description">{{ calculator.description }}</span>
                <v-list dense>
                  <v-list-tile v-if="calculator.author">
                    <v-list-tile-content>Author:</v-list-tile-content>
                    <v-list-tile-content class="align-end"><nuxt-link :to="{ name: 'users-id', params: { id: calculator.author._id } }">{{ calculator.author.name || calculator.author.username }}</nuxt-link></v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Published:</v-list-tile-content>
                    <v-tooltip>
                      <v-list-tile-content class="align-end" slot="activator">{{ timeSince(calculator.createdAt) }}</v-list-tile-content>
                      <span>fullDateStr(calculator.createdAt)</span>
                    </v-tooltip>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Updated:</v-list-tile-content>
                    <v-tooltip>
                      <v-list-tile-content class="align-end" slot="activator">{{ timeSince(calculator.updatedAt) }}</v-list-tile-content>
                      <span>fullDateStr(calculator.updatedAt)</span>
                    </v-tooltip>
                  </v-list-tile>
                </v-list>
              </div>
            </v-card-title>
            <v-btn nuxt :to="{ name: 'calculators-id-edit', params: { id: calculator._id } }">Edit</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn nuxt :to="{ name: 'calculators' }">Back to All Calculators</v-btn>
  </div>
</template>

<script>
import moment from 'moment';

import axios from '~/plugins/axios';
import CalculatorForm from '~/components/calculators/view/CalculatorForm.vue';

export default {
  name: 'id',
  asyncData ({ params, error }) {
    return axios.get('/api/calculators/' + params.id)
      .then((res) => {
        return { calculator: res.data };
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'calculator not found' });
      });
  },
  head () {
    return {
      title: `calculator: ${this.calculator.name}`
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
  components: {
    CalculatorForm
  }
};
</script>
<style scoped>
</style>
