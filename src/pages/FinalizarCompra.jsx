import React from "react";
import { useNavigate } from "react-router-dom";

export default function FinalizarCompra() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      textAlign: "center", 
      marginTop: "150px", 
      padding: "20px",
      minHeight: "60vh" 
    }}>
      <div style={{ fontSize: "5rem", color: "#28a745" }}>
        ✔
      </div>
      <h1 style={{ color: "#193591", marginBottom: "20px" }}>
        ¡Gracias por tu compra!
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Tu pedido ha sido registrado con éxito en nuestra base de datos.
      </p>
      <p style={{ color: "#777", marginBottom: "40px" }}>
        Pronto recibirás un correo con el detalle de tu boleta.
      </p>
      
      <button 
        onClick={() => navigate("/")}
        style={{ 
          backgroundColor: "#193591",
          color: "white",
          padding: "15px 30px",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Volver a la Tienda
      </button>
    </div>
  );
}