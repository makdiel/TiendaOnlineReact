import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { alertaSuccess, alertaError, alertaWarning, alertaConfirmation } from '../functions';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from 'moment';

export const ListaProductos = () => {
    const [dataProducto, setDataProducto] = useState([]);
    const navigate = useNavigate();

    const [contadorDeBorrar, setContadorDeBorrar] = useState(0);

    const [id, setId] = useState('');
    const [nombre_producto, setNombreProducto] = useState('');
    const [precio, setPrecio] = useState(0);
    const [id_tipo, setIdTipo] = useState('');
    const [id_proveedor, setIdProveedor] = useState('');
    const [id_categoria, setIdCategoria] = useState('');
    const [imagen, setImagen] = useState('');
    
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState(1);

    const getDatos = async () => {
        const url = "http://localhost:4000/api/Producto";
        const response = await axios.get(url);
        const datos = (await response).data;
        console.log(datos);
        setDataProducto(datos);
    }

    const deleteProducto = (id) => {
        let urlDelete = `http://localhost:4000/api/Producto/${id}`;

        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de eliminar el Producto?',
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
                mensaje = 'Se guardó el Producto';
            } else if (metodo === 'PUT') {
                mensaje = 'Se editó el Producto';
            } else if (metodo === 'DELETE') {
                mensaje = 'Se eliminó el Producto';
            }
            alertaSuccess(mensaje);
            document.getElementById('btnCerrarModal').click();
            getDatos();
        }).catch((error) => {
            alertaError(error.response.data.message);
            console.log(error);
        });
    }

    const openModal = (operation, id, nombre_producto, precio,id_tipo,id_proveedor,id_categoria) => {
        setId('');
        setNombreProducto('');
        setPrecio(0);
        setIdTipo('');
        setIdProveedor('');
        setIdCategoria('');
        setImagen('');

        
        if (operation === 1) {
            setTitleModal('Registrar Producto');
            setOperation(1);
        } else if (operation === 2) {
            setTitleModal('Modificar Producto');
            setId(id);
            setNombreProducto(nombre_producto);
            setPrecio(precio); 
            setIdTipo(id_tipo);
            setIdProveedor(id_proveedor);
            setIdCategoria(id_categoria);           
            setOperation(2);
        }
    }

    const validar = () => {
        let payload;
        let metodo;
        let urlAxios;
       // const img = event.target.files[0];

        if (nombre_producto === '') {
            alertaWarning('Escriba el nombre del Producto', 'nombre_producto');
        } else if (precio  <= 0 ) {
            alertaWarning('Ingrese el Precio valido', 'precio');
        } else if (id_tipo === '') {
            alertaWarning('Ingrese un id de tipo de producto valido', 'id_tipo');
        } else if (id_proveedor === '') {
            alertaWarning('Ingrese un id de Proveedor valido', 'id_proveedor');
        } else if (id_categoria === '') {
            alertaWarning('Ingrese un id de Categoria valido', 'id_categoria');
        } else {
            payload = {
                nombre_producto: nombre_producto,
                precio: precio,
                id_tipo: id_tipo,
                id_proveedor: id_proveedor,
                id_categoria: id_categoria
            };

            if (operation === 1) {
                metodo = 'POST';
                urlAxios = 'http://localhost:4000/api/Producto';
            } else {
                metodo = 'PUT';
                urlAxios = `http://localhost:4000/api/Producto/${id}`;
            }

            console.log(enviarSolicitud);
            enviarSolicitud(urlAxios, metodo, payload);
        }
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
                <button onClick={() => openModal(1)} className='btn btn-dark w-100' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                    <i className='fa-solid fa-circle-plus' /> Añadir Nuevos Productos
                </button>
                <button onClick={iniciotHandler} className="btn btn-dark w-100" type="button" >
                    Volver al inicio
                </button>
                {dataProducto.map((item) => (
                    <div key={item.id} className="card mt-2">
                        <div className="card-header mb-2">
                            <p># {item.id} Nombre Producto: {item.nombre_producto}</p>
                            <p> ${new Intl.NumberFormat('es-hn').format(item.precio)} </p>
                            <p>Nombre del Proveedor: <br></br>{item.nombre_proveedor} </p>
                            <button onClick={() => deleteProducto(item.id)} className="btn btn-outline-danger btn-sm">Borrar Producto</button>
                            <button onClick={() => openModal(2, item.id, item.nombre_producto, item.precio,item.id_tipo,item.id_proveedor,item.id_categoria)} className='btn  btn-outline-warning btn-sm' data-bs-toggle='modal' data-bs-target='#modalProducts'> Editar Proveedor </button>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <footer className="blockquote-footer">Categoria: {item.nombre_categoria} <br></br>Tipo Producto: {item.nombre_tipo} <br></br> Posteado el: {moment(item.fposteo).format('DD/MM/YYYY')}<br></br>  </footer>
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
                                    <input type='text' id='nombre_producto' className='form-control' placeholder='nombre_producto' value={nombre_producto} onChange={(e) => setNombreProducto(e.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                    <input type='text' id='precio' className='form-control' placeholder='precio' value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                    <input type='text' id='id_tipo' className='form-control' placeholder='id_tipo' value={id_tipo} onChange={(e) => setIdTipo(e.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                    <input type='text' id='id_proveedor' className='form-control' placeholder='id_proveedor' value={id_proveedor} onChange={(e) => setIdProveedor(e.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                    <input type='text' id='id_categoria' className='form-control' placeholder='id_categoria' value={id_categoria} onChange={(e) => setIdCategoria(e.target.value)} />
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

