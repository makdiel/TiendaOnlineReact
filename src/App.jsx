import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Home } from './components/Home';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Contacto } from './components/Contacto';
import { ListaProductos }   from './components/ListaProductos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListaProveedores } from './components/ListaProveedores';
import { ListaCategorias } from './components/ListaCategorias';
import { ListaTipoProductos } from './components/ListaTipoProductos';
import { ListaPuntoVenta } from './components/ListaPuntosdeVenta';
import './App.css';

function App() {
  return (
   
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='/contacto' element={ <Contacto/> }></Route>
          <Route path='/productos' element={ <ListaProductos/> }></Route>
          <Route path='/proveedores' element={ <ListaProveedores/> }></Route>
          <Route path='/categorias' element={<ListaCategorias></ListaCategorias>}></Route>
          <Route path='/tipos' element={<ListaTipoProductos></ListaTipoProductos>}></Route>
          <Route path='/sucursales' element={<ListaPuntoVenta></ListaPuntoVenta>}></Route>
        </Routes>
        <Footer></Footer>   
      </BrowserRouter>
   
  )
}

export default App
