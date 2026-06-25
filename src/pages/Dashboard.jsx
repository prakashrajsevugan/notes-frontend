import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
    getNotes,
    createNote,
    deleteNote
} from "../services/noteService";

import NoteCard from "../components/NoteCard";

import "../styles/dashboard.css";

export default function Dashboard() {

    const navigate = useNavigate();

    const { logout, user } = useAuth();

    const [notes, setNotes] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

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
                description
            });

            setTitle("");

            setDescription("");

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

        navigate("/login");

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

        </div>

    );

}