import axios from "axios";
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5005',
//    withCredentials: true // => you might need this option if using cookies and sessions
});

api.interceptors.request.use( (config) => {
    const storedToken = localStorage.getItem('authToken')
   
    if(storedToken){
        config.headers = {authorization:`Bearer ${storedToken }`}
        config.headers["Access-Control-Allow-Origin"] = "*"
    }
    return config
})
 
export default api

