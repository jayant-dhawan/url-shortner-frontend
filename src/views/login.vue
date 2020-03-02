<template>
  <div class="container-fluid py-5">
    <div
      v-if="$route.query.resgisterStatus"
      class="alert alert-success col-sm-10 col-md-6 col-lg-6 mx-auto"
    >
      <p>Registeration Successful. Please Login</p>
    </div>
    <div
      v-if="loginFailed"
      class="alert alert-danger col-sm-10 col-md-6 col-lg-6 mx-auto"
    >
      <p>Username/Password donot match</p>
    </div>
    <div
      v-if="loginError"
      class="alert alert-danger col-sm-10 col-md-6 col-lg-6 mx-auto"
    >
      <p>There is some error</p>
    </div>
    <div class="card col-sm-10 col-md-6 col-lg-6 mx-auto">
      <form class="card-body">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <button
          @click="login"
          type="submit"
          class="btn btn-primary float-right"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/users";

@Component
export default class Register extends Vue {
  email = "";
  password = "";
  loginError = false;
  loginFailed = false;

  login() {
    users
      .login({
        email: this.email,
        password: this.password
      })
      .then(res => {
        if (res.email == this.email) {
          this.$router.push({
            path: "/",
            params: {
              resgisterStatus: "true"
            }
          });
        } else {
          this.loginFailed = true;
        }
      })
      .catch(err => {
        this.loginError = err;
      });
  }
}
</script>
