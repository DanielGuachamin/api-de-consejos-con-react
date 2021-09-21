import "../styles/App.css";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

function FavoriteAdvices({ advices, deleteAdvice }) {
  return (
    <div>
      <h1>Consejos favoritos</h1>
      <table>
        <thead>
          <tr>
            <th>Consejos</th>
            <th>Quitar de la lista</th>
          </tr>
        </thead>
        <tbody>
          {advices.map((advice, index) => (
            <tr key={index}>
              <td>{advice}</td>
              <td>
                <Button type="primary" onClick={() => deleteAdvice(index)}>
                  Quitar Consejo
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FavoriteAdvices.propTypes = {
  advices: PropTypes.array,
};
export default FavoriteAdvices;
