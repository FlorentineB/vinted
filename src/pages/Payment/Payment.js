import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = ({ userId, selectedProduct }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct) {
      navigate("/");
    }
  }, [selectedProduct]);

  console.log("selectedProduct", selectedProduct);
  const order = selectedProduct?.product_price || 0;
  const title = selectedProduct?.product_name || "";
  const fee_protection = (order * 10) / 100;
  const fee_port = (order * 20) / 100;
  const total = order + fee_protection + fee_port;
  return (
    <div className="payment-page">
      <div className="payment-details-product">
        <div className="payment-title">Résumé de la commande</div>
        <div className="payment-summary">
          <div className="payment-summary-children">
            <div>Commande</div>
            <div>{order} €</div>
          </div>
          <div className="payment-summary-children">
            <div>Frais de protection acheteurs</div>
            <div>{fee_protection} €</div>
          </div>
          <div className="payment-summary-children">
            <div>Frais de port</div>
            <div>{fee_port} €</div>
          </div>
        </div>
        <div className="payment-divider"></div>

        <div className="payment-summary">
          <div className="payment-summary-children payment-bold">
            <div>Total</div>
            <div>{total} €</div>
          </div>
        </div>
        <div className="payment-summary" style={{ color: "black" }}>
          <p>
            Il ne vous reste plus qu'une étape pour vour offrir
            <span className="payment-bold"> {title}</span>. Vous aller payer{" "}
            <span className="payment-bold"> {total} €</span> (frais de
            protection et frais de port inclus)
          </p>
          <div className="payment-divider"></div>
          <Elements stripe={stripePromise}>
            <CheckoutForm userId={userId} total={total} title={title} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
