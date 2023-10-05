import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "../../views/Login/Form.module.css";
import validation from "../../views/Login/validation";
import Logo from "../../assets/LogoDivano.jpg";
import axios from "axios";
import Swal from "sweetalert2";


export default function Register() {
  
  const [userData, setUserData] = useState({
    name:"",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(validation({ ...userData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("https://backend-henry-pf.onrender.com/user/create-customer", userData);
        // const { name } = response.data;
        console.log("ddddd", response.data);
        await axios.post("https://backend-henry-pf.onrender.com/auth/wellcome", {
        email: userData.email,
      });
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        html: 'Bienvenido',
        timer: 2000, // Tiempo en milisegundos (3 segundos)
        showConfirmButton: false,
        timerProgressBar: true,
        didClose: () => {
          // Redirigir automáticamente a '/pay' después del tiempo especificado
          history.push('/');
        },
      });
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
      }
    }}

//   const handleLogin = () => {
//     dispatch(loginSuccess(userData));
//     history.push("/");
//   };
const isButtonDisabled = !userData.email || !userData.password || !userData.name || !userData.lastName;

  // const detailToShow = () => {
  //   context.openRecovery();
  // };

  return (
    <div>
      <div className={styles.contenedor}>
        <div>
          <img src={Logo} alt="Logo" />
          {/* <h1>Bienvenido</h1> Título */}
        </div>
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <label>Lastname: </label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <p className={styles.errors}>{errors.email ? errors.email : null}</p>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <p className={styles.errors}>
            {errors.password ? errors.password : null}
          </p>
          <button type="submit" disabled={isButtonDisabled}>Crear Cuenta</button>
          
        </form>
      </div>
      
    </div>
  );
}
