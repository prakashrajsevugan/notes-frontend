import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {

    return (
        <div className="landing-root">

            <header className="landing-hero">
                <div className="hero-card">
                    <div className="hero-title">Notes</div>
                    <p className="hero-sub">Lightweight, private notes with a clean interface.</p>

                    <div className="hero-cta">
                        <Link to="/register" className="btn primary">Get Started</Link>
                        <Link to="/login" className="btn ghost">Sign In</Link>
                    </div>
                </div>
            </header>

            <main className="landing-main">
                <section className="features">
                    <div className="feature">
                        <h3>Fast</h3>
                        <p>Quickly create and organize notes with no friction.</p>
                    </div>
                    <div className="feature">
                        <h3>Private</h3>
                        <p>Your notes are tied to your account and secured with JWT auth.</p>
                    </div>
                    <div className="feature">
                        <h3>Beautiful</h3>
                        <p>Glass-like UI with a soft sage color palette for calming focus.</p>
                    </div>
                </section>
            </main>

            <footer className="landing-footer">
                <small>© {new Date().getFullYear()} Notes — Minimal note taking.</small>
            </footer>

        </div>
    );

}
