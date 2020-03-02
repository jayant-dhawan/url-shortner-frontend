export interface User {
  email: string;
  token: string;
  firstname: string;
  lastname: string;
  verified: boolean;
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
}

export interface MyLinks {
  error: string;
  status: string;
  redirects?: RedirectsEntity[] | null;
}
export interface RedirectsEntity {
  email: string;
  redirect: string;
  redirectid: string;
  customRedirect: string;
}

export interface LinkDetails {
  error?: string;
  status?: string;
  linkDetails?: LinkDetailsEntity[] | null;
}

export interface LinkDetailsEntity {
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
