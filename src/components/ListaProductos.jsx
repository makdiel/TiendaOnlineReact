import { useEffect, useState } from "react"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';

export const ListaProductos = () => {
    const [dataProducto, setDataProducto] = useState([]);
    const navigate = useNavigate();

    const [contadorDeBorrar, setContadorDeBorrar] = useState(0);

    const getDatos = async () => {
        const url = "http://localhost:4000/api/Producto";
        const response = await axios.get(url);
        const datos = (await response).data;
        console.log(datos);
        setDataProducto(datos);
    }

    const borraProducto = async (idPost) => {
        const url = `http://localhost:4000/api/Producto/${idPost}`;
        const response = await axios.delete(url);
        const datos = (await response).data;

        setContadorDeBorrar(contadorDeBorrar + 1);
        console.log(contadorDeBorrar);
    }

    const iniciotHandler = () => {
        navigate('/');
    }

    useEffect(() => {
        getDatos();
    }, [contadorDeBorrar]);

    return (
        <>
            <div className="container">
                <button onClick={iniciotHandler} className="btn btn-primary  w-100" type="button" >
                    Volver al inicio
                </button>
                {dataProducto.map((item) => (
                    <div key={item.id} className="card mt-2">
                        <div className="card-header mb-2">
                            <p># {item.id} Nombre Producto: {item.nombre_producto}</p>
                            <p> ${new Intl.NumberFormat('es-hn').format(item.precio)} </p>
                            <p>Nombre del Proveedor: <br></br>{item.nombre_proveedor} </p>
                            <button onClick={() => borraProducto(item.id)} className="btn btn-outline-danger btn-sm">Borrar Producto</button>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <footer className="blockquote-footer">Categoria: {item.nombre_categoria} <br></br>Tipo: {item.nombre_Tipo} <br></br>  </footer>
                            </blockquote>
                        </div>
                    </div>

                )
                )
                }
            </div>
        </>
    )
}

