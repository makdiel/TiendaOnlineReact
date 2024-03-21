import { useEffect, useState } from "react"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from 'moment';


export const ListaCategorias = () => { 
    const [dataCategorias, setDataCategorias] = useState([]);
    const navigate = useNavigate();

    const [contadorDeBorrar, setContadorDeBorrar] = useState(0);

    const getDatos = async () => {
        const url = "http://localhost:4000/api/CategoriaProducto";
        const response = await axios.get(url);
        const datos = (await response).data;
        console.log(datos);
        setDataCategorias(datos);
    }

    const borraCategoria = async (idPost) => {
        const url = `http://localhost:4000/api/CategoriaProducto/${idPost}`;
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
                {dataCategorias.map((item) => (
                    <div key={item.id} className="card mt-2">
                        <div className="card-header mb-2">
                            <p># {item.id} Nombre de la Categoria: {item.nombre_categoria}</p>                       
                            <button onClick={() => borraCategoria(item.id)} className="btn btn-outline-danger btn-sm">Borrar Categoria</button>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <footer className="blockquote-footer"> <br></br>Posteado el: {moment(item.fposteo).format('DD/MM/YYYY')} <br></br>  </footer>
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