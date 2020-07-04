import axios from "axios";
import {
  UserRegister,
  UserLogin,
  RegisterResponse,
  Shorten,
  ShortenUrl,
  MyLinks,
  LinkDetails
} from "@/store/model";

export const api = axios.create({
  baseURL: "http://localhost:5000/"
});

export async function register(user: UserRegister) {
  const response = await api.post("/register", user);
  console.log(response);
  return (response.data as RegisterResponse);
}

export async function login(user: UserLogin) {
  const response = await api.post("/login", user);
  return response.data;
}

export function setJWT(jwt: string) {
  api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}

export function clearJWT() {
  delete api.defaults.headers.common["Authorization"];
}

export async function shorten(url: ShortenUrl) {
  const response = await api.post("/shorten", url);
  return response.data as Shorten;
}

export async function getMyLinks() {
  const response = await api.get("/redirects");
  return response.data as MyLinks;
}

export async function getLinkDetails(redirectid: string) {
  const response = await api.get(`/click/details/${redirectid}`);
  //console.table(response.data);
  return response;
}
