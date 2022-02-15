import axios from "axios";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ userId, total, title }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState(false);

  const redirectAfterPayment = () => {
    setTimeout(function () {
      navigate("/");
    }, 10000);
  };

  const handleSubmit = async (event) => {
    try {
      // On empêche la page de se recharger
      event.preventDefault();
      // On récupère les données bancaires que l'utilisateur a rentrée
      const cardElement = elements.getElement(CardElement);
      // On demande à l'API Stripe de créer un token
      // On envoie les données bancaires dans la requête via cardElement
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { token: stripeToken, amount: total, title }
      );
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      alert("Le paiement n'a pas pu avoir lieu.");
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <CardElement />
          <button className="theme-primary payment-checkout-form" type="submit">
            Payer
          </button>
        </form>
      ) : (
        <span>
          Paiement effectué ! <br />
          Vous allez être redirigé vers la page d'acceuil dans 10 secondes...{" "}
          {redirectAfterPayment()}
        </span>
      )}
    </>
  );
};

export default CheckoutForm;
