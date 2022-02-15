import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import "./Home.css";
import logo from "../../logo1.png";

const Home = ({ title, priceMin, priceMax, sorted }) => {
  // On crée 2 useState :
  // le 1er pour la data
  // le 2eme pour gérer l'asynchronicité de useEffect
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let queryParams = `?sort=price-${sorted}`;
    if (title) {
      queryParams += `&title=${title}`;
    }
    if (priceMin) {
      queryParams += `&priceMin=${priceMin}`;
    }
    if (priceMax) {
      queryParams += `&priceMax=${priceMax}`;
    }

    const fetchData = async () => {
      // On fait une requête pour récupérer les informations de l'API
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers${queryParams}`
      );
      // On met à jour le state concernant la data, avec le résultat de la requête que j'ai effectuée
      setData(response.data);
      // On met à jour le state de Loading pour que le reste du code puisse s'exécuter
      setIsLoading(false);
    };
    fetchData();
  }, [title, priceMin, priceMax, sorted]);

  // On fait une ternaire pour vérifier si la condition isLoading est true...
  return isLoading ? (
    //... si oui, on affiche :
    <div>En cours de chargement...</div>
  ) : (
    //... sinon, on map le tableau qui correspond à data.offers, pour récupérer toutes les données des offres
    <div>
      <Hero />
      <div className="products-wrapper">
        {data.offers.map((product, index) => {
          let brand = null;
          let size = null;
          product.product_details.map((elem) => {
            if (elem.hasOwnProperty("MARQUE")) {
              brand = elem.MARQUE;
            }
            if (elem.hasOwnProperty("TAILLE")) {
              size = elem.TAILLE;
            }
            return elem;
          });
          return (
            <div key={product._id} className="products_presentation">
              <Link to={`/offer/${product._id}`} key={product._id}>
                <div className="product">
                  <div className="product_owner_info">
                    <img
                      className="product_owner_photo"
                      src={
                        product.owner.account.avatar
                          ? product.owner.account.avatar.secure_url
                          : logo
                      }
                      alt="product_owner"
                    />
                    <span className="product_owner_name">
                      {product.owner.account.username}
                    </span>
                  </div>
                  <img
                    className="product_photo"
                    src={
                      product.product_image
                        ? product.product_image.secure_url
                        : null
                    }
                    alt="product_image"
                  />
                  <div className="product-details-wrapper">
                    <span className="product-price">
                      {product.product_price} €
                    </span>
                    <span className="product-details"> {brand}</span>
                    <span className="product-details">{size}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
