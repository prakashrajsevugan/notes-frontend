import { format } from "date-fns";

function NoteCard({ note, onDelete, onEdit }) {

    return (
        <div className="note-card">

            <h3>{note.title}</h3>

            <p>{note.description}</p>

            <div className="note-date">
                📅 {format(new Date(note.createdAt), "dd MMMM yyyy")}
            </div>

            <div className="card-buttons">

                <button
                    className="edit-btn"
                    onClick={() => onEdit && onEdit(note)}
                >
                    ✏️ Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(note.id)}
                >
                    🗑️ Delete
                </button>

            </div>

        </div>
    );

}

export default NoteCard;