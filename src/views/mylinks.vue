<template>
  <div>
    <div class="container-fluid row">
      <div class="col-sm-10 col-md-6 col-lg-6" style="overflow-y: scroll">
        <table class="table table-responsive">
          <thead class="table-head">
            <th>Short Link</th>
            <th>Redirect</th>
            <th>Actions</th>
          </thead>
          <tbody class="table-body">
            <tr v-for="link in links" :key="link.redirectid">
              <td>
                <a
                  :href="'http://shorturl-jd.herokuapp.com/' + link.redirectid"
                  >{{
                    "http://shorturl-jd.herokuapp.com/" + link.redirectid
                  }}</a
                >
              </td>
              <td>
                <a :href="link.redirect">{{ link.redirect }}</a>
              </td>
              <td>
                <a
                  class="badge btn-info"
                  @click.prevent="getDetails(link.redirectid)"
                >
                  Show
                </a>
                <a class="badge btn-danger" @click="deleteURL(link.redirectid)">
                  <img
                    src="https://icongr.am/fontawesome/trash-o.svg?size=20&color=currentColor"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="loading"
        class="col-sm-10 col-md-6 col-lg-6 mt-5"
        style="display: block; overflow: auto;"
      >
        <div class="spinner-border">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div
        v-if="showDetail"
        class="col-sm-10 col-md-6 col-lg-6"
        style="display: block; overflow: auto;"
      >
        <h3 v-if="linksCount > 0">Total Clicks {{ linksCount }}</h3>

        <h3 v-if="linksCount == 0">No Clicks</h3>
        <p class="alert alert-success" v-if="linksCount == 0">
          Click data not available.
        </p>
        <p class="alert alert-danger" v-if="linkDetailFailed">
          {{ message }}
        </p>
        <table class="table" v-if="linksCount > 0">
          <thead class="table-head">
            <th>Click IP</th>
            <th>Country</th>
            <th>Region</th>
            <th>City</th>
            <th>Timezone</th>
          </thead>
          <tbody
            class="table-body"
            v-for="detail in linkDetail"
            :key="detail.redirectid + detail.ip"
          >
            <tr>
              <td>{{ detail.ip }}</td>
              <td>{{ detail.country }}</td>
              <td>{{ detail.region }}</td>
              <td>{{ detail.city }}</td>
              <td>{{ detail.timezone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import redirects from "@/store/modules/redirects";
import { getLinkDetails, deleteURL } from "@/store/api";
import { LinkDetailsEntity } from "../store/model";

@Component
export default class MyLinks extends Vue {
  linkDetail: LinkDetailsEntity[] = [];
  linksCount = 0;
  linkDetailFailed = false;
  message = "";
  loading = false;
  showDetail = false;

  get links() {
    if (redirects.links) return redirects.links.redirects;
    else return redirects.links;
  }

  created() {
    redirects.getMyLinks();
  }

  deleteURL(redirectid: string) {
    this.linkDetailFailed = false;
    this.showDetail = false;
    this.loading = true;
    deleteURL(redirectid).then(data => {
      if (data.data.status == "Successfull") {
        this.loading = true;
        window.location.reload();
      } else {
        this.loading = true;
        this.linkDetailFailed = true;
        this.message = data.data.message;
      }
    });
  }

  getDetails(redirectid: string) {
    this.linkDetailFailed = false;
    this.showDetail = false;
    this.loading = true;
    getLinkDetails(redirectid).then(details => {
      console.log(details.data);

      if (details.data.status == "failed") {
        this.linkDetailFailed = true;
        return;
      }

      this.linkDetail = details.data.linkDetails;
      this.linksCount = this.linkDetail.length;
      this.loading = false;
      this.showDetail = true;
    });
  }
}
</script>
