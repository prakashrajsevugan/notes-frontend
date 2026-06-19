import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {

            const res = await loginApi(form);

            login(res.data.token, res.data.user);

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h2>🔐 Login</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="📧 Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="🔒 Password"
                        onChange={handleChange}
                        required
                    />

                    <button>
                        🔓 Sign In
                    </button>

                </form>

                <div className="link">

                    Don't have an account?{" "}
                    <Link to="/register">
                        Create one
                    </Link>

                </div>

            </div>

        </div>
    );
}