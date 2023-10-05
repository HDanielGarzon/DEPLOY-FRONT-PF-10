import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import styles from "./Checkout.module.css";
import {crearOrden} from "../redux/actions/Actions"
import { useDispatch } from "react-redux";
// import {loadStripe} from '@stripe/stripe-js'
// loadStripe("pk_test_51Nuly0AVmtpsbHtkGwq84Pr5qvSyx6DNeQI2QOWYBtXCNXf1xtWqH2VHDTBmtbtPbtMTabvJvmnIGvUtN8DjCw7I00ylpAklez")

const Checkout = () => {
  const { cart, vaciarCarrito } = useContext(CartContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nota, setNota] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [ordenId, setOrdenId] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const manejadorFormulario = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setErrorNombre("Por favor complete todos los campos");
      return;
    }

    if (email !== emailConfirmacion) {
      setErrorEmail("Los campos del email no coinciden");
      return;
    }

    // Validar que el teléfono sea mayor o igual a cero
    if (telefono < 0) {
      setErrorNombre("El número de teléfono no puede ser negativo");
      return;
    }
    function obtenerFechaActual() {
      // Crear un nuevo objeto Date que represente la fecha actual
      var fechaActual = new Date();
    
      // Obtener los componentes de la fecha
      var año = fechaActual.getFullYear();
      var mes = fechaActual.getMonth() + 1; // El mes comienza en 0, por lo que sumamos 1
      var dia = fechaActual.getDate();
    
      // Formatear la fecha como una cadena "AAAA-MM-DD"
      var fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    
      // Devolver la fecha formateada
      return fechaFormateada;
    }

    // const ordenIdAleatorio = Math.floor(Math.random() * 10000) + 1;
    // setOrdenId(String(ordenIdAleatorio)); // Simulación de un ID de orden
    
    const orden = {
      items: cart.map((producto) => producto.item.id),
      total: cart.reduce(
        (total, producto) => total + producto.item.price * producto.cantidad,
        0
      ),
      nombre,
      apellido,
      telefono,
      email,
      direccion,
      nota,
      // ordenId:ordenIdAleatorio,
      orderDate:obtenerFechaActual()
    };
    
    dispatch(crearOrden(orden))

    // Almacenar la orden de compra en localStorage en formato JSON
    localStorage.setItem("ordenDeCompra", JSON.stringify(orden));

    setErrorNombre(""); // Borra el mensaje de error del nombre
    setErrorEmail(""); // Borra el mensaje de error del email
    

    // Vaciar el carrito después de guardar la orden
    vaciarCarrito();

   

    // Limpiar los inputs
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
    setEmailConfirmacion("");
    setDireccion("");
    setNota("");
     // Redirigir a la página de compra después de guardar la orden
     history.push("/buy");
    //console.log(orden);
  };

  // Función para validar el campo de nombre en tiempo real
  const validateName = (value) => {
    if (value.length < 2 || value.length > 25) {
      return 'El nombre no puede ser menor a 2 caracteres o tener más de 25 caracteres';
    } else if (/[-*$%@+]/.test(value)) {
      return 'El nombre no puede contener caracteres especiales (- * $ % @ +)';
    }
    return '';
  };

  // Función para validar el campo de correo electrónico en tiempo real
  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      return 'Ingrese una dirección de correo electrónico válida';
    }
    return '';
  };

  return (
    <div className={styles.formulario}>
      <h2>Checkout</h2>
      <form onSubmit={manejadorFormulario}>
        {cart.map((producto, index) => (
          <div key={index} className={styles.descripcion}>
            <p>
              {producto.item.name}: {producto.cantidad} unidades
            </p>
            <p style={{ color: "red" }}>Precio Final: U$S {producto.item.price}</p>
          </div>
        ))}
        <hr />

        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingrese su nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setErrorNombre(validateName(e.target.value)); // Validar en tiempo real
            }}
            required
          />
          {errorNombre && <p style={{ color: "blue" }}>{errorNombre}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            placeholder="Ingrese su apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>

        <div className={styles.telefono}>
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="number"
            id="telefono"
            placeholder="Ingrese su número de contacto"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorEmail(validateEmail(e.target.value)); // Validar en tiempo real
            }}
            required
          />
          {errorEmail && <p style={{ color: "blue" }}>{errorEmail}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="emailConfirmacion">Confirmar Email</label>
          <input
            type="email"
            id="emailConfirmacion"
            placeholder="Confirme su correo electrónico"
            value={emailConfirmacion}
            onChange={(e) => setEmailConfirmacion(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            placeholder="Ingrese su Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nota">Nota</label>
          <textarea
            id="nota"
            placeholder="Ingrese un recordatorio si lo desea"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.pagar} >
          Pagar ahora
        </button>
        <hr />
        <Link to='/home'>
          <button type="button" className={styles.products}>
            Products
          </button>
        </Link>
      </form>
      {/* <div className={styles.orden}>
        {ordenId && (
          <div className={styles.orderId}>
            ¡Gracias por tu compra!✅ Tu número de Orden es: #{ordenId}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Checkout;

