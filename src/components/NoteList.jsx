import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteList({ notes, onArchive, onUnArchive, onDelete }) {

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          notes={note}
          onArchive={onArchive}
          onUnArchive={onUnArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
  onArchive: PropTypes.func,
  onUnArchive: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
};

export default NoteList