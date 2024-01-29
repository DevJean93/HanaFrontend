import axios from 'axios'

const HanaAPI = axios.create({
  baseURL: "http://94.74.66.85:8094/api",
});

export default HanaAPI;