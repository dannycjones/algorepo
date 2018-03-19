<template>
  <section>
    <b-container>
      <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
      <h1>
        Algorithms Repository
      </h1>
      <b-alert show>This website is under development.</b-alert>
      <nuxt-link :to="{ name: 'calculators' }" tag="b-button">Calculator List</nuxt-link>
    </b-container>
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
