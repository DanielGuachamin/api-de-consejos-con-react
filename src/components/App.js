import "../styles/App.css";
import DailyAdvice from "./DailyAdvice";
import SearchAdvice from "./SearchAdvice";
import { useState } from "react";

function App() {
  const [favoriteAdvices, setFavoriteAdvices] = useState([]);

  const handleCatch = (message) => {
    setFavoriteAdvices((prevState) => [...prevState, message]);
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
