import "./Publish.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();
  console.log("preview", preview);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (title && price && picture) {
        const formData = new FormData();
        formData.append("picture", picture);
        formData.append("title", title);
        formData.append("description", desc);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("price", price);

        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
          formData,
          { headers: { authorization: "Bearer " + token } }
        );
        if (response.data._id) {
          navigate(`/offer/${response.data._id}`);
        }
      } else {
        alert("Les champs Photo, Titre et Prix sont obligatoires.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <form onSubmit={handleSubmit} className="publish-form">
      <h2>Vends ton article</h2>
      <div className="publish-card">
        {picture ? (
          <div className="publish-uploaded-file">
            <img
              src={preview}
              alt="uploaded"
              width={80}
              height={80}
              style={{ objectFit: "contain", textAlign: "center" }}
            />
          </div>
        ) : (
          <></>
        )}
        <label htmlFor="file">
          <div className="publish-add-file">
            <AiOutlinePlusCircle />{" "}
            <p style={{ marginLeft: "5px" }}>
              {" "}
              {picture ? "Changer de" : "Ajouter une"} photo
            </p>
          </div>
        </label>
        <input
          style={{ display: "none" }}
          id="file"
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
          }}
        />
      </div>
      <div className="publish-card">
        <div className="publish-card-item">
          <label htmlFor="title"> Titre</label>
          <input
            type="text"
            id="title"
            placeholder="ex: Chemise Sézane verte"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="publish-divider"></div>
        <div className="publish-card-item">
          <label htmlFor="description"> Décris ton article</label>
          <textarea
            name=""
            id="description"
            cols="30"
            rows="10"
            placeholder="ex: porté quelquefois, taille correctement"
            onChange={(event) => setDesc(event.target.value)}
          />
        </div>
      </div>

      <div className="publish-card">
        <div className="publish-card-item">
          <label htmlFor="brand"> Marque</label>
          <input
            type="text"
            id="brand"
            placeholder="ex: Zara"
            onChange={(event) => setBrand(event.target.value)}
          />
        </div>
        <div className="publish-divider"></div>

        <div className="publish-card-item">
          <label htmlFor="size"> Taille</label>
          <input
            type="text"
            id="size"
            placeholder="ex: L / 40 / 12"
            onChange={(event) => setSize(event.target.value)}
          />
        </div>
        <div className="publish-divider"></div>

        <div className="publish-card-item">
          <label htmlFor="color"> Couleur</label>
          <input
            type="text"
            id="color"
            placeholder="ex: Fushia"
            onChange={(event) => setColor(event.target.value)}
          />
        </div>
        <div className="publish-divider"></div>

        <div className="publish-card-item">
          <label htmlFor="condition"> Etat</label>
          <input
            type="text"
            id="condition"
            placeholder="ex: Neuf avec étiquette"
            onChange={(event) => setCondition(event.target.value)}
          />
        </div>
        <div className="publish-divider"></div>

        <div className="publish-card-item">
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            placeholder="ex: Paris"
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </div>

      <div className="publish-card">
        <div className="publish-card-item">
          <label htmlFor="price">Prix</label>
          <input
            type="text"
            id="price"
            placeholder="ex: Paris"
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
      </div>

      <button
        className="theme-primary publish-submit"
        type="submit"
        onClick={handleSubmit}
      >
        Ajouter
      </button>
    </form>
  ) : (
    <Navigate to="/signin" />
  );
};

export default Publish;
