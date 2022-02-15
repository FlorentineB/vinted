import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const Publish = ({ token }) => {
  [picture, setPicture] = useState();
  [title, setTitle] = useState("");
  [desc, setDesc] = useState("");
  [brand, setBrand] = useState("");
  [size, setSize] = useState("");
  [color, setColor] = useState("");
  [condition, setCondition] = useState("");
  [city, setCity] = useState("");
  [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return token ? (
    <form>
      <input type="file" />
      <input
        type="text"
        placeholder="Titre"
        onChange={(event) => setPicture(event.target.files)}
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Description"
        onChange={(event) => setDesc(event.target.value)}
      />
      <input
        type="text"
        placeholder="Marque"
        onChange={(event) => setBrand(event.target.value)}
      />
      <input
        type="text"
        placeholder="Taille"
        onChange={(event) => setSize(event.target.value)}
      />
      <input
        type="text"
        placeholder="Couleur"
        onChange={(event) => setColor(event.target.value)}
      />
      <input
        type="text"
        placeholder="Etat"
        onChange={(event) => setCondition(event.target.value)}
      />
      <input
        type="text"
        placeholder="Ville"
        onChange={(event) => setCity(event.target.value)}
      />
      <input
        type="number"
        placeholder="Prix"
        onChange={(event) => setPrice(event.target.value)}
      />
      <input type="submit" onClick={handleSubmit} />
    </form>
  ) : (
    <Navigate to="/signin" />
  );
};

export default Publish;
