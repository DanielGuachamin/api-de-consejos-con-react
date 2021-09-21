import "../styles/App.css";
import DailyAdvice from "./DailyAdvice";
import SearchAdvice from "./SearchAdvice";
import { useRef, useState } from "react";
import { message } from "antd";

function App() {
  const [favoriteAdvices, setFavoriteAdvices] = useState([]);

  const handleCatch = (advice) => {
    const newAdvices = [...favoriteAdvices];
    let repetido = false;
    newAdvices.forEach(function (value) {
      if (value === advice) {
        repetido = true;
      }
    });
    repetido === true
      ? message.error("¡Cuidado! Este consejo ya fue añadido a la lista")
      : setFavoriteAdvices((prevState) => [...prevState, advice]);
  };

  const handleDeleteAdvice = (adviceToDelete) => {
    const newFavoriteList = favoriteAdvices.filter(
      (advice, index) => index !== adviceToDelete
    );
    setFavoriteAdvices(newFavoriteList);
  };

  return (
    <div className="App">
      <DailyAdvice
        favorites={favoriteAdvices}
        handleAddFavorite={handleCatch}
        handleDeleteAdvice={handleDeleteAdvice}
      />
      <SearchAdvice handleAddFavorite={handleCatch} />
    </div>
  );
}

export default App;
