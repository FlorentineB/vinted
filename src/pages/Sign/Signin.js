import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sign.css";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
  // On crée les states pour les éléments d'identification (email et password-)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // On crée un state pour gérer les erreurs
  const [errorMessage, setErrorMessage] = useState("");

  //On crée une constante pour pouvoir naviguer
  const navigate = useNavigate();

  //On crée une fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On fait une requête axios par laquelle on envoie un body
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      );
      // S'il y a bien un token, on met à jour le setUser et on revient à la page Home
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("L'email et/ou le mot de passe ne correspondent pas");
      }
    }
  };

  return (
    // On crée un formulaire avec différents input
    // email
    // password
    // submit
    <div className="sign-wrapper">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} className="sign-form">
        <input
          type="email"
          placeholder="Adresse email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="submit"
          value="Se connecter"
          className="theme-primary"
          style={{ marginBottom: 0 }}
        />
        <span>{errorMessage}</span>
      </form>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
    </div>
  );
};

export default Login;
