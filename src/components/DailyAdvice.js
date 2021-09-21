import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import FavoriteAdvices from "./FavoriteAdvices";

function DailyAdvice(props) {
  const [dailyAdvice, setDailyAdvice] = useState();
  const [changeAdvice, setChangeAdvice] = useState(0);
  const [favoriteAdvices, setFavoriteAdvices] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch("https://api.adviceslip.com/advice");
      const adviceArray = await response.json();
      if (adviceArray) {
        setDailyAdvice(adviceArray.slip);
      } else {
        setDailyAdvice([]);
      }
    };

    getMovies();
  }, [changeAdvice]);

  const handleCatch = (message) => {
    setFavoriteAdvices((prevState) => [...prevState, message]);
  };

  const handleSearchAnother = () => {
    setChangeAdvice(changeAdvice + 1);
  };

  const handleDeleteAdvice = (adviceToDelete) => {
    const newFavoriteList = favoriteAdvices.filter(
      (advice, index) => index !== adviceToDelete
    );
    setFavoriteAdvices(newFavoriteList);
  };

  return (
    <div>
      <h1>Consejo del día</h1>
      {dailyAdvice === undefined ? (
        <p>¡Busque más consejos!, por el momento no hay consejos disponibles</p>
      ) : (
        <p>{dailyAdvice.advice}</p>
      )}

      <Row>
        <Col>
          <Button
            type="primary"
            onClick={() => handleCatch(dailyAdvice.advice)}
          >
            Marcar como favorito
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchAnother}
          >
            Siguiente consejo
          </Button>
        </Col>
      </Row>
      {dailyAdvice === undefined ? (
        <br />
      ) : (
        <FavoriteAdvices
          advices={favoriteAdvices}
          deleteAdvice={handleDeleteAdvice}
        />
      )}
    </div>
  );
}

DailyAdvice.propTypes = {
  adviceArray: PropTypes.shape({
    advice: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default DailyAdvice;
