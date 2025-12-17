import React from "react";
import { Link } from "react-router-dom";
import banner from "../../assets/images/banner.png";
import "../../styles/Home.css";

export default function AdminHome() {
  return (
    <div className="home">
      <img src={banner} alt="Banner" className="banner" />

      <h1>Panel de Administración</h1>

      <div className="options">
        <Link to="/admin/productos" className="btn-admin">Administrar Productos</Link>
        <Link to="/admin/usuarios" className="btn-admin">Administrar Usuarios</Link>
        <Link to="/admin/ordenes" className="btn-admin">Ver Órdenes</Link>
      </div>
    </div>
  );
}
