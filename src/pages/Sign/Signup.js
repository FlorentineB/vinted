import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sign.css";
import { Link } from "react-router-dom";

const Signup = ({ setUser }) => {
  // On crée des states pour les différents éléments du formulaire
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  // On crée un state pour gérer les messages d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  // On crée une constante pour pouvoir naviguer
  const navigate = useNavigate();

  // On crée une fonction qui sera effectuée quand on enverra le formulaire
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On fait une requête axios, par laquelle on envoie un body
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      // S'il y a bien un token, on met à jour le state de user et on revient à la page Home...
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
      //... sinon on renvoie une erreur au client en prévenant que l'email a déjàn un compte
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
      }
    }
  };

  return (
    <div className="sign-wrapper">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit} className="sign-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
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

        <div className="sign-checkbox-container">
          <input
            type="checkbox"
            id="signup-checkbox"
            onChange={(event) => {
              setNewsletter(event.target.checked);
            }}
          />
          <label htmlFor="signup-checkbox">S'inscrire à notre newsletter</label>
          <div className="general-conditions">
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
        </div>
        <input
          type="submit"
          value="S'inscrire"
          className="theme-primary"
          style={{ marginBottom: 0 }}
        />
        <span>{errorMessage}</span>
      </form>
      <Link to="/signin">Tu as déjà un compte ? Connecte-toi !</Link>
    </div>
  );
};

export default Signup;
