import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // === AGREGAR AL CARRITO ===
  function agregarAlCarrito(producto) {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);

      if (existe) {
        // Ya existe → aumentar cantidad
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      // No existe → agregarlo con cantidad 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }

  // === ELIMINAR SOLO UNA UNIDAD ===
  function eliminarDelCarrito(id) {
    setCarrito(prev => {
      const producto = prev.find(p => p.id === id);

      if (!producto) return prev;

      if (producto.cantidad > 1) {
        // Solo reducir una unidad
        return prev.map(p =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        );
      }

      // Si solo queda 1 → eliminarlo del carrito
      return prev.filter(p => p.id !== id);
    });
  }

  // === ELIMINAR EL PRODUCTO COMPLETO ===
  function eliminarProductoCompleto(id) {
    setCarrito(prev => prev.filter(p => p.id !== id));
  }

  // === VACIAR TODO EL CARRITO ===
  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        eliminarProductoCompleto,
        vaciarCarrito
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function usarCarrito() {
  return useContext(CarritoContext);
}
