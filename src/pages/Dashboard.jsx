import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
    getNotes,
    createNote,
    deleteNote
} from "../services/noteService";

import NoteCard from "../components/NoteCard";
import Footer from "../components/Footer";

import "../styles/dashboard.css";

export default function Dashboard() {

    const navigate = useNavigate();

    const { logout, user } = useAuth();

    const [notes, setNotes] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [imageUrl, setImageUrl] = useState("");
    const [isDragging, setIsDragging] = useState(false);

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

        loadNotes();

    }, []);

    const loadNotes = async () => {

        try {

            const res = await getNotes();

            setNotes(res.data.notes);

        } catch (err) {

            console.log(err);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createNote({
                title,
                description,
                imageUrl: imageUrl || null
            });

            setTitle("");

            setDescription("");

            setImageUrl("");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            loadNotes();

        } catch (err) {

            console.log(err);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Note?"))
            return;

        await deleteNote(id);

        loadNotes();

    };

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <div className="dashboard">

            <div className="navbar">

                <h1>Notes</h1>

                <div className="navbar-user">

                    <Link to="/landing" className="btn ghost">Home</Link>

                    <span>Welcome, <strong>{user?.username}</strong></span>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div className="container">

                <form
                    className="add-form"
                    onSubmit={handleSubmit}
                >

                    <h3>Create a New Note</h3>

                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                    <textarea
                        rows="4"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
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

                    <button>
                        Add Note
                    </button>

                </form>

                <div className="notes-grid">

                    {
                        notes.length === 0 ?

                            <div className="empty">


                                <h2>No Notes Yet</h2>

                                <p>
                                    Create your first note using the form above!
                                </p>

                            </div>

                            :

                            notes.map(note => (

                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onDelete={handleDelete}
                                    onEdit={(n) => navigate(`/edit-note/${n.id}`)}
                                />

                            ))

                    }

                </div>

            </div>

            <Footer />

        </div>

    );

}