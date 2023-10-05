import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cart: [],
  total: 0,
  cantidadTotal: 0,
  addItem: () => {},
  eliminarProducto: () => {},
  vaciarCarrito: () => {},
  actualizarCantidadProducto: () => {},
  recoveryOpen: false,
  openRecovery: () => {},
  closeRecovery: () => {},
});

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const openRecovery = () => setRecoveryOpen(true);
  const closeRecovery = () => setRecoveryOpen(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  console.log("333", loginOpen);

  // Cargar el carrito desde localStorage al iniciar la aplicación
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      const carritoParseado = JSON.parse(carritoGuardado);
      setCart(carritoParseado.cart);
      calcularTotal(carritoParseado.cart);
      setCantidadTotal(carritoParseado.cantidadTotal);
    }
  }, []);

  // Función para calcular el total
  const calcularTotal = (carrito) => {
    let nuevoTotal = 0;
    carrito.forEach((producto) => {
      nuevoTotal += producto.item.price * producto.cantidad;
    });
    setTotal(nuevoTotal);
  };

  // Función para guardar el carrito en localStorage
  const guardarCarritoEnLocalStorage = (
    carrito,
    nuevoTotal,
    nuevaCantidadTotal
  ) => {
    localStorage.setItem(
      "carrito",
      JSON.stringify({
        cart: carrito,
        total: nuevoTotal,
        cantidadTotal: nuevaCantidadTotal,
      })
    );
    console.log("Carrito guardado en localStorage:", {
      cart: carrito,
      total: nuevoTotal,
      cantidadTotal: nuevaCantidadTotal,
    });
  };

  const addItem = (item, cantidad) => {
    const productoExistenteIndex = cart.findIndex(
      (prod) => prod.item.id === item.id
    );

    if (productoExistenteIndex === -1) {
      const nuevoProducto = { item, cantidad };
      const nuevoCarrito = [...cart, nuevoProducto];

      // Actualiza las cantidades totales
      const nuevoTotal = total + item.price * cantidad;
      const nuevaCantidadTotal = cantidadTotal + cantidad;

      setCart(nuevoCarrito);
      setCantidadTotal(nuevaCantidadTotal);
      setTotal(nuevoTotal);

      // Guardar en localStorage cada vez que se agrega un producto
      guardarCarritoEnLocalStorage(
        nuevoCarrito,
        nuevoTotal,
        nuevaCantidadTotal
      );
    } else {
      const carritoActualizado = [...cart];
      carritoActualizado[productoExistenteIndex].cantidad += cantidad;

      // Actualiza las cantidades totales
      const nuevoTotal = total + item.price * cantidad;
      const nuevaCantidadTotal = cantidadTotal + cantidad;

      setCart(carritoActualizado);
      setCantidadTotal(nuevaCantidadTotal);
      setTotal(nuevoTotal);

      // Guardar en localStorage cada vez que se actualiza un producto existente
      guardarCarritoEnLocalStorage(
        carritoActualizado,
        nuevoTotal,
        nuevaCantidadTotal
      );
    }

    console.log("Producto agregado al carrito:", {
      item,
      cantidad,
      cart,
      total,
      cantidadTotal,
    });
  };

  const eliminarProducto = (id) => {
    const productoEliminado = cart.find((prod) => prod.item.id === id);
    const carritoActualizado = cart.filter((prod) => prod.item.id !== id);

    // Actualiza las cantidades totales
    const nuevoTotal =
      total - productoEliminado.item.price * productoEliminado.cantidad;
    const nuevaCantidadTotal = cantidadTotal - productoEliminado.cantidad;

    setCart(carritoActualizado);
    setTotal(nuevoTotal);
    setCantidadTotal(nuevaCantidadTotal);

    // Guardar en localStorage cada vez que se elimina un producto
    guardarCarritoEnLocalStorage(
      carritoActualizado,
      nuevoTotal,
      nuevaCantidadTotal
    );

    console.log("Producto eliminado del carrito:", {
      id,
      cart: carritoActualizado,
      total: nuevoTotal,
      cantidadTotal: nuevaCantidadTotal,
    });
  };

  const vaciarCarrito = () => {
    // Limpiar el estado del carrito
    setCart([]);
    setCantidadTotal(0);
    setTotal(0);

    // Limpiar localStorage cuando se vacía el carrito
    localStorage.removeItem("carrito");

    console.log("Carrito vacío y localStorage limpio");
  };

  const actualizarCantidadProducto = (id, nuevaCantidad) => {
    const carritoActualizado = [...cart];
    const productoIndex = carritoActualizado.findIndex((prod) => prod.item.id === id);

    if (productoIndex !== -1) {
      const producto = carritoActualizado[productoIndex];
      const diferenciaCantidad = nuevaCantidad - producto.cantidad;
      const nuevoTotal = total + diferenciaCantidad * producto.item.price;
      const nuevaCantidadTotal = cantidadTotal + diferenciaCantidad;

      carritoActualizado[productoIndex].cantidad = nuevaCantidad;
      setCart(carritoActualizado);
      setTotal(nuevoTotal);
      setCantidadTotal(nuevaCantidadTotal);

      // Guardar en localStorage cada vez que se actualiza la cantidad de un producto
      guardarCarritoEnLocalStorage(carritoActualizado, nuevoTotal, nuevaCantidadTotal);
    }
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cantidadTotal,
        addItem,
        eliminarProducto,
        vaciarCarrito,
        actualizarCantidadProducto,
        recoveryOpen,
        openRecovery,
        closeRecovery,
        loginOpen,
        openLogin,
        closeLogin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
