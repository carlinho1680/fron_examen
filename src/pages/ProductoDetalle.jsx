import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductos } from "../api/productos.service"; 
import { usarCarrito } from "../context/CarritoContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = usarCarrito();

  useEffect(() => {
    setLoading(true);
    getProductos()
      .then((res) => {
        const dataOriginal = res.data;
        
        const encontrado = dataOriginal.find((p) => p.idProducto === Number(id));

        if (encontrado) {
          const adaptado = {
            id: encontrado.idProducto,
            name: encontrado.nombreProducto,
            price: encontrado.precio || 0,
            image: encontrado.urlImagen,
            category: encontrado.categoria,
            description: encontrado.descripcion || "Sin descripción disponible."
          };
          setProduct(adaptado);

          const filtrados = dataOriginal
            .filter((p) => p.categoria === encontrado.categoria && p.idProducto !== encontrado.idProducto)
            .slice(0, 3)
            .map(rel => ({
              id: rel.idProducto,
              name: rel.nombreProducto,
              image: rel.urlImagen
            }));
          setRelacionados(filtrados);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el detalle:", err);
        setLoading(false);
      });
  }, [id]); 

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Cargando producto...</h2>;
  if (!product) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Producto no encontrado</h2>;

  const handleAdd = () => {
    agregarAlCarrito(product);
    const img = document.querySelector(".detalle-img");
    if (!img) return;
    const imgClone = img.cloneNode();
    imgClone.classList.add("volando");
    document.body.appendChild(imgClone);
    const rect = img.getBoundingClientRect();
    imgClone.style.left = rect.left + "px";
    imgClone.style.top = rect.top + "px";
    const carritoIcono = document.querySelector(".carrito-icono");
    if (carritoIcono) {
      const carrito = carritoIcono.getBoundingClientRect();
      setTimeout(() => {
        imgClone.style.left = carrito.left + "px";
        imgClone.style.top = carrito.top + "px";
        imgClone.style.opacity = "0";
        imgClone.style.transform = "scale(0.2)";
      }, 20);
    }
    setTimeout(() => imgClone.remove(), 800);
  };

  return (
    <div className="detalle-container">
      <img className="detalle-img" src={product.image} alt={product.name} />

      <div className="detalle-info">
        <Link to="/productos" className="btn-volver">← Volver</Link>
        <h2>{product.name}</h2>
        <p className="detalle-price">
          ${product.price.toLocaleString("es-CL")}
        </p>
        <p className="detalle-desc">{product.description}</p>
        <button className="btn-add" onClick={handleAdd}>
          Agregar al carrito
        </button>
      </div>

      <div className="relacionados-container">
        <h3>Productos Relacionados</h3>
        <div className="relacionados-grid">
          {relacionados.map((rel) => (
            <Link to={`/producto/${rel.id}`} key={rel.id} className="relacionado-card">
              <img src={rel.image} alt={rel.name} />
              <p>{rel.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}