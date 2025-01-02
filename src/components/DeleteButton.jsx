import { useContext } from "react";
import { FiDelete } from "react-icons/fi";
import { LanguageContext } from "../contexts/LanguageContext";
import PropTypes from "prop-types";

function DeleteButton({ notes, onDelete }) {
  const { language } = useContext(LanguageContext)
  const handleDelete = () => {
    if (window.confirm("Yakin ingin hapus note ini?")) {
      onDelete(notes.id)
    }
  }

  return <button onClick={() => handleDelete()}><FiDelete /> {language === "en" ? "Delete" : "Hapus "}</button>
}

DeleteButton.propTypes = {
  notes: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton