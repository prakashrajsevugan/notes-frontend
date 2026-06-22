import { SignUp } from "@clerk/clerk-react";
import "../styles/auth.css";

export default function Register() {
    return (
        <div className="auth-container">
            <SignUp routing="path" path="/register" signInUrl="/login" fallbackRedirectUrl="/dashboard" />
        </div>
    );
}