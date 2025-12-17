export default function Categories({ selected, onSelect }) {
  const categories = [
    { id: "todo", name: "Todos" },
    { id: "hombre", name: "Hombre" },
    { id: "mujer", name: "Mujer" },
    { id: "unisex", name: "Unisex" },
    { id: "calzado", name: "Calzado" }
  ];

  return (
    <div className="categories-container">
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`category-btn ${selected === cat.id ? "active" : ""}`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
