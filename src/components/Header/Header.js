import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../logo.png";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import HeaderPrice from "./HeaderPrice";
import HeaderSorted from "./HeaderSorted";

const Header = ({
  token,
  setUser,
  setTitle,
  setPriceMin,
  setPriceMax,
  setSorted,
  priceMin,
  priceMax,
  sorted,
}) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navigate = useNavigate();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSorted = (checked) => {
    setSorted(checked ? "asc" : "desc");
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="logo" width="104px" height="45px" />
      </Link>
      <div className="header-filter">
        <div className="search-input">
          <FaSearch color="#bbb" />
          <input
            type="text"
            onChange={handleTitle}
            placeholder="Recherche des articles"
          />
        </div>
        {isHome && (
          <div className="header-filter-elements">
            <div className="header-filter-elements-sub">
              <span> Trier par prix: </span>
              <HeaderSorted sorted={sorted} handleSorted={handleSorted} />
            </div>

            <div className="header-filter-elements-sub">
              <span> Prix entre: </span>
              <HeaderPrice
                setPriceMin={setPriceMin}
                setPriceMax={setPriceMax}
                priceMin={priceMin}
                priceMax={priceMax}
              />
            </div>
          </div>
        )}
      </div>
      {token ? (
        <button
          className="theme-secondary"
          onClick={() => {
            setUser(null);
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <div>
          <Link to="/signup">
            <button className="theme-secondary">S'inscrire</button>
          </Link>
          <Link to="/signin">
            <button className="theme-secondary">Se connecter</button>
          </Link>
        </div>
      )}

      <Link to="/publish">
        <button className="theme-primary">Vends tes articles</button>
      </Link>
    </div>
  );
};

export default Header;
