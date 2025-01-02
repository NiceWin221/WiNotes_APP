import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext()

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "id"
  })

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "id" : "en"))
  }

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LanguageProvider