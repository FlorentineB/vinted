import "./Hero.css";
import fissure from "./background-fissure.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-background">
      <img src={fissure} alt="hero" className="hero-background-fissure" />
      <div className="hero-content">
        <span>Prêts à faire du tri dans vos placards ?</span>
        <Link to="/publish">
          <button className="theme-primary button-hero">
            Commencer à vendre
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
