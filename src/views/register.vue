<template>
  <div class="container-fluid py-5">
    <div v-if="registerError" class="alert alert-danger">
      <p v-if="registerError">{{ message }}</p>
    </div>
    <div class="card col-sm-10 col-md-6 col-lg-6 mx-auto">
      <form class="card-body">
        <div class="form-group">
          <label class="float-left" for="first">First Name</label>
          <input
            type="text"
            class="form-control"
            id="first"
            v-model="firstname"
            placeholder="Enter First Name"
          />
        </div>
        <div class="form-group">
          <label class="float-left" for="last">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="last"
            v-model="lastname"
            placeholder="Enter Last Name"
          />
        </div>
        <div class="form-group">
          <label class="float-left" for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label class="float-left" for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <button
          @click="register"
          type="submit"
          class="btn btn-primary float-right"
        >
          Register
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
  firstname = "";
  lastname = "";
  registerError = false;
  message = "Registeration Failed";

  register() {
    users
      .register({
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      })
      .then(res => {
        if (res.message == "Signup Successfull") {
          this.$router.push({
            path: "login",
            query: {
              resgisterStatus: "true"
            }
          });
        } else {
          this.registerError = true;
          this.message = res.message || "Registeration Failed";
        }
      })
      .catch(err => (this.registerError = err));
  }
}
</script>
