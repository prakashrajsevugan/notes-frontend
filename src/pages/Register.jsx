import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Register() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
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

            const res = await registerApi(form);

            login(res.data.token, res.data.user);

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Create Account</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>

                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <button>
                        Sign Up
                    </button>

                </form>

                <div className="link">

                    Already have an account?{" "}
                    <Link to="/login">
                        Sign in
                    </Link>

                </div>

            </div>

        </div>

    );

}