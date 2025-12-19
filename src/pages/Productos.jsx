import { useEffect, useState } from "react";
import { getProductos } from "../api/productos.service";
import Categories from "../components/molecules/Categories";
import ProductsGrid from "../components/organisms/ProductsGrid";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos()
      .then((res) => {
        const dataOriginal = res.data || [];
        const adaptados = dataOriginal.map((p) => ({
          id: p.idProducto,
          name: p.nombreProducto,
          price: p.precio || 0,
          image: p.urlImagen,
          category: p.categoria
        }));
        setProductos(adaptados);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="productos-page-container">
      <h1 className="titulo-seccion">Nuestros Productos</h1>
      
      <Categories onSelect={() => {}} />
      
      <ProductsGrid products={productos} />
    </div>
  );
}