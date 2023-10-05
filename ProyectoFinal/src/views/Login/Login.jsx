import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../components/redux/actions/Actions";

import { useHistory } from "react-router-dom";
import RecoveryEmail from "../../components/NewPassword/RecoveryEmail";
import { CartContext } from "../../components/Context/CartContext";
import styles from "./Form.module.css";
import validation from "./validation";
import Logo from "../../assets/LogoDivano.jpg";
import { Link } from "react-router-dom";

export default function Login() {
  const context = useContext(CartContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(validation({ ...userData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginSuccess(userData));
    history.push("/home");
  };


//   const handleLogin = () => {
//     dispatch(loginSuccess(userData));
//     history.push("/");
//   };
const isButtonDisabled = !userData.email || !userData.password;

  const detailToShow = () => {
    context.openRecovery();
  };

  return (
    <div>
      <div className={styles.contenedor}>
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1> {/* Título */}
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
          <button type="submit" disabled={isButtonDisabled}>Iniciar Sesión</button>
          <Link onClick={detailToShow}>Olvide contraseña</Link>
          <p className={styles.cuenta}>
            ¿No sos cliente?
            <Link to="/register" className={styles.cuenta}>
              Abrí tu cuenta en minutos
            </Link>
          </p>
        </form>
      </div>
        <RecoveryEmail />
    </div>
  );
}
