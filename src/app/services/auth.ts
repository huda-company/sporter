import axios from "axios";

import { API_VERSION, BASE_URL } from "@/config/env";

import { SignUpReq } from "^/@types/models/auth";

export const signInAPI = async (credentials: any) => {
  return await axios.post(`${BASE_URL}/api/${API_VERSION}/signin`, credentials);
};

export const signupAPI = async (params: SignUpReq) => {
  return await axios.post(`${BASE_URL}/api/${API_VERSION}/signup`, params);
};
