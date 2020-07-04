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
    if (user.email) {
      setJWT(user.token);
      this.user = user;
    }
  }

  @Mutation
  deleteUser(){
    this.user = null;
  }

  @Action
  async register(user: UserRegister) {
    const response = await register(user);
    console.log(response);
    return response;
  }

  @Action({ commit: "setUser" })
  async login(user: UserLogin) {
    clearJWT();
    const response = await login(user);
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  }
}

export default getModule(UsersModule);
