import { useContext } from "react";
import { showFormattedDate } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { LanguageContext } from "../contexts/LanguageContext";
import PropTypes from "prop-types";

function NoteDetail({ notes, setEdit }) {
  const date = showFormattedDate(notes.createdAt)
  const navigate = useNavigate()
  const { language } = useContext(LanguageContext)

  return (
    <div className="note-item note-detail lined-background">
      <h1 onClick={() => navigate(`/detail/${notes.id}`)}>{notes.title}</h1>
      <p>{date}</p>
      <h3>{notes.body}</h3>
      <span>
        <button onClick={() => setEdit(true)}><FiEdit />Edit</button>
        <Link to="/" className="back"><FiArrowLeft />{language === "en" ? "Back" : "Kembali"}</Link>
      </span>
    </div>
  )
}

NoteDetail.propTypes = {
  notes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default NoteDetail