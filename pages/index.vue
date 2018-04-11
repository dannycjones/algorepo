<template>
  <section>
    <h1>
      Algorithms Repository
    </h1>
    <v-alert type="warning" :value="true">
      This website is under development.
    </v-alert>
    <v-btn nuxt :to="{ name: 'calculators' }">View All Calculators</v-btn>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: 'Home'
    };
  }
};
</script>

<style scoped>
</style>
