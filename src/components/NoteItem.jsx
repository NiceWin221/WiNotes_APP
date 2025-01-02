import { showFormattedDate } from "../utils";
import { useNavigate } from "react-router-dom";
import ArchiveButton from "./ArchiveButton";
import UnArchiveButton from "./UnArchiveButton";
import DeleteButton from "./DeleteButton";
import PropTypes from "prop-types";

function NoteItem({ notes, onArchive, onUnArchive, onDelete }) {
  const date = showFormattedDate(notes.createdAt)
  const navigate = useNavigate()

  return (
    <div className="note-item lined-background">
      <h1 onClick={() => navigate(`/detail/${notes.id}`)}>{notes.title}</h1>
      <p>{date}</p>
      <h3>{notes.body}</h3>
      <span>
        <DeleteButton onDelete={onDelete} notes={notes} />
        {notes.archived ?
          <UnArchiveButton onUnArchive={onUnArchive} notes={notes} />
          :
          <ArchiveButton onArchive={onArchive} notes={notes} />
        }
      </span>
    </div>
  )
}

NoteItem.propTypes = {
  notes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,

  onArchive: PropTypes.func,
  onUnArchive: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
};

export default NoteItem