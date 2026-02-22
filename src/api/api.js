import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.43.100:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
