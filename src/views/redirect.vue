<template>
  <p>redirecting.....</p>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Redirect extends Vue {
  created() {
    window.location.replace =
      "https://api-urlshortener.herokuapp.com/r/" + this.$route.params.redirect;
  }
}
</script>
