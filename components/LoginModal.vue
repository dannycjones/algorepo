<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="visible" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="form.username" label="Username" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="form.password" label="Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="hide">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="onLoginClick">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-snackbar :timeout="6000" :color="this.snackbar.type" v-model="this.snackbar.show">
      {{ this.snackbar.message }}
      <v-btn dark flat @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </div>
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
      },
      snackbar: {
        message: undefined,
        type: undefined,
        show: false
      }
    };
  },
  methods: {
    onLoginClick (e) {
      e.preventDefault();
      this.attemptLogin();
    },
    hide () {
      this.$store.commit('hideLoginDialog');
    },
    loginFailedSnackbar () {
      this.closeSnackbar();
      this.snackbar.type = 'error';
      this.snackbar.message = 'Login failed.';
      this.snackbar.show = true;
    },
    loginSuccessfulSnackbar () {
      this.closeSnackbar();
      const user = this.$store.state.user;
      this.snackbar.type = 'success';
      this.snackbar.message = `Login succeeded. Welcome back, ${ user.name || user.username }.`;
      this.snackbar.show = true;
    },
    loggedOutSnackbar () {
      this.closeSnackbar();
      this.snackbar.type = 'info';
      this.snackbar.message = 'You have been logged out.';
      this.snackbar.show = true;
    },
    closeSnackbar () {
      this.snackbar.show = false;
    },
    attemptLogin () {
      axios.post('/api/auth/login', { ...this.form }).then(res => {
        this.$store.commit('setUser', res.data.user);
        this.loginSuccessfulSnackbar();
        this.hide();
      }).catch(e => {
        console.error(e);
        this.loginFailedSnackbar();
        this.$store.commit('clearUser');
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
