import {
  Module,
  VuexModule,
  Action,
  getModule,
  Mutation
} from "vuex-module-decorators";
import { shorten, getMyLinks, getLinkDetails } from "@/store/api";
import store from "@/store";
import { ShortenUrl, MyLinks } from "../model";

@Module({
  namespaced: true,
  name: "redirects",
  store,
  dynamic: true
})
class ShortenModule extends VuexModule {
  links: MyLinks | null = null;
  @Mutation
  setMyLinks(links: MyLinks) {
    this.links = links;
  }

  @Action({ commit: "setMyLinks" })
  async getMyLinks() {
    const response = await getMyLinks();
    return response;
  }

  @Action
  async getLinkDetails(redirectid: string) {
    const response = await getLinkDetails(redirectid);

    console.table(response);
    return response;
  }

  @Action
  async shorten(url: ShortenUrl) {
    const response = await shorten(url);
    return response;
  }
}

export default getModule(ShortenModule);
