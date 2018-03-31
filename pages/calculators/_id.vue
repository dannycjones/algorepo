<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
        <h1 class="title">
          Calculators
        </h1>
        <h2 class="info">
          {{ calculator.name }}
        </h2>
        <calculator-form :calculator="calculator"></calculator-form>
        <nuxt-link tag="b-button" :to="{ name: 'calculators' }">
          All Calculators
        </nuxt-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios';
import CalculatorForm from '~/components/CalculatorForm.vue';

export default {
  name: 'id',
  asyncData ({ params, error }) {
    return axios.get('/api/calculators/' + params.id)
      .then((res) => {
        return { calculator: res.data, hello: 7, inputType: 'select' };
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
  components: {
    CalculatorForm
  }
};
</script>
<style scoped>
</style>
