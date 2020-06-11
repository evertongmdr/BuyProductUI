import axios, { AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:57903/api',
  headers: { 
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  }
  
});


const errorInterceptor = (responseError: AxiosError) => {

  switch (responseError.response?.status) {
    case 404:
    // console.error(responseError.response.status, responseError.message);
      break;

    case 401: // authentication error, logout the user
    //    notify.warn( 'Please login again', 'Session Expired');
      //   localStorage.removeItem('token');
      //    router.push('/auth');
      break;

    default:
      console.error(responseError.response?.status, responseError.message);
    //    notify.error('Server Error');

  }
  return Promise.reject(responseError.response);
}
const responseInterceptor = (response: AxiosResponse) => {
  switch (response.status) {
    case 200:
      // yay!
      break;
    // any other cases
    default:
    // default case
  }

  return response;
}

api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;