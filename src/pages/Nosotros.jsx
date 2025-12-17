import React from "react";
import "../styles/Nosotros.css";
import logo from "../assets/images/logo.webp";

export default function Nosotros() {
  return (
    <div className="nosotros-container">

      <div className="nosotros-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="nosotros-box">

        <h2>Nuestro Objetivo</h2>
        <p>
            Suburbia Store es una tienda dedicada a ofrecer moda accesible, moderna y de calidad para todos. 
            Nuestro objetivo es brindar una experiencia de compra confiable y cercana.
        </p>

        <h2>Nuestra Misión</h2>
        <p>
            Creemos en la innovación, el buen servicio y en entregar productos que combinan estilo, 
            comodidad y precio justo.

        </p>

        <h2>Nuestra Visión</h2>
        <p>
          Trabajamos día a día para convertirnos en una marca confiable y presente en la vida de las personas.
        </p>

      </div>
    </div>
  );
}
