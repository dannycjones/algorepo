<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Calculators
    </h1>
    <h2 class="info">
      {{ calculator.name }}
    </h2>
    <b-container>
      <b-row v-for="uComp in calculator.userComponents" :key="uComp.id">
        <b-form-group v-if="uComp.type.render.tag === 'input'" v-bind:label="uComp.label" v-bind:label-for="uComp.id">
          <b-input v-bind:id="uComp.id" v-model="uComp.value" v-bind:type="uComp.type.render.type"></b-input>
        </b-form-group>
      </b-row>
    </b-container>
    <nuxt-link tag="b-button" :to="{ name: 'calculators' }">
      All Calculators
    </nuxt-link>
  </section>
</template>

<script>
import axios from '~/plugins/axios';

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
  }
};
</script>

<style scoped>
</style>
