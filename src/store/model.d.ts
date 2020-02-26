export interface User {
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  verified: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: UserRegister;
}

export interface LoginResponse {
  user: User;
}

export interface Shorten {
  shortUrl: string;
}

export interface ShortenUrl {
  url: string;
  email: string;
}

export interface Mylinks {
  email: string;
  redirect: string;
  redirectid: string;
  customRedirect: string;
}

export interface LinkDetails {
  redirectid: string;
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
}
