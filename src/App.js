import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Signup from "./pages/Sign/Signup";
import Login from "./pages/Sign/Signin";
import Offer from "./pages/Offer/Offer";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [title, setTitle] = useState(null);
  const [priceMin, setPriceMin] = useState(50);
  const [priceMax, setPriceMax] = useState(100);
  const [sorted, setSorted] = useState("asc");

  console.log("title", title, sorted);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 1 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header
        setUser={setUser}
        token={token}
        setTitle={setTitle}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
        setSorted={setSorted}
        priceMin={priceMin}
        priceMax={priceMax}
        sorted={sorted}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={title}
              priceMin={priceMin}
              priceMax={priceMax}
              sorted={sorted}
            />
          }
        />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
