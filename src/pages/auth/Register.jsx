import { useState } from "react"
import axios from "axios"
import "./Login.css"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:8080/register", {
        name,
        email,
        password
      })

      alert("Cuenta creada con éxito")
      navigate("/login")

    } catch (err) {
      alert("Error al crear la cuenta")
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Crear cuenta</h2>

        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button type="submit">Registrarse</button>
        </form>

        <div className="register-link">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
        </div>
      </div>
    </div>
  )
}
