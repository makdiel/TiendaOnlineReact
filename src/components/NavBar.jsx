import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <>
           <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">TiendaOnline</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
            <Link to="/" className="nav-link" >Home</Link>
        </li>
        <li className="nav-item">
        <Link tLinko="/proveedores" className="nav-link" >Proveedores</Link>
        </li>
        <li className="nav-item">
        <Link to="/productos" className="nav-link" >Productos</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Parametros
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/proveedores">Catalago de Proveedores</a></li>
            <li><a className="dropdown-item" href="/categorias">Catalago de Categorias</a></li>
            <li><a className="dropdown-item" href="/productos">Catalago de Productos</a></li>            
            <li><a className="dropdown-item" href="/tipos">Catalago de Tipos</a></li>
            <li><a className="dropdown-item" href="/sucursales">Catalago de Sucursales</a></li>
          </ul>
        </li>
        <li className="nav-item">
            <Link to="/contacto" className="nav-link" >Contacto</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    );
}





