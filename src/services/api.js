import axios from "axios";

const devURL = "http://localhost:5000/api";
const prodURL = "https://notes-backend-sfp2.onrender.com/api";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 
        (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? devURL : prodURL),
    headers: {
        "Content-Type": "application/json"
    }
});

let getTokenFn = null;

export const setGetToken = (fn) => {
    getTokenFn = fn;
};

// Automatically attach JWT token
api.interceptors.request.use(async (config) => {
    if (getTokenFn) {
        try {
            const token = await getTokenFn();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (err) {
            console.error("Error fetching dynamic auth token from Clerk:", err);
        }
    } else {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;