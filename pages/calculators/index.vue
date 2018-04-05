<template>
  <section>
    <b-container>
      <h1 class="title">
        Calculators
      </h1>
      <b-list-group>
        <b-list-group-item v-for="calculator in calculators" :key="calculator._id" :to="{ name: 'calculators-id', params: { id: calculator._id } }" class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ calculator.name }}</h5>
            <small>{{ 'Updated ' + timeSince(calculator.updatedAt) }}</small>
          </div>
          <p v-if="calculator.description" class="mb-1">
            {{ calculator.description }}
          </p>
          <small v-if="calculator.author && calculator.author.name">Published by {{ calculator.author.name }}.</small>
        </b-list-group-item>
      </b-list-group>
    </b-container>
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
    }
  }
};
</script>

<style scoped>
</style>
