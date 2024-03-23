import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { alertaSuccess, alertaError, alertaWarning, alertaConfirmation } from '../functions';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from 'moment';


export const ListaCategorias = () => {
    const [dataCategorias, setDataCategorias] = useState([]);
    const navigate = useNavigate();

    const [contadorDeBorrar, setContadorDeBorrar] = useState(0);


    const [id, setId] = useState('');
    const [nombre_categoria, setNombreCategoria] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState(1);

    const getDatos = async () => {
        const url = "http://localhost:4000/api/CategoriaProducto";
        const response = await axios.get(url);
        const datos = (await response).data;
        console.log(datos);
        setDataCategorias(datos);
    }

    const openModal = (operation, id, nombre_categoria) => {
        setId('');
        setNombreCategoria('');
        if (operation === 1) {
            setTitleModal('Registrar Categorias');
            setOperation(1);
        } else if (operation === 2) {
            setTitleModal('Modificar Categorias');
            setId(id);
            setNombreCategoria(nombre_categoria);
            setOperation(2);
        }
    }

    const deleteCategoria = (id) => {
        let urlDelete = `http://localhost:4000/api/CategoriaProducto/${id}`;

        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de eliminar el producto?',
            icon: 'question',
            text: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                enviarSolicitud(urlDelete, 'DELETE', {});
            }
        }).catch((error) => {
            alertaError(error);
            console.log(error);
        });
    }

    const enviarSolicitud = async (url, metodo, parametros) => {
        let obj = {
            method: metodo,
            url: url,
            data: parametros,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        await axios(obj).then(() => {
            let mensaje;

            if (metodo === 'POST') {
                mensaje = 'Se guardó el Tipo';
            } else if (metodo === 'PUT') {
                mensaje = 'Se editó el tipo';
            } else if (metodo === 'DELETE') {
                mensaje = 'Se eliminó el Tipo';
            }
            alertaSuccess(mensaje);
            document.getElementById('btnCerrarModal').click();
            getDatos();
        }).catch((error) => {
            alertaError(error.response.data.message);
            console.log(error);
        });
    }

    const validar = () => {
        let payload;
        let metodo;
        let urlAxios;

        if (nombre_categoria === '') {
            alertaWarning('Escriba el nombre de la Categoria', 'nombre_categoria');
        } else {
            payload = {
                nombre_categoria: nombre_categoria
            };

            if (operation === 1) {
                metodo = 'POST';
                urlAxios = 'http://localhost:4000/api/CategoriaProducto';
            } else {
                metodo = 'PUT';
                urlAxios = `http://localhost:4000/api/CategoriaProducto/${id}`;
            }

            console.log(enviarSolicitud);
            enviarSolicitud(urlAxios, metodo, payload);
        }
    }

    const iniciotHandler = () => {
        navigate('/Home');
    }

    useEffect(() => {
        getDatos();
    }, [contadorDeBorrar]);
    return (
        <>
            <div className="container">
                <button onClick={() => openModal(1)} className='btn btn-dark w-100' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                    <i className='fa-solid fa-circle-plus' /> Añadir Nuevas Categorias
                </button>
                <button onClick={iniciotHandler} className="btn btn-dark  w-100" type="button" >
                    <i className='fa-solid fa-circle-plus' /> Volver al inicio
                </button>
                {dataCategorias.map((item) => (
                    <div key={item.id} className="card mt-2">
                        <div className="card-header mb-2">
                            <p># {item.id} Nombre de la Categoria: {item.nombre_categoria}</p>
                            <button onClick={() => deleteCategoria(item.id)} className="btn btn-outline-danger btn-sm">Borrar Categoria</button>
                            <button onClick={() => openModal(2, item.id, item.nombre_categoria)} className='btn  btn-outline-warning btn-sm' data-bs-toggle='modal' data-bs-target='#modalProducts'> Editar Categoria </button>
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
                <div id='modalProducts' className='modal fade' aria-hidden='true'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <label className='h5'>{titleModal}</label>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='cloase' />
                            </div>
                            <div className='modal-body'>
                                <input type='hidden' id='id' />
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                    <input type='text' id='nombre_categoria' className='form-control' placeholder='nombre_categoria' value={nombre_categoria} onChange={(e) => setNombreCategoria(e.target.value)} />
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button onClick={() => validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk' /> Guardar
                                </button>
                                <button id='btnCerrarModal' className='btn btn-secondary' data-bs-dismiss='modal'>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )




}