<template>
  <p>redirecting.....</p>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Redirect extends Vue {
  created() {
    window.location.href =
      "http://localhost:5000/r/" + this.$route.params.redirect;
  }
}
</script>
