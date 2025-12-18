import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Login.css";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nombre,
        email,
        password,
      });

      alert("Cuenta creada con éxito");
      navigate("/login");
    } catch (err) {
      alert("Error al crear la cuenta");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Crear cuenta</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Registrarse</button>
        </form>

        <div className="register-link">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
        </div>
      </div>
    </div>
  );
}
