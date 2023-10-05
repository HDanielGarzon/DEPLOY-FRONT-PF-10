import React, { useContext, useState, useEffect } from "react";
import style from "./Cart.module.css";
import Swal from "sweetalert2";
import { CartContext } from "../Context/CartContext";

const CartItem = ({ item, cantidad, onEliminarProducto }) => {
  const { eliminarProducto, actualizarCantidadProducto } = useContext(CartContext);
  const [contador, setContador] = useState(cantidad);
  const [sinStock, setSinStock] = useState(false);

  // Validar el stock cada vez que cambie la cantidad
  useEffect(() => {
    if (contador > item.stock) {
      setSinStock(true);
    } else {
      setSinStock(false);
    }
  }, [contador, item.stock]);

  // Función para manejar la eliminación del producto
  const handleEliminarProducto = () => {
    eliminarProducto(item.id);
    onEliminarProducto(item.id); // Llama a la función desde el padre
    // Muestra la alerta de éxito
    Swal.fire({
      icon: "success",
      text: "Producto eliminado del carrito",
    });
  };

  const aumentarContador = () => {
    const nuevoContador = contador + 1;
    setContador(nuevoContador);
    actualizarCantidadProducto(item.id, nuevoContador);
  };

  const disminuirContador = () => {
    if (contador > 1) {
      const nuevoContador = contador - 1;
      setContador(nuevoContador);
      actualizarCantidadProducto(item.id, nuevoContador);
    }
  };

  return (
    <div>
      <h4> {item.name} </h4>
      <div className={style.alineado}>
        <div>
          <p><strong>Cantidad de producto:</strong> {contador}</p>
          {sinStock && (
            <p style={{ color: "red" }}>Producto momentáneamente sin stock</p>
          )}
        </div>
        <div>
          <p><strong>Precio por unidad:</strong> U$S {item.price}</p>
        </div>
      </div>
      <button className={style.delete} onClick={handleEliminarProducto}>
        <p>❌</p>
      </button>
      <div>
        <button onClick={disminuirContador}>-</button>
        <span>{contador}</span>
        <button onClick={aumentarContador}>+</button>
      </div>
    </div>
  );
};

export default CartItem;

