<template>
  <b-container class="container">
    <h1 class="title">
      Calculators
    </h1>
    <h2 class="info">
      {{ calculator.name }}
    </h2>
    <b-row>
      <b-col>
        <b-card title="Calculator" sub-title="Calculate some values..." tag="section">
          <calculator-form :calculator="calculator"></calculator-form>
        </b-card>
      </b-col>
      <b-col sm="4">
        <b-card title="Information" :sub-title="calculator.name" tag="section">
           <b-list-group flush>
            <b-list-group-item v-if="calculator.author"><span class="muted">Authored by </span><nuxt-link :to="{ name: 'users-id', params: { id: calculator.author._id } }"></nuxt-link></b-list-group-item>
            <b-list-group-item>Published {{new Date(calculator.createdAt).toDateString()}}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
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
