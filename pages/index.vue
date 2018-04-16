<template>
  <section id="jumbo-container">
    <v-jumbotron id="jumbo" color="primary darken-4" dark height="100%">
      <no-ssr>
        <vue-particles color="#aaaaaa"  id="particles-js" shapeType="triangle"></vue-particles>
      </no-ssr>
      <v-container id="jumbo-inner-container" fill-height>
        <v-layout align-center class="text-xs-center">
          <v-flex>
            <h3 class="display-3">AlgoRepo</h3>
            <span class="subheading">A website for publishing all kinds of algorithms</span>
            <v-spacer class="my-3"></v-spacer>
            <div class="title mb-3">Check out the latest published calculators!</div>
            <v-btn nuxt :to="{ name: 'calculators' }" large color="primary" class="mx-0">See more</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: 'Home'
    };
  },
  layout: 'borderless'
};
</script>

<style scoped>
#jumbo {
  position: relative;
}

#jumbo-container {
  height: 100%;
}

#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
