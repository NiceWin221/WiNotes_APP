import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import PropTypes from "prop-types";

function LogoutButton({ onLogout }) {
  const { language } = useContext(LanguageContext)

  return <Link to="/login" onClick={onLogout}><FiLogOut /> {language === "en" ? "Logout" : "Keluar"}</Link>
}

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired
}

export default LogoutButton