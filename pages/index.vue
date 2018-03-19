<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      CALCULATORS
    </h1>
    <ul class="calculators">
      <li v-for="(calculator, index) in calculators" :key="index" class="calculator">
        <nuxt-link :to="{ name: 'calculators-id', params: { id: index }}">
          {{ calculator.name }}
        </nuxt-link>
      </li>
    </ul>
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
.title
{
  margin: 30px 0;
}
.calculators
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.calculator
{
  margin: 10px 0;
}
</style>
