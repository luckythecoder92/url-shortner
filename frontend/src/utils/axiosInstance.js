import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        timeout:10000,
        withCredentials: true, // Allow cookies to be sent with requests
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error status
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request:', error.response.data);
                    break;
                case 401:
                    console.error('Unauthorized');
                    break;
                case 404:
                    console.error('Not Found');
                    break;
                case 500:
                    console.error('Internal Server Error');
                    break;
                default:
                    console.error('Server Error:', error.response.data);
            }
        } else if (error.request) {
            // Request made but no response received
            console.error('Network Error: No response received');
        } else {
            // Error in request configuration
            console.error('Request Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;