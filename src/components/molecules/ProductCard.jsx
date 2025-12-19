import React from "react";
import { Link } from "react-router-dom";
import { usarCarrito } from "../../context/CarritoContext";

export default function ProductCard({ product }) {
  const { agregarAlCarrito } = usarCarrito();

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
        </div>
      </Link>

      <div className="product-footer">
        <span className="product-price">
          ${product.price.toLocaleString("es-CL")}
        </span>
        <button 
          className="btn-add" 
          onClick={(e) => {
            e.preventDefault();
            agregarAlCarrito(product);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}