<template>
  <div>
    <my-header />
    <nuxt />
    <my-footer />
    <login-modal v-if="loginModalVisible" :visible="loginModalVisible" />
  </div>
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
    loginModalVisible () {
      return this.$store.state.loginModalVisible;
    }
  }
};
</script>

<style>
</style>
