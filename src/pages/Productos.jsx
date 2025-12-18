import { useState } from "react";
import { products } from "../data/products";
import Categories from "../components/molecules/Categories";
import ProductsGrid from "../components/organisms/ProductsGrid";

export default function Productos() {
  const [category, setCategory] = useState("todo");

  const filtered =
    category === "todo"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div>
      <h2>Productos</h2>
      <Categories selected={category} onSelect={setCategory} />
      <ProductsGrid products={filtered} />
    </div>
  );
}
