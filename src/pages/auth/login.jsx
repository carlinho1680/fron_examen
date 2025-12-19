import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginService } from "../../api/auth.service";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginService({
        username: email,    
        contrasena: password 
      });

      // --- IMPORTANTE: FORZAR GUARDADO PARA EL CARRITO ---
      // Mapeamos lo que venga de Java (id o idUsuario) a un campo "id" estándar
      const datosUsuario = {
        id: res.data.id || res.data.idUsuario, 
        nombre: res.data.nombre,
        rol: res.data.rol,
        username: res.data.username
      };

      // Guardamos en localStorage para que el Carrito lo encuentre siempre
      localStorage.setItem("usuario", JSON.stringify(datosUsuario));
      
      // Guardamos en el contexto (AuthContext)
      login(res.data);

      if (res.data.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Usuario o contraseña incorrectos");
      } else {
        alert("Error al conectar con el servidor (500)");
      }
      console.error("Error detallado:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Usuario / Email</label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Ingresar</button>
        </form>
        <div className="register-link">
          ¿No tienes cuenta? <span onClick={() => navigate("/register")} style={{color: 'blue', cursor: 'pointer'}}>Regístrate aquí</span>
        </div>
      </div>
    </div>
  );
}