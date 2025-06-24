import axios from 'axios'

const apiUrl = "https://aurabackend1.yellowsea-f076f2f8.eastus.azurecontainerapps.io";
// const apiUrl = "http://localhost:8000";

const localInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
// const history = createBrowserHistory();
// const navigate = useNavigate();
localInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from local storage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // config.headers['ngrok-skip-browser-warning'] = true;
    // config.headers['withCredentials'] = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default localInstance;