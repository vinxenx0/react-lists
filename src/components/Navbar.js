import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-search"></i> List Manager
        </Link>

        {/* Botón del menú en móvil */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar} // ✅ Manejo manual del toggle
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación con estado de apertura */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>
                <i className="bi bi-search"></i> Explorar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/activity" onClick={() => setIsOpen(false)}>
                <i className="bi bi-activity"></i> Actividad
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/favorites" onClick={() => setIsOpen(false)}>
                    <i className="bi bi-heart"></i> Favoritos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" onClick={() => setIsOpen(false)}>
                    <i className="bi bi-list-task"></i> Mis Listas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" onClick={() => setIsOpen(false)}>
                    <i className="bi bi-person-circle"></i> Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white" onClick={() => { logout(); setIsOpen(false); }}>
                    <i className="bi bi-box-arrow-right"></i> Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => setIsOpen(false)}>
                    <i className="bi bi-key"></i> Inicio de Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={() => setIsOpen(false)}>
                    <i className="bi bi-person-plus"></i> Registro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
