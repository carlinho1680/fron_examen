import React, { useState, useContext } from 'react'; 
import Logo from '../molecules/Logo';
import NavLinks from '../molecules/NavLinks';
import HamburgerButton from '../molecules/HamburgerButton';
import './Navbar.css';
import logoSrc from '../../assets/images/logo.webp'; 
import { Link, useNavigate } from "react-router-dom"; 
import { usarCarrito } from "../../context/CarritoContext";
import { AuthContext } from "../../context/AuthContext"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { carrito } = usarCarrito(); 
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Logo src={logoSrc} alt="Logo de la Empresa" />

        <div className="carrito-desktop">
          <Link to="/carrito" className="carrito-icono">
            🛒
            {carrito.length > 0 && (
              <span className="carrito-contador">{carrito.length}</span>
            )}
          </Link>
        </div>

        <div className="hamburger-container">
          <HamburgerButton onClick={toggleMenu} isOpen={menuOpen} />
        </div>

        <div className="nav-menu-desktop">
          <NavLinks className="nav-links-desktop" />

          <div className="auth-buttons-desktop">
            {user ? (
              <>
                <Link to="/perfil" className="auth-btn profile-btn">👤 {user.username}</Link>
                <button onClick={handleLogout} className="auth-btn logout-btn">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-btn">Iniciar sesión</Link>
                <Link to="/Register" className="auth-btn">Crear usuario</Link>
              </>
            )}
          </div>
        </div>

      </div>

      <div className={`nav-menu-mobile ${menuOpen ? 'active' : ''}`}>
        <NavLinks className="nav-links-mobile" />

        <div className="auth-buttons-mobile">
          {user ? (
            <>
              <p className="welcome-msg">Bienvenido, {user.username}</p>
              <Link to="/perfil" onClick={() => setMenuOpen(false)} className="auth-btn">Mi Perfil</Link>
              <button onClick={handleLogout} className="auth-btn logout-btn">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="auth-btn">Iniciar sesión</Link>
              <Link to="/Register" onClick={() => setMenuOpen(false)} className="auth-btn">Crear usuario</Link>
            </>
          )}
        </div>

        <div className="carrito-mobile">
          <Link to="/carrito" onClick={() => setMenuOpen(false)} className="carrito-icono">
            🛒
            {carrito.length > 0 && (
              <span className="carrito-contador">{carrito.length}</span>
            )}
          </Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;