import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

function LostPage() {
  const { language } = useContext(LanguageContext)

  return (
    <div className='lost-page'>
      <h1>404</h1>
      <p>{language === "en" ? "You are lost! The page you're looking for doesn't exist." : "Kamu tersesat! Halaman yang kamu cari tidak ada"}</p>
      <Link to={-1} className='lost-button'>{language == "en" ? "Back" : "Kembali"}</Link>
    </div>
  );
}

export default LostPage;
