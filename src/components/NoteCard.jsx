import { format } from "date-fns";

function NoteCard({ note, onDelete, onEdit }) {

    return (
        <div className="note-card">

            {note.imageUrl && (
                <div className="note-image-container" style={{ width: "100%", height: "180px", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                    <img 
                        src={note.imageUrl} 
                        alt={note.title} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}

            <h3>{note.title}</h3>

            <p>{note.description}</p>

            <div className="note-date">
                {format(new Date(note.createdAt), "dd MMMM yyyy")}
            </div>

            <div className="card-buttons">

                <button
                    className="edit-btn"
                    onClick={() => onEdit && onEdit(note)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );

}

export default NoteCard;