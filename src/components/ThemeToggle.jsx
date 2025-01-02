import { useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../contexts/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div onMouseDown={toggleTheme} className="toggle">
      {theme === "dark" ? (
        <FiSun size={20} />
      ) : (
        <FiMoon size={20} />
      )}
    </div>
  );
}

export default ThemeToggle;
