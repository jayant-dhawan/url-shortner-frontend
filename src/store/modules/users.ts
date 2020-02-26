import {
  Module,
  VuexModule,
  Action,
  getModule,
  Mutation
} from "vuex-module-decorators";
import { UserLogin, UserRegister, User } from "@/store/model";
import { register, login, setJWT, clearJWT } from "@/store/api";
import store from "@/store";

@Module({
  namespaced: true,
  name: "users",
  store,
  dynamic: true
})
class UsersModule extends VuexModule {
  user: User | null = null;

  @Mutation
  setUser(user: User) {
    this.user = user;
  }

  @Action
  async register(user: UserRegister) {
    const response = await register(user);
    return response;
  }
  @Action({ commit: "setUser" })
  async login(user: UserLogin) {
    clearJWT();
    const response = await login(user);
    console.log(response);
    setJWT(response.token);
    localStorage.setItem("token", response.token);
    localStorage.setItem("email", response.email);
    localStorage.setItem("firstname", response.firstname);
    localStorage.setItem("lastname", response.lastname);
    localStorage.setItem("verified", response.verified);
    //console.log(response)
    return response;
  }
}

export default getModule(UsersModule);
