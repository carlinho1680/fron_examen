import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../api/axios";
import "./AdminEditor.css"; // Importamos el estilo

export default function AdminEditarProducto() {
  const { id } = useParams();
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

  const cargarProducto = async () => {
    try {
      const resp = await fetch(`${API_URL}/productos/${id}`);
      const data = await resp.json();
      setForm(data);
    } catch (error) {
      console.error("Error al cargar producto:", error);
    }
  };

  useEffect(() => {
    cargarProducto();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const actualizarProducto = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      navigate("/admin/productos");
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="admin-edit-container">
      <div className="admin-edit-card">
        <h2>Editar Producto #{id}</h2>

        <form onSubmit={actualizarProducto}>
          {/* Mapeo automático de campos con el diseño nuevo */}
          {Object.keys(form).map((field) => (
            // Excluimos el ID de la edición si viene en el form para no romper el backend
            field !== "id" && field !== "idProducto" && (
              <div key={field} className="form-group">
                <label>{field.toUpperCase()}</label>
                <input
                  name={field}
                  type={field === "precio" || field === "stock" ? "number" : "text"}
                  value={form[field] || ""}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
            )
          ))}

          <div className="admin-edit-buttons">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={() => navigate("/admin/productos")}
            >
              Cancelar
            </button>
            <button className="btn-save" type="submit">
              Actualizar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}