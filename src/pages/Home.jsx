import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../api/productos.service";
import "../styles/Home.css";
import banner from "../assets/images/banner.png";

export default function Home() {
  // Estado para los productos que vienen de la API
  const [destacados, setDestacados] = useState([]);

  const noticias = [
    { title: "Economía chilena muestra señales de recuperación", link: "https://www.emol.com", date: "22-11-2025" },
    { title: "Nuevo proyecto de transporte mejora la conectividad en Santiago", link: "https://www.latercera.com", date: "21-11-2025" },
    { title: "Regiones del norte se preparan para temporada de turismo", link: "https://www.biobiochile.cl", date: "20-11-2025" },
    { title: "Tecnología y emprendimiento: startups chilenas destacan en Latinoamérica", link: "https://www.df.cl", date: "19-11-2025" },
    { title: "Clima: se pronostican altas temperaturas para este fin de semana", link: "https://www.meteochile.gob.cl", date: "18-11-2025" },
  ];

  // Cargar productos al montar el componente
  useEffect(() => {
    getProductos()
      .then((res) => {
        const dataOriginal = res.data || [];
        // Mapeamos según los nombres de tu DTO (idProducto, nombreProducto, urlImagen)
        const adaptados = dataOriginal.slice(0, 4).map((p) => ({
          id: p.idProducto,
          name: p.nombreProducto,
          price: p.precio || 0,
          image: p.urlImagen,
        }));
        setDestacados(adaptados);
      })
      .catch((err) => console.error("Error cargando destacados en Home:", err));
  }, []);

  return (
    <div className="home-container">
      {/* BANNER PRINCIPAL - Esquina a esquina */}
      <div className="banner">
        <img src={banner} className="banner-img" alt="Suburbia Banner" />
        <div className="banner-text">
          <h1>Suburbia Store</h1>
          <p>Tu estilo comienza aquí</p>
          <Link to="/productos" className="btn-banner">
            Ver productos
          </Link>
        </div>
      </div>

      {/* CATEGORÍAS */}
      <h2 className="home-title">Categorías destacadas</h2>
      <div className="categorias-home">
        <Link to="/productos" className="categoria-box hombre">Hombre</Link>
        <Link to="/productos" className="categoria-box mujer">Mujer</Link>
        <Link to="/productos" className="categoria-box unisex">Unisex</Link>
        <Link to="/productos" className="categoria-box calzado">Calzado</Link>
      </div>

      {/* PRODUCTOS DESTACADOS - Dinámicos */}
      <h2 className="home-title">Productos destacados</h2>
      <div className="destacados-grid">
        {destacados.length > 0 ? (
          destacados.map((p) => (
            <Link key={p.id} to={`/producto/${p.id}`} className="destacado-card">
              <img src={p.image} alt={p.name} />
              <p>{p.name}</p>
              <span>${p.price.toLocaleString("es-CL")}</span>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1/-1" }}>Cargando productos...</p>
        )}
      </div>

      {/* NOTICIAS */}
      <h2 className="home-title">Noticias de Chile</h2>
      <div className="news-container">
        {noticias.map((n, index) => (
          <a key={index} href={n.link} target="_blank" rel="noopener noreferrer" className="news-item">
            <h4>{n.title}</h4>
            <p>{n.date}</p>
          </a>
        ))}
      </div>
    </div>
  );
}