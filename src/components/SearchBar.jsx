import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import PropTypes from "prop-types";

function SearchBar({ keyword, onSearchChange }) {
  const { language } = useContext(LanguageContext)

  return <input
    type="text"
    placeholder={language === "en" ? "Find by title..." : "Cari berdasarkan judul..."}
    className="search-bar"
    value={keyword}
    onChange={onSearchChange}
  />
}

SearchBar.propTypes = {
  keyword: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar