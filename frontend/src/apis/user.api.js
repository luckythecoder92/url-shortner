import axiosInstance from "../utils/axiosInstance.js";

export const registerUser = async (username, email, password) => {
    const { data } = await axiosInstance.post('/api/auth/register', { username, email, password });
    return data;    
}

export const loginUser = async (email, password) => {
    const { data } = await axiosInstance.post('api/auth/login', { email, password });
    return data;    
}

export const logoutUser = async () => {
    const { data } = await axiosInstance.get('api/auth/logout' );
    return data;    
}

export const getCurrentUser = async()=>{
    const {data} = await axiosInstance.get('/api/auth/me');
    return data;
}
export const getUserUrls = async()=>{
    const {data} = await axiosInstance.get('/api/user/urls');
    return data;
}