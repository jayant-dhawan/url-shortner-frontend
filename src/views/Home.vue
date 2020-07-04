<template>
  <div class="home">
    <div v-if="user">
      <div class="container-fluid">
        <div
          v-if="shortFailed"
          class="alert alert-danger col-sm-10 col-md-6 col-lg-6 mx-auto"
        >
          <p>Shorten URL failed. Try again</p>
        </div>
        <div
          v-if="shortError"
          class="alert alert-danger col-sm-10 col-md-6 col-lg-6 mx-auto"
        >
          <p>There is some error</p>
        </div>
        <div class="row py-5 m-2">
          <div
            class="card col-sm-10 col-md-5 col-lg-5 p-3"
            style="margin: inherit;"
          >
            <form @submit.prevent>
              <div class="form-group">
                <label for="url" class="float-left">Enter Big URL:</label>
                <input
                  type="text"
                  class="form-control"
                  id="url"
                  v-model="url"
                  required
                />
              </div>
              <button
                @click="shorten"
                type="submit"
                class="btn btn-primary float-right"
              >
                Shorten
              </button>
            </form>
          </div>
          <div
            class="card col-sm-10 col-md-6 col-lg-6 p-0"
            style="margin: inherit;"
          >
            <div class="card-header">
              <span class="float-left">Short URL</span>
            </div>
            <div class="card-body">
              <a :href="`http://${shortUrl}`">{{ shortUrl }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!user" class="align-center py-5 my-5">
      <h1>Welcome to URL Shortner</h1>
      <h3>Shorten your big links here</h3>
      <h3>Login or Register to use the service</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import redirects from "@/store/modules/redirects";
import users from "@/store/modules/users";

@Component
export default class Home extends Vue {
  url = "";
  shortUrl = "";
  shortError = false;
  shortFailed = false;

  get user() {
    return users.user;
  }

  shorten() {
    redirects
      .shorten({ url: this.url })
      .then(response => {
        if (response.shortUrl) {
          this.shortUrl = response.shortUrl;
          this.shortFailed = false;
        } else {
          this.shortFailed = true;
        }
      })
      .catch(error => {
        this.shortError = error;
      });
  }
}
</script>
