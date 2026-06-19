import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        authService.getCurrentUser()
            .then((res) => {
                setUser(res.data.user);
            })
            .catch(() => {
                localStorage.removeItem("token");
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    const login = (token, user) => {
        localStorage.setItem("token", token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);