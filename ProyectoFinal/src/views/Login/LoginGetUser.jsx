import React, { useContext, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginGetUser, logout } from "../../components/redux/actions/Actions";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../components/Context/CartContext";
import "./LoginGetUser.css";
import { getToken } from "../../helpers/AuthToken";
import perfil from './assets/perfil.jpg';
import axios from 'axios';


export default function LoginGetUser() {
  const context = useContext(CartContext);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...userData });

  useEffect(() => {
      const token = getToken();
      
      if (token) {
          dispatch(loginGetUser(token));
          
        }
  }, []);
  
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUserData({ ...userData });
  };
  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/user/update-custom/${userData.id}`, editedUserData);
  
      if (response.status === 200) {
        setIsEditing(false);
        // Actualiza los datos del usuario después de la edición
        dispatch(loginGetUser(token));
      } else {
        console.error('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil', error);
    }
  };
  console.log("userdata", userData);
  if (!userData) {
    return <p>Cargando...</p>;
  }
  return (
    <div>
      <div className={`user-detail`}>
        <div>
          <img src={perfil} alt="User" />
          <h1>User profile</h1>
          {isEditing ? (
  <div>
    <label>Name:</label>
    <input
      type="text"
      name="name"
      value={editedUserData.name}
      onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
    />
    <label>Last Name:</label>
    <input
      type="text"
      name="lastName"
      value={editedUserData.lastName}
      onChange={(e) => setEditedUserData({ ...editedUserData, lastName: e.target.value })}
    />
    <label>Email:</label>
    <input
      type="email"
      name="email"
      value={editedUserData.email}
      onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
    />
    <button onClick={handleSaveProfile}>Save Profile✅</button>
    <button onClick={handleCancelEdit}>Cancel</button>
  </div>
) : (
  <>
    <p>Name: {userData.name}</p>
    <p>Last Name: {userData.lastName}</p>
    <p>Email: {userData.email}</p>
    <button onClick={handleEditProfile}>Edit profile📝</button>
  </>
)}
    </div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
    </div>
  );
}
