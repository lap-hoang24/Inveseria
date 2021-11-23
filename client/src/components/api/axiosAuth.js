import axios from 'axios';
const cookies = document.cookie;
const cookieArray = cookies.split(';');
let jwt;

for (const cookie of cookieArray) {
   if (cookie.includes('jwt=')) {
      jwt = cookie.slice(5);
   }
}

const authAxios = axios.create();

authAxios.interceptors.request.use(
   (config) => {
      const accessToken = jwt;
      if (accessToken) {
         config.headers["Authorization"] = 'Bearer ' + accessToken;
      }
      return config;
   },
   (error) => {
      Promise.reject(error);
   }
)


authAxios.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      if (error.response.status === 401 || error.response.status === 400) {
         window.location = '/login';
      }
   }
)


export default authAxios;