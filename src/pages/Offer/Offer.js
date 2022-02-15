import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Offer.css";

const Offer = ({ setSelectedProduct }) => {
  // On récupère les params
  const params = useParams();
  const id = params.id;

  // On crée plusieurs states (le premier pour récupérer la data, le 2ème pour gérer l'asynchronicité de useEffect)
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      // On met à jour la data :
      setData(response.data);
      setSelectedProduct(response.data);
      // On met à jour le state de isLoading pour poursuivre le code
      setIsLoading(false);
    };
    // On exécute la fonction fetchData :
    fetchData();
  }, [id]);

  // Grâce à une ternaire, on gère les cas selon si isLoading est true ou false :
  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="product_detail">
      <img
        className="product_detail_photo"
        src={data.product_image.secure_url}
      />
      <div className="product_card">
        <div>
          <span className="offer-price">{data.product_price} €</span>
          <ul className="offer-list">
            {data.product_details.map((item, index) => {
              const keys = Object.keys(item);
              return (
                <li key={index} className="offer-details">
                  <span>{keys[0]}</span>
                  <span>{item[keys[0]]}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="offer-divider"></div>
        <div className="offer-content">
          <p style={{ fontWeight: 700 }}> {data.product_name}</p>
          <p>{data.product_description}</p>
          <div className="offer-avatar-username">
            <img
              className="product_owner_photo"
              src={
                data.owner.account.avatar
                  ? data.owner.account.avatar.secure_url
                  : null
              }
              alt="product_owner"
            />
            <span className="product_owner_name">
              {data.owner.account.username}
            </span>
          </div>
        </div>
        <Link to="/payment">
          <button className="theme-primary">Acheter</button>
        </Link>
      </div>
    </div>
  );
};

export default Offer;
