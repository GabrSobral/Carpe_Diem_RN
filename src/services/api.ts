import axios from "axios";

const api = axios.create({
  baseURL: "https://carpe-diem-api.herokuapp.com"
})

const token = ""

// api.defaults.headers = `Bearer ${token}`
api.interceptors.request.use(async (config) => {

  if (token) {
    if(!config.headers.Authorization){
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config

})

export { api }