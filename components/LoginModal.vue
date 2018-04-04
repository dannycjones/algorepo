<template>
  <b-modal ref="modal" id="loginModal" title="Login" :visible="visible" @hidden="onHidden" @ok="onOkClick" size="sm" ok-title="Login">
    <b-form @submit="onFormSubmit">
      <b-form-group label="Username" label-for="username">
        <b-form-input id="username" type="text" v-model="form.username" required placeholder="Enter username..."></b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="password">
        <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter password..."></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import axios from '~/plugins/axios';

export default {
  props: {
    visible: Boolean
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    onHidden () {
      this.$store.dispatch('loginModalHidden');
    },
    onOkClick (e) {
      e.preventDefault();
      this.attemptLogin();
    },
    onFormSubmit (e) {
      e.preventDefault();
      this.attemptLogin();
    },
    attemptLogin () {
      axios.post('/api/auth/login', { ...this.form }).then(res => {
        this.$store.dispatch('setUser', res.data.user);
        this.$refs.modal.hide();
      }).catch(e => {
        console.error(e);
        this.$store.dispatch('clearUser');
      });
    }
  },
  watch: {
    formData: {
      deep: true,
      handler () {
        return axios.post(`/api/calculators/${this.calculator.id}/calculate`, { formData: this.formData })
          .then(res => {
            Object.entries(res.data.results).forEach(([key, value]) => {
              this.resultBlockValues[key] = value;
            });
          })
          .catch(console.error);
      }
    }
  }
};
</script>
