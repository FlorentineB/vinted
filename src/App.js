import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Signup from "./pages/Sign/Signup";
import Signin from "./pages/Sign/Signin";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/Payment/Payment";
import Publish from "./pages/Publish/Publish";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [title, setTitle] = useState(null);
  const [priceMin, setPriceMin] = useState(50);
  const [priceMax, setPriceMax] = useState(100);
  const [sorted, setSorted] = useState("asc");

  console.log("title", title, sorted);

  const setUser = (user) => {
    if (!user) {
      Cookies.remove("userToken");
      Cookies.remove("userId");
      setToken(null);
      setUserId(null);
    } else {
      const { token, userId } = user;
      if (token) {
        Cookies.set("userToken", token, { expires: 1 });
      }
      if (userId) {
        Cookies.set("userId", userId, { expires: 1 });
      }
      setToken(token);
      setUserId(userId);
    }
  };

  console.log("creds", token, userId);

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
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route
          path="/offer/:id"
          element={<Offer setSelectedProduct={setSelectedProduct} />}
        />
        <Route
          path="/payment"
          element={
            <Payment selectedProduct={selectedProduct} userId={userId} />
          }
        />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
