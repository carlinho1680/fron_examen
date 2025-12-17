import React from 'react';
import Link from '../atoms/Link';

const NavLinks = ({ className }) => {
  return (
    <ul className={className}>
      <li><Link to="/">Inicio</Link></li>
      <li><Link to="/productos">Productos</Link></li>
      <li><Link to="/nosotros">Nosotros</Link></li>
      <li><Link to="/contacto">Contacto</Link></li>
    </ul>
  );
}

export default NavLinks;
