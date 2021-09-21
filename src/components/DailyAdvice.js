import "../styles/App.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import FavoriteAdvices from "./FavoriteAdvices";

function DailyAdvice({ favorites, handleAddFavorite, handleDeleteAdvice }) {
  const [dailyAdvice, setDailyAdvice] = useState();
  const [changeAdvice, setChangeAdvice] = useState(0);

  useEffect(() => {
    const getAdvices = async () => {
      const response = await fetch("https://api.adviceslip.com/advice");
      const adviceArray = await response.json();
      if (adviceArray) {
        setDailyAdvice(adviceArray.slip);
      } else {
        setDailyAdvice([]);
      }
    };

    getAdvices();
  }, [changeAdvice]);

  const handleSearchAnother = () => {
    setChangeAdvice(changeAdvice + 1);
  };

  return (
    <div className="dailyAdvice">
      <Row>
        <Col span={11}>
          <h1>Consejo del día</h1>
          {dailyAdvice === undefined ? (
            <p>
              ¡Busque más consejos!, por el momento no hay consejos disponibles
            </p>
          ) : (
            <p>{dailyAdvice.advice}</p>
          )}

          <Row>
            <Col>
              <Button
                type="primary"
                onClick={() => handleAddFavorite(dailyAdvice.advice)}
              >
                Marcar como favorito
              </Button>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearchAnother}
              >
                Siguiente consejo
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={1}></Col>
        <Col span={12}>
          {dailyAdvice === undefined ? (
            <br />
          ) : (
            <FavoriteAdvices
              advices={favorites}
              deleteAdvice={handleDeleteAdvice}
            />
          )}
        </Col>
      </Row>
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
