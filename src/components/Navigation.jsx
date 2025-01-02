import { useContext } from "react";
import { FiArchive, FiGlobe, FiHome, FiMapPin, } from "react-icons/fi";
import "./component.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LanguageContext } from "../contexts/LanguageContext";
import LogoutButton from "./LogoutButton";
import { AuthContext } from "../contexts/authContext";
import customToast from "../utils/toastUtil";
import { ThemeContext } from "../contexts/ThemeContext";

function Navigation() {
  const { language, toggleLanguage } = useContext(LanguageContext)
  const location = useLocation().pathname
  const navigate = useNavigate()
  const { setAuthToken } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)

  const onLogoutHandler = () => {
    customToast("User logged out successfully", "success", theme)
    localStorage.removeItem("token")
    setAuthToken(null)
    navigate("/login")
  }

  return (
    <div className="navigation">
      <div>
        <h1 onClick={() => navigate("/")}>WiNotes App</h1 >
        {(location === "/login" || location === "/register" || location === "/forgot") ? "" : <Link to="/" className={`${location === "/" ? "active" : ""}`}><FiHome /> Home</Link>}
        {(location === "/login" || location === "/register" || location === "/forgot") ? "" : <Link to="/archive" className={`${location === "/archive" ? "active" : ""}`}><FiArchive /> {language === "en" ? "Archived" : "Terarsip"}</Link>}
      </div>
      <div>
        {language === "en" ?
          <p onMouseDown={(e) => { e.preventDefault(); toggleLanguage() }}><FiMapPin /> ID</p>
          :
          <p onMouseDown={(e) => { e.preventDefault(); toggleLanguage() }}><FiGlobe /> EN</p>
        }
        <ThemeToggle />
        {
          (location === "/login" || location === "/register" || location === "/forgot") ? "" : <LogoutButton onLogout={onLogoutHandler} />
        }
      </div>
    </div>
  )
}

export default Navigation