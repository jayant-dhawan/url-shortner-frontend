<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">URL Shortner</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="!user" to="/login"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="!user" to="/register"
            >Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="user" to="/mylinks"
            >My Links</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="user" to="/register"
            >Logout</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/users";

@Component
export default class NavBar extends Vue {
  get user() {
    return users.user;
  }
}
</script>
