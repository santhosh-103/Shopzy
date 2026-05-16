import axios from "axios";

const API = axios.create({
  baseURL: "https://shopzy-79hr.onrender.com/api",
});

export default API;