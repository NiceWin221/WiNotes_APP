import { useContext } from "react";
import { FiArchive } from "react-icons/fi";
import { LanguageContext } from "../contexts/LanguageContext";
import PropTypes from "prop-types";

function ArchiveButton({ notes, onArchive }) {
  const { language } = useContext(LanguageContext)

  return (
    <button onClick={() => onArchive(notes.id)}>
      <FiArchive /> {language === "en" ? "Archive" : "Arsipkan"}
    </button >
  )
}

ArchiveButton.propTypes = {
  notes: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton