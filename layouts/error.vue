<template>
  <section>
    <h1 class="title">
      An error occurred
    </h1>
    <v-alert type="error" :value="true">
      <strong>{{ error.statusCode }}</strong> {{ error.message }}
    </v-alert>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      Homepage
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: ['error']
};
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
