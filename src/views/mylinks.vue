<template>
  <div>
    <div class="container row">
      <div class="col-6" style="overflow-y: scroll">
        <ul>
          <li
            @click="getDetails(link.redirectid)"
            v-for="link in links"
            :key="link.redirectid"
          >
            {{ link.redirect }}
          </li>
        </ul>
      </div>
      <div class="col-6" style="display: block; overflow: auto;">
        <h3 v-if="linkDetail.length">Total Clicks {{ linkDetail.length }}</h3>
        <p v-if="!linkDetail.length">
          There is no link selected or no clicks available
        </p>
        <ul>
          <li v-for="detail in linkDetail" :key="detail.redirectid + detail.ip">
            {{ detail }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import redirects from "@/store/modules/redirects";

@Component
export default class MyLinks extends Vue {
  //links = redirects.links;
  linkDetail = [];

  get links() {
    return redirects.links;
  }

  created() {
    redirects.getMyLinks();
  }

  getDetails(redirectid: string) {
    redirects.getLinkDetails(redirectid).then(details => {
      this.linkDetail = details;
    });
  }
}
</script>
