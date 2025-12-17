import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:8080/login', {
        email,
        password
      })

      login(res.data)

      if (res.data.rol === 'ADMIN') navigate('/admin')
      else navigate('/')

    } catch (err) {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>

        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>

        <div className="register-link">
          ¿No tienes cuenta? <a href="/register">Crear cuenta</a>
        </div>
      </div>
    </div>
  )
}
