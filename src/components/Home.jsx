import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const Home = () => {
    //const url = 'https://api.escuelajs.co/api/v1/categories';
    const url = 'http://localhost:4000/api/Producto';

    const [products, setProducts] = useState([]);


    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState(1);

    const getProductos = async () => {
        const response = await axios.get(url);
        setProducts(response.data);
    }

    useEffect(() => {
        getProductos();
    });

    return (
        <>
            <div className="card">
                <div className="card-body">
                </div>
                <h2 className="card-title"> Catalago de Productos </h2>
            </div>
            <div className="row">
                {products.map((item) => (
                    <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Name:  {item.nombre_producto}</h5>
                                <p className="card-text"> Precio: ${new Intl.NumberFormat('es-hn').format(item.precio)}</p>
                                <p>Categoria del Producto: <br></br>{item.nombre_categoria} </p>
                                <p>Tipo de Producto: <br></br>{item.nombre_tipo} </p>
                                <a href="#" className="btn btn-primary">Comprar</a>
                            </div>
                        </div>
                    </div>
                )
                )
                }
            </div>
            <footer class="container-fluid mt-5 p-5 mybg-gray" id="footer">
                <div class="row">                   
                    <div class="col-sm-12 col-md-4 col-lg-4">
                        <ul class="list-group miBorde">
                            <li class="list-group-item active" aria-current="true">An active item</li>
                            <li class="list-group-item">Ubicacion Contiguo a los mejores momentos</li>
                            <li class="list-group-item">Telefono: 9999-9999</li>
                            <li class="list-group-item">Correos: @test</li>
                        </ul>
                    </div>

                    <div class="col-sm-12 col-md-4 col-lg-4">
                        <ul class="list-group miBorde">
                            <li class="list-group-item active" aria-current="true">An active item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                            <li class="list-group-item">A fourth item</li>
                        </ul>
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-4">
                        <ul class="list-group miBorde">
                            <li class="list-group-item active" aria-current="true">Inicio</li>
                            <li class="list-group-item"><a href="#">Nosotros</a></li>
                            <li class="list-group-item"><a href="#Destacado">Destacado</a></li>
                            <li class="list-group-item"><a href="#">Inicio</a></li>
                        </ul>
                    </div>
                </div>
                
            </footer>
        </>
    )
}