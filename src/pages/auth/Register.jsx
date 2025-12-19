import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../api/auth.service";
import "./Login.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idRegion, setIdRegion] = useState("");
  const [idComuna, setIdComuna] = useState("");
  const navigate = useNavigate();

  
  const regiones = [
    { id: 1, nombre: "Región Metropolitana de Santiago" },
    { id: 2, nombre: "Atacama" }
  ];

  const comunasPorRegion = {
    1: [
      { id: 1, nombre: "Santiago Centro" },
      { id: 2, nombre: "Maipú" },
      { id: 3, nombre: "Puente Alto" }
    ],
        2: [
      { id: 1, nombre: "Chañaral " },
      { id: 2, nombre: "Diego de Almagro" }
    ]
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        username: username,
        contrasena: password,
        correo: email,
        rol: "USER", 
        idComuna: parseInt(idComuna),
        idRegion: parseInt(idRegion)
      };

      console.log("Enviando JSON:", payload);
      await registerService(payload);

      alert("Cuenta creada con éxito");
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error.message);
      alert("Error 500: Verifica que existan la Región 1 y Comuna 1 en tu Base de Datos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Crear cuenta</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Correo (Ej: usuario@ejemplo.com)"
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

          <div className="location-section">
            <p>Ubicación</p>
            <select 
              value={idRegion} 
              onChange={(e) => {
                setIdRegion(e.target.value);
                setIdComuna(""); 
              }} 
              required
            >
              <option value="">Selecciona Región</option>
              {regiones.map((reg) => (
                <option key={reg.id} value={reg.id}>{reg.nombre}</option>
              ))}
            </select>

            <select 
              value={idComuna} 
              onChange={(e) => setIdComuna(e.target.value)} 
              required
              disabled={!idRegion}
            >
              <option value="">Selecciona Comuna</option>
              {idRegion && comunasPorRegion[idRegion]?.map((com) => (
                <option key={com.id} value={com.id}>{com.nombre}</option>
              ))}
            </select>
          </div>

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}