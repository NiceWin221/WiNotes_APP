import PropTypes from "prop-types";
import Navigation from "../components/Navigation";
import { FiPlus } from "react-icons/fi";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation().pathname
  const detailPage = useMatch("/detail/:id")

  return (
    <div className="main-layout">
      <header>
        <Navigation />
      </header>
      <main>
        {children}
      </main>
      {location === "/" || location === "/archive" || detailPage ? <div className="plus" onClick={() => navigate("/add")}>
        <FiPlus />
      </div> : ""}
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired, // Use node if it can be any valid React child (string, number, element, etc.)
}

export default MainLayout