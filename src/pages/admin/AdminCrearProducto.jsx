import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/axios"; 
import "./AdminEditor.css"; 

export default function AdminCrearProducto() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    marca: "",
    categoria: "",
    precio: 0,
    stock: 0,
    imagen: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "precio" || name === "stock" ? Number(value) : value
    });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    console.log("Enviando producto:", form);
    
    try {
      const resp = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (resp.ok) {
        alert("Producto creado con éxito");
        navigate("/admin/productos");
      } else {
        const errorData = await resp.json();
        console.error("Error del servidor:", errorData);
        alert("Error al guardar: " + (errorData.message || "Revisa los datos"));
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="admin-edit-container">
      <div className="admin-edit-card">
        <h2>Nuevo Producto</h2>

        <form onSubmit={guardarProducto}>
          {/* Mapeo explícito de las llaves del formulario */}
          {Object.keys(form).map((key) => (
            <div key={key} className="form-group">
              <label style={{ textTransform: "uppercase", fontSize: "12px", fontWeight: "bold" }}>
                {key}
              </label>
              <input
                name={key}
                type={key === "precio" || key === "stock" ? "number" : "text"}
                value={form[key]}
                onChange={handleChange}
                className="admin-input"
                required={key === "nombre" || key === "precio"}
              />
            </div>
          ))}

          <div className="admin-edit-buttons">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={() => navigate("/admin/productos")}
            >
              Cancelar
            </button>
            <button className="btn-save" type="submit" style={{ backgroundColor: "#28a745" }}>
              Guardar en Base de Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}