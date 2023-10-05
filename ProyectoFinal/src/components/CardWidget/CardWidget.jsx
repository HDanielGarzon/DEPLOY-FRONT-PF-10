import React, { useContext, useEffect, useState } from "react";
import logo from "./assets/logo.png";
import { CartContext } from '../Context/CartContext';
import "./CardWidget.css";
import { Link } from "react-router-dom";

const CardWidget = () => {
  const { cantidadTotal } = useContext(CartContext);
  const [contador, setContador] = useState(cantidadTotal);

  useEffect(() => {
    // Actualizar el contador cuando cambie la cantidadTotal
    setContador(cantidadTotal);
  }, [cantidadTotal]);

  return (
    <Link to="/cart" className="CartWidget">
      <div className="cart-container">
        <img className="imgCarrito" src={logo} alt="trolley" />
        {contador >= 0 && <span className="contador">{contador}</span>}
      </div>
    </Link>
  );
};

export default CardWidget;
