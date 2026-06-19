import api from "./api";

export const register = async (data) => {
    return await api.post("/auth/register", data);
};

export const login = async (data) => {
    return await api.post("/auth/login", data);
};

export const getCurrentUser = async () => {
    return await api.get("/auth/me");
};