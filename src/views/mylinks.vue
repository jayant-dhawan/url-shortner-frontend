<template>
  <div>
    <div class="container-fluid row">
      <div class="col-sm-10 col-md-6 col-lg-6" style="overflow-y: scroll">
        <table class="table">
          <thead class="table-head">
            <th>Short Link</th>
            <th>Redirect</th>
          </thead>
          <tbody class="table-body">
            <tr
              v-for="link in links"
              :key="link.redirectid"
              @click.prevent="getDetails(link.redirectid)"
            >
              <td>
                <a :href="'http://localhost:8080/#/' + link.redirectid">
                  {{ "http://localhost:8080/#/" + link.redirectid }}
                </a>
              </td>
              <td>
                <a :href="link.redirect">
                  {{ link.redirect }}
                </a>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="col-sm-10 col-md-6 col-lg-6"
        style="display: block; overflow: auto;"
      >
        <h3 v-if="linksCount > 0">Total Clicks {{ linksCount }}</h3>
        <h3 v-if="linksCount == 0">No Clicks</h3>
        <p class="alert alert-success" v-if="linksCount == 0">
          Click data not available.
        </p>
        <p class="alert alert-danger" v-if="linkDetailFailed">
          There is an error.
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
              <td>
                {{ detail.ip }}
              </td>
              <td>
                {{ detail.country }}
              </td>
              <td>
                {{ detail.region }}
              </td>
              <td>
                {{ detail.city }}
              </td>
              <td>
                {{ detail.timezone }}
              </td>
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
import { getLinkDetails } from "@/store/api";
import { LinkDetailsEntity } from "../store/model";

@Component
export default class MyLinks extends Vue {
  linkDetail: LinkDetailsEntity[] = [];
  linksCount = 0;
  linkDetailFailed = false;

  get links() {
    if (redirects.links) return redirects.links.redirects;
    else return redirects.links;
  }

  created() {
    redirects.getMyLinks();
  }

  getDetails(redirectid: string) {
    getLinkDetails(redirectid).then(details => {
      console.log(details.data);

      if (details.data.status == "failed") {
        this.linkDetailFailed = true;
        return;
      }

      this.linkDetail = details.data.linkDetails;
      this.linksCount = this.linkDetail.length;
      //console.log()
      /* if (details.status == "successfull") {
        this.linkDetail = details.linkDetails;
        console.log(this.linkDetail);
        this.linkDetailEmpty = false;
        this.linkDetailFailed = false;
      } else if (details.status == "no redirect found") {
        this.linkDetailEmpty = true;
        this.linkDetailFailed = false;
      } else if (details.error) {
        this.linkDetailEmpty = true;
        this.linkDetailFailed = true;
      }*/
    });
  }
}
</script>
