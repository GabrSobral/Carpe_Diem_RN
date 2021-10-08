import axios from "axios";
import { getToken } from "../utils/handleToken";

const api = axios.create({
  baseURL: "https://carpe-diem-api.herokuapp.com"
})

// api.defaults.headers = `Bearer ${token}`
api.interceptors.request.use(async (config) => {
  const token = await getToken()
  if (token) {
    if(!config.headers.Authorization){
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config

})

export { api }