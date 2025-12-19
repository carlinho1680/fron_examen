import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

export default function Perfil() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-box">
          <p>No se encontraron datos del usuario. Por favor, inicia sesión de nuevo.</p>
          <button onClick={() => navigate("/login")} style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}>
            Ir al Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div className="login-box" style={{ background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ color: "#1a3a8a", marginBottom: "20px" }}>Perfil de Usuario</h2>
        
        <div style={{ textAlign: "left", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #dee2e6" }}>
          <p style={{ marginBottom: "12px" }}>
            <strong> Nombre:</strong> <span style={{ color: "#333", float: "right" }}>{user.username || "Invitado"}</span>
          </p>
          <p style={{ marginBottom: "0px", fontSize: "0.85rem", color: "#666" }}>
            <strong> ID Usuario:</strong> <span style={{ float: "right" }}>{user.id}</span>
          </p>
        </div>

        <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
          
          {/* --- BOTÓN NUEVO: MIS COMPRAS --- */}
          <button 
            onClick={() => navigate("/mis-compras")} 
            style={{ 
              padding: "12px", 
              backgroundColor: "#1a3a8a", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer", 
              fontWeight: "bold",
              fontSize: "1rem" 
            }}
          >
            Ver mis Compras
          </button>

          <button 
            onClick={() => navigate("/")} 
            style={{ padding: "10px", border: "1px solid #1a3a8a", background: "none", color: "#1a3a8a", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
          >
            Volver a la tienda
          </button>
          
          <button 
            onClick={handleLogout} 
            style={{ padding: "10px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}