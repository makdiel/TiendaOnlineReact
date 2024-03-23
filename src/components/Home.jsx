import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { alertaSuccess, alertaError, alertaWarning, alertaConfirmation } from '../functions';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Home = () => {
    const url = 'https://api.escuelajs.co/api/v1/categories';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState(1);

    const getProductos = async () => {
        const response = await axios.get(url);
        setProducts(response.data);
    }

    useEffect(() => {
        getProductos();
    });

    const openModal = (operation, id, name, image) => {
        setId('');
        setName('');
        setImage('');

        if (operation === 1) {
            setTitleModal('Registrar Producto');
            setOperation(1);
        } else if (operation === 2) {
            setTitleModal('Editar Producto');
            setId(id);
            setName(name);
            setImage(image);
            setOperation(2);
        }
    }

    return (
        
            <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                    {
                        products.map((products, i) => (
                            <div class="carousel-item active" data-bs-interval="1000">
                                <img src={products.image} className="d-block w-50 " alt='....'></img>
                            </div>
                        )
                        )
                    }
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

       

    )
}