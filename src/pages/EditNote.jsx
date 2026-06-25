import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, updateNote } from "../services/noteService";
import Footer from "../components/Footer";
import "../styles/dashboard.css";

export default function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await getNote(id);
                if (res.data && res.data.note) {
                    setTitle(res.data.note.title);
                    setDescription(res.data.note.description);
                    setImageUrl(res.data.note.imageUrl || "");
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
            await updateNote(id, { title, description, imageUrl: imageUrl || null });
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

                    <div className="image-upload-container">
                        <label className="image-upload-label">
                            Upload Image (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        
                        {imageUrl ? (
                            <div className="file-upload-preview-container">
                                <img src={imageUrl} alt="Preview" className="file-upload-preview-image" />
                                <button
                                    type="button"
                                    className="file-upload-clear-btn"
                                    onClick={() => {
                                        setImageUrl("");
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = "";
                                        }
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <div 
                                className={`file-upload-zone ${isDragging ? "dragging" : ""}`}
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <svg className="file-upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                <span className="file-upload-text">Drag & drop or click to upload</span>
                                <span className="file-upload-subtext">Supports PNG, JPG, JPEG, WEBP</span>
                            </div>
                        )}
                    </div>

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
            <Footer />
        </div>
    );
}