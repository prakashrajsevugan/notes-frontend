import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, updateNote } from "../services/noteService";
import "../styles/dashboard.css";

export default function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await getNote(id);
                if (res.data && res.data.note) {
                    setTitle(res.data.note.title);
                    setDescription(res.data.note.description);
                }
            } catch (err) {
                console.error("Error fetching note details:", err);
                setError("Failed to load note details.");
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await updateNote(id, { title, description });
            navigate("/dashboard");
        } catch (err) {
            console.error("Error updating note:", err);
            setError("Failed to save changes. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="dashboard" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <h2>Loading note details...</h2>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="navbar">
                <h1>Edit Note</h1>
                <div className="navbar-user">
                    <button className="logout-btn" onClick={() => navigate("/dashboard")}>
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <div className="container" style={{ maxWidth: "600px", margin: "40px auto" }}>
                {error && <p style={{ color: "#dc2626", marginBottom: "15px", fontWeight: "600" }}>{error}</p>}
                
                <form className="add-form" onSubmit={handleSubmit}>
                    <h3>Modify Your Note</h3>

                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px", color: "#2c3e50" }}>
                        Title
                    </label>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px", color: "#2c3e50" }}>
                        Description
                    </label>
                    <textarea
                        rows="6"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                        <button type="submit" style={{ flex: 1 }}>
                            Save Changes
                        </button>
                        <button 
                            type="button" 
                            className="logout-btn" 
                            style={{ flex: 1, backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#dc2626", border: "1.5px solid rgba(239, 68, 68, 0.3)" }} 
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}