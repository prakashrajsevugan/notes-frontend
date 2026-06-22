import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClerkProvider, useUser, useClerk, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { setGetToken } from "../services/api";

const AuthContext = createContext();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AuthProviderContent({ children }) {
    const { isLoaded, isSignedIn, user: clerkUser } = useUser();
    const { signOut } = useClerk();
    const { getToken } = useClerkAuth();

    useEffect(() => {
        setGetToken(getToken);
    }, [getToken]);

    const user = isLoaded && isSignedIn && clerkUser ? {
        id: clerkUser.id,
        username: clerkUser.username || clerkUser.firstName || clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] || "User",
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
    } : null;

    const logout = async () => {
        await signOut();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login: () => {},
                logout,
                loading: !isLoaded
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    if (!PUBLISHABLE_KEY) {
        throw new Error("Missing Clerk Publishable Key in frontend environment variables.");
    }

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={navigate}>
            <AuthProviderContent>{children}</AuthProviderContent>
        </ClerkProvider>
    );
}

export const useAuth = () => useContext(AuthContext);