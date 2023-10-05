import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function NewPassword() {
  
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [error, setError] = useState("");

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      console.log("token", token);

      await axios.post("https://backend-henry-pf.onrender.com/auth/change-password", {
        token,
        newPassword,
      });
    } catch (err) {
      setError(err.response?.data?.error || "Error al cambiar la contraseña.");
    }
    history.push("/");
  };

  return (
    <div>
      <h2>Cambiar Contraseña</h2>

      <div>
        <label>Nueva Contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div>
        <button onClick={handlePasswordChange}>Cambiar Contraseña</button>
      </div>
    </div>
  );
}
