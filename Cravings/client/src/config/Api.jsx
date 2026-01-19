import axios from "axios";

const axiosInstance = axios.create({
     baseURL: "http://localhost:4500",
  // baseURL: "http://localhost:4500/auth/register",

    withCredentials: true,
})


export default axiosInstance;