<template>
  <div class="flex justify-center q-pa-xl">
    <q-card style="max-width: 300px">
      <div class="q-pa-md">
        <q-img src="statics/Capture.PNG" />
        <h5 class="login-title">Logins</h5>
        <div class="row gutter-md">
          <div class="col-xs-12">
            <q-input
              float-label="Email"
              v-model="credentials.email"
              @keyup.enter="onSubmit"
            />
          </div>
          <div class="col-xs-12">
            <q-input
              type="password"
              float-label="Password"
              v-model="credentials.password"
              @keyup.enter="onSubmit"
            />
          </div>
        </div>
        <div class="text-center" style="margin-top: 30px">
          <q-btn color="primary" @click="login">
            <span v-if="!loading">LOG IN</span>
            <q-spinner-dots v-else />
          </q-btn>
        </div>
      </div>
    </q-card>
  </div>

  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Check Credentials</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        An error has ocurred while login in. Check your user data.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
/* es-lint-disable */
import { auth } from "boot/firebase";
import firebase from "firebase";
import { db } from "boot/firebase";
import store from "src/store/module/index";

export default {
  name: "LoginPage",
  data() {
    return {
      loading: false,
      alert: false,
      credentials: {
        email: "admin@wcl.com", //'luca.martella@gmail.com',
        password: "123456", //'Migdol486!'
      },
    };
  },
  methods: {
    onSubmit: function (event) {
      event.preventDefault();
      this.login();
    },
    login: async function () {
      this.loading = true;
      auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        auth
          .signInWithEmailAndPassword(
            this.credentials.email,
            this.credentials.password
          )
          .then(() => {
            window.location.href = "/";
            // noop
          })
          .catch((err) => {
            // that.$q.dialog({
            //   title: 'Error',
            //   message:
            //     'An error has ocurred while login in. Check your user data. ' + err
            // })
            this.alert = true;
          });
      });
    },
  },
};
</script>
