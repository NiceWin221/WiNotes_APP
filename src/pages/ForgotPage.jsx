import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";

function ForgotPage() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="lost-page">
      {language === "en" ? (
        <>
          <h1>Forgot Your Password?</h1>
          <p>Well, that’s on you! 🤣</p>
          <Link to={-1} className='lost-button'>Back</Link>
        </>
      ) : (
        <>
          <h1>Lupa Password?</h1>
          <p>Salah sendiri! AHHAHAHAH 🤣</p>
          <Link to={-1} className='lost-button'>Kembali</Link>
        </>
      )}
    </div>
  );
}

export default ForgotPage;
