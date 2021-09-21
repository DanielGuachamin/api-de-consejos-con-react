import React from "react";
import { Button } from "antd";

function ResultsAdvice({ advicesList, handleAddFavorite }) {
  return (
    <div>
      <h1>Resultados de la búsqueda</h1>
      <table>
        <thead>
          <tr>
            <th>Consejos</th>
            <th>Marcar como Favorito</th>
          </tr>
        </thead>
        <tbody>
          {advicesList.map((advice, index) => (
            <tr key={index}>
              <td>{advice.advice}</td>
              <td>
                <Button
                  type="primary"
                  onClick={() => handleAddFavorite(advice.advice)}
                >
                  Marcar como Favorito
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsAdvice;
