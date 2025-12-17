import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/axios";

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
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const crearProducto = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    navigate("/admin/productos");
  };

  return (
    <div className="container">
      <h1>Crear Producto</h1>

      <form onSubmit={crearProducto}>
        {Object.keys(form).map((field) => (
          <div key={field}>
            <label>{field}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ))}

        <button className="btn btn-success mt-3" type="submit">
          Crear
        </button>
      </form>
    </div>
  );
}
