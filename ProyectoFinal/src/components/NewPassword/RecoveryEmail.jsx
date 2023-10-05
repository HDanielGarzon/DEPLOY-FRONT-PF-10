import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import './NewPassword.css'

export default function RecoveryEmail() {
  const context = useContext(CartContext);
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
        if(!email){
            return new Error;
        }
      await axios.post("https://backend-henry-pf.onrender.com/auth/recovery", {
        email,
      });

      history.push("/");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };

  return (
    
    <div className={`product-detail ${context.recoveryOpen ? "open" : "hidden"}`}>
      <div onClick={() => context.closeRecovery()} className="close">x</div>
      <h2>Olvidé la contraseña</h2>
      <h3>
        Agrega tu correo electrónico y dale continuar. Luego verifica en tu correo los pasos para
        continuar.
      </h3>
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleLogin}>Continuar</button>
    </div>
  );
}