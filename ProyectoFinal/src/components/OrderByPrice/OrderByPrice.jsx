import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { furnituresSortPrice } from "../redux/actions/Actions";
import style from "./price.module.css";

const OrderByPrice = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(""); // Estado para mantener la opción seleccionada

  const handleChange = (order) => {
    setSelectedOption(order); // Actualiza la opción seleccionada
    if (order === "ASC" || order === "DESC") {
      dispatch(furnituresSortPrice(order));
    }
  };

  return (
    <div className={style.selectStyle}>
      <span>Sort by Price: </span>
      <select
        className={style.selectStyle}
        onChange={(e) => handleChange(e.target.value)}
        value={selectedOption}
      >
        <option value="">Select</option>
        <option value="ASC">Lowest to Highest</option>
        <option value="DESC">Highest to Lowest</option>
      </select>
    </div>
  );
};

export default OrderByPrice;
