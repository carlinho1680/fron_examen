import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../api/axios";

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
    const resp = await fetch(`${API_URL}/productos/${id}`);
    const data = await resp.json();
    setForm(data);
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

    await fetch(`${API_URL}/productos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    navigate("/admin/productos");
  };

  return (
    <div className="container">
      <h1>Editar Producto</h1>

      <form onSubmit={actualizarProducto}>
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

        <button className="btn btn-primary mt-3" type="submit">
          Actualizar
        </button>
      </form>
    </div>
  );
}
