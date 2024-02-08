import axios from "axios";
import { useAuth } from "../../stores/AuthStore";
const auth = useAuth();

const token = auth.token;

const APISAP = axios.create({
  baseURL: "http://94.74.66.85:8094/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default APISAP;
