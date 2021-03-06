import "../styles/App.css";
import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ResultsAdvice from "./ResultsAdvice";

function SearchAdvice({ handleAddFavorite }) {
  const [searchAdvice, setSearchAdvice] = useState();
  const [searchWord, setSearchWord] = useState(null);

  useEffect(() => {
    const getSearchedAdvice = async () => {
      if (searchWord) {
        const response = await fetch(
          `https://api.adviceslip.com/advice/search/${searchWord}`
        );
        const adviceArray = await response.json();
        if (adviceArray) {
          setSearchAdvice(adviceArray.slips);
        } else {
          setSearchAdvice([]);
        }
      }

      console.log("consejos", searchAdvice);
    };

    getSearchedAdvice();
  }, [searchWord]);

  const onFinish = (values) => {
    setSearchWord(values.keyadvice);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Buscador de consejos</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Palabra clave"
          name="keyadvice"
          rules={[
            {
              required: true,
              message:
                "¡Este espacio está vacío, ingresa alguna palabra clave!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>
      </Form>
      {searchAdvice === undefined ? (
        <h2>No hay coincidencias, ingresa una palabra clave</h2>
      ) : (
        <ResultsAdvice
          advicesList={searchAdvice}
          handleAddFavorite={handleAddFavorite}
        />
      )}
    </div>
  );
}

export default SearchAdvice;
