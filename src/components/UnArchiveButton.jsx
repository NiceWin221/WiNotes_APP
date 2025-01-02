import { useContext } from "react";
import { FiArchive } from "react-icons/fi";
import { LanguageContext } from "../contexts/LanguageContext";
import PropTypes from "prop-types";

function UnArchiveButton({ notes, onUnArchive }) {
  const { language } = useContext(LanguageContext)

  return (
    <button onClick={() => onUnArchive(notes.id)}>
      <FiArchive /> {language === "en" ? "UnArchive" : "Kembalikan"}
    </button >
  )
}

UnArchiveButton.propTypes = {
  notes: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onUnArchive: PropTypes.func.isRequired,
};


export default UnArchiveButton