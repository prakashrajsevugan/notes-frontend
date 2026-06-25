import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/landing.css";

export default function Landing() {
    // Local state for the interactive sandbox
    const [mockNotes, setMockNotes] = useState([
        {
            id: 1,
            title: "Startup Idea",
            description: "Build a minimal markdown note-taking app with frosted glass aesthetics, Clerk auth, and direct Postgres cloud storage.",
            imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23a7c5b3'/><stop offset='100%' stop-color='%236f9480'/></linearGradient></defs><rect width='400' height='200' fill='url(%23g)'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='24' fill='white'>Sage Theme</text></svg>",
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            title: "Weekly Groceries",
            description: "Organic avocados, fresh mint leaves (for mojitos), whole grain sourdough bread, dark roast coffee beans, and almond milk.",
            imageUrl: null,
            createdAt: new Date(Date.now() - 3600000).toISOString()
        }
    ]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedGradient, setSelectedGradient] = useState("sage"); // sage, gold, lavender

    const gradients = {
        sage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23a7c5b3'/><stop offset='100%' stop-color='%236f9480'/></linearGradient></defs><rect width='400' height='200' fill='url(%23g)'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='24' fill='white'>Sage Theme</text></svg>",
        lavender: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23e0c3fc'/><stop offset='100%' stop-color='%238ec5fc'/></linearGradient></defs><rect width='400' height='200' fill='url(%23g)'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='24' fill='white'>Lavender Theme</text></svg>",
        gold: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f6d365'/><stop offset='100%' stop-color='%23fda085'/></linearGradient></defs><rect width='400' height='200' fill='url(%23g)'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='24' fill='white'>Gold Theme</text></svg>"
    };

    const handleAddMockNote = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        const newNote = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            imageUrl: selectedGradient ? gradients[selectedGradient] : null,
            createdAt: new Date().toISOString()
        };

        setMockNotes([newNote, ...mockNotes]);
        setTitle("");
        setDescription("");
    };

    const handleDeleteMock = (id) => {
        setMockNotes(mockNotes.filter(n => n.id !== id));
    };

    return (
        <div className="landing-root">
            {/* Navigation Header */}
            <nav className="landing-nav">
                <div className="nav-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="logo-svg">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span>Notes</span>
                </div>
                <div className="nav-actions">
                    <Link to="/login" className="btn ghost compact">Sign In</Link>
                    <Link to="/register" className="btn primary compact">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="landing-hero">
                <div className="hero-grid">
                    <div className="hero-text-content">
                        <div className="hero-badge-pill">The Future of Writing</div>
                        <h1 className="hero-main-title">
                            Capture thoughts. <br />
                            <span className="gradient-text">Shape ideas.</span>
                        </h1>
                        <p className="hero-subtext-para">
                            A secure, media-rich note taking space designed with an elegant frosted-glass aesthetic. Keep your notes organized, secure, and beautiful.
                        </p>
                        <div className="hero-cta-btns">
                            <Link to="/register" className="btn primary lg">Get Started Free</Link>
                            <a href="#sandbox-section" className="btn ghost lg">Try Demo Sandbox</a>
                        </div>
                    </div>

                    <div className="hero-visual-card">
                        <div className="floating-mock-note card-1">
                            <div className="mock-note-image" style={{ background: "linear-gradient(135deg, #a7c5b3, #6f9480)" }}></div>
                            <h3>Creative Direction</h3>
                            <p>Outline color themes, typography, and interactive hover animations for the next project revision.</p>
                            <span className="mock-date">Just now</span>
                        </div>
                        <div className="floating-mock-note card-2">
                            <h3>Weekly Checklist</h3>
                            <p>• Push latest database migrations<br />• Sync auth keys in Vercel<br />• Rebuild landing layouts</p>
                            <span className="mock-date">2 hours ago</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Core Features */}
            <main className="landing-main">
                <section className="features-section">
                    <div className="section-header">
                        <h2>Crafted for clarity. Powered by secure tech.</h2>
                        <p>Everything you need for a modern note-taking workflow.</p>
                    </div>
                    <div className="features-grid-layout">
                        <div className="feature-card-new">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feat-svg">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <h3>Clerk Security</h3>
                            <p>Fully shielded with enterprise-grade multi-tenant and passwordless session authentication.</p>
                        </div>
                        <div className="feature-card-new">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feat-svg">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <h3>Drag & Drop Media</h3>
                            <p>Instantly attach screenshots and photos by dragging files directly into your workspace cards.</p>
                        </div>
                        <div className="feature-card-new">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feat-svg">
                                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                            </svg>
                            <h3>Postgres Cloud</h3>
                            <p>All notes and Base64 images are encrypted and stored in PostgreSQL database in Neon Cloud.</p>
                        </div>
                        <div className="feature-card-new">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feat-svg">
                                <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a5 5 0 0 0 5-5v-1a10 10 0 0 0-10-10z"></path>
                                <circle cx="7.5" cy="10.5" r="1"></circle>
                                <circle cx="11.5" cy="7.5" r="1"></circle>
                                <circle cx="16.5" cy="9.5" r="1"></circle>
                                <circle cx="15.5" cy="14.5" r="1"></circle>
                            </svg>
                            <h3>Sage Aesthetics</h3>
                            <p>Enjoy a premium frosted-glass interface styled with a calming, focus-promoting color palette.</p>
                        </div>
                    </div>
                </section>

                {/* Interactive Demo Sandbox */}
                <section id="sandbox-section" className="sandbox-section">
                    <div className="section-header">
                        <h2>Experience it instantly</h2>
                        <p>No account required. Try adding, viewing, and clearing mock notes in real time.</p>
                    </div>

                    <div className="sandbox-wrap">
                        <form className="sandbox-form" onSubmit={handleAddMockNote}>
                            <h3>Create Mock Note</h3>
                            <input 
                                placeholder="Title (e.g. Project Plan)" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <textarea 
                                rows="3" 
                                placeholder="Write your thoughts..." 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                            <div className="gradient-picker-label">Choose Cover Theme</div>
                            <div className="gradient-picker">
                                <button 
                                    type="button" 
                                    className={`picker-btn gp-sage ${selectedGradient === 'sage' ? 'selected' : ''}`}
                                    onClick={() => setSelectedGradient('sage')}
                                    aria-label="Sage Gradient"
                                />
                                <button 
                                    type="button" 
                                    className={`picker-btn gp-lavender ${selectedGradient === 'lavender' ? 'selected' : ''}`}
                                    onClick={() => setSelectedGradient('lavender')}
                                    aria-label="Lavender Gradient"
                                />
                                <button 
                                    type="button" 
                                    className={`picker-btn gp-gold ${selectedGradient === 'gold' ? 'selected' : ''}`}
                                    onClick={() => setSelectedGradient('gold')}
                                    aria-label="Gold Gradient"
                                />
                                <button 
                                    type="button" 
                                    className={`picker-btn gp-none ${selectedGradient === null ? 'selected' : ''}`}
                                    onClick={() => setSelectedGradient(null)}
                                >
                                    None
                                </button>
                            </div>

                            <button type="submit" className="btn primary full-width">Add Mock Note</button>
                        </form>

                        <div className="sandbox-grid">
                            {mockNotes.length === 0 ? (
                                <div className="sandbox-empty">
                                    <p>Your sandbox is empty. Add a note using the form!</p>
                                </div>
                            ) : (
                                mockNotes.map(note => (
                                    <div key={note.id} className="note-card mock-card">
                                        {note.imageUrl && (
                                            <div className="note-image-container" style={{ width: "100%", height: "100px", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
                                                <img src={note.imageUrl} alt={note.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            </div>
                                        )}
                                        <h3>{note.title}</h3>
                                        <p>{note.description}</p>
                                        <div className="mock-card-footer">
                                            <span className="note-date">Demo Mode</span>
                                            <button 
                                                type="button" 
                                                className="delete-btn compact-delete"
                                                onClick={() => handleDeleteMock(note.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
