<template>
  <section>
    <b-container>
      <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
      <h1 class="title">
        CALCULATORS
      </h1>
      <b-alert show>Default Alert</b-alert>
      <ul class="calculators">
        <li v-for="calculator in calculators" :key="calculator._id" class="calculator">
          <nuxt-link :to="{ name: 'calculators-id', params: { id: calculator._id }}">
            {{ calculator.name }}
          </nuxt-link>
        </li>
      </ul>
    </b-container>
  </section>
</template>

<script>
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
  }
};
</script>

<style scoped>
</style>
