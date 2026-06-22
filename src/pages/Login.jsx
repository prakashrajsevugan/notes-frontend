import { SignIn } from "@clerk/clerk-react";
import "../styles/auth.css";

export default function Login() {
    return (
        <div className="auth-container">
            <SignIn routing="path" path="/login" signUpUrl="/register" fallbackRedirectUrl="/dashboard" />
        </div>
    );
}