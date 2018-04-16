<template>
  <v-app>
    <my-header />
    <nuxt />
    <my-footer />
    <login-modal :visible="loginDialogVisible" />
  </v-app>
</template>

<script>
import MyHeader from '~/components/Header.vue';
import MyFooter from '~/components/Footer.vue';
import LoginModal from '~/components/LoginModal.vue';

export default {
  components: {
    MyHeader,
    MyFooter,
    LoginModal
  },
  computed: {
    loginDialogVisible () {
      return this.$store.state.loginDialogVisible;
    }
  }
};
</script>

<style>
</style>
