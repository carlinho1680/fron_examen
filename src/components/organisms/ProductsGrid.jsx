import ProductCard from "../molecules/ProductCard";

export default function ProductsGrid({ products }) {
  return (
    <div className="products-grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
