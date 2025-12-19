import { useEffect, useState } from "react";
import { getProductos } from "../api/productos.service";
import Categories from "../components/molecules/Categories";
import ProductsGrid from "../components/organisms/ProductsGrid";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [category, setCategory] = useState("todo");

  useEffect(() => {
  getProductos()
    .then((res) => {
      console.log("RAW BACKEND:", res.data);

      const adaptados = res.data.map((p, index) => ({
        id: p.id ?? index + 1,
        name: p.nombre,
        price: p.precio,
        image: p.imagen,
        category: p.categoria,
        description: p.descripcion,
      }));

      setProductos(adaptados);
    })
    .catch(console.error);
}, []);




  const filtered =
    category === "todo"
      ? productos
      : productos.filter((p) => p.category === category);

  return (
    <div>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
        Productos
      </h2>

      <Categories selected={category} onSelect={setCategory} />
      <ProductsGrid products={filtered} />
    </div>
  );
}
