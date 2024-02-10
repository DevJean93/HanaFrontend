import axios from "axios";
import { useAuth } from "../../stores/AuthStore";
const auth = useAuth();

const tokenAuth = auth.token;

const APISAP = axios.create({
  baseURL: "http://94.74.66.85:8094/api",
  headers: {
    Authorization: `Bearer ${tokenAuth}`,
  },
});

APISAP.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem("token");

    auth.setIsAuth(true);
    const check = await auth.checkTokenByStorage(token);
    config.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    auth.clear();
  }

  return config;
});

// Response interceptor
// APISAP.interceptors.response.use(
//   async(response) => {
//     console.log('Entro al interceptor de respuesta',response)
//     return response;
//   },
//   (error) => {
//     // Handle errors here
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

export default APISAP;
