import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginGetUser, logout } from "../../components/redux/actions/Actions";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../components/Context/CartContext";
import "./LoginGetUser.css";
import { getToken } from "../../helpers/AuthToken";
import perfil from './assets/perfil.jpg';

export default function LoginGetUser() {
  const context = useContext(CartContext);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
      const token = getToken();
      
      if (token) {
          dispatch(loginGetUser(token));
          
        }
  }, []);
  console.log("userdata", userData);
  if (!userData) {
    return <p>Cargando...</p>;
  }

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div>
      <div className={`user-detail`}>
      
        <div>
          <img src={perfil} alt="User" />
          <h1>User profile</h1> 
          <button>Edit profile📝</button>
        </div>
        <p><strong>Name: </strong>{userData.name}</p>
        <p><strong>Email: </strong>{userData.email}</p>
        <button onClick={handleLogout}>Log Out</button>
          
      
      </div>
    </div>
  );
}
