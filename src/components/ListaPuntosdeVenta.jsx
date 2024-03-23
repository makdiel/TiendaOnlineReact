import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { alertaSuccess, alertaError, alertaWarning, alertaConfirmation } from '../functions';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from 'moment';

export const ListaPuntoVenta = () => {
    const [dataPuntoVenta, setDataPuntoVenta] = useState([]);
    const navigate = useNavigate();

    const [contadorDeBorrar, setContadorDeBorrar] = useState(0);
    const [id, setId] = useState('');
    const [nombre_puntoventa, setNombrePuntoVenta] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contacto, setContacto] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState(1);

    const getDatos = async () => {
        const url = "http://localhost:4000/api/PuntoVenta";
        const response = await axios.get(url);
        const datos = (await response).data;
        console.log(datos);
        setDataPuntoVenta(datos);
    }

    const deletePuntoVenta = (id) => {
        let urlDelete = `http://localhost:4000/api/PuntoVenta/${id}`;

        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Está seguro de eliminar la Sucursal?',
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

    const iniciotHandler = () => {
        navigate('/Home');
    }

    useEffect(() => {
        getDatos();
    }, [contadorDeBorrar]);

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

    const openModal = (operation, id, nombre_puntoventa, direccion, contacto) => {
        setId('');
        setNombrePuntoVenta('');
        setDireccion('');
        setContacto('');


        if (operation === 1) {
            setTitleModal('Registrar Sucursales');
            setOperation(1);
        } else if (operation === 2) {
            setTitleModal('Modificar Sucursal');
            setId(id);
            setNombrePuntoVenta(nombre_puntoventa);
            setDireccion(direccion);
            setContacto(contacto);
            setOperation(2);
        }
    }

    const validar = () => {
        let payload;
        let metodo;
        let urlAxios;

        if (nombre_puntoventa === '') {
            alertaWarning('Escriba el nombre de la Sucursal', 'nombre_puntoventa');
        } else if (direccion === '') {
            alertaWarning('Escriba la Direccion de la Sucursal', 'direccion');
        } else if (contacto === '') {
            alertaWarning('Ingrese un Conctacto para la Sucursal', 'contacto');
        } else {
            payload = {
                nombre_puntoventa: nombre_puntoventa,
                direccion: direccion,
                contacto: contacto
            };

            if (operation === 1) {
                metodo = 'POST';
                urlAxios = 'http://localhost:4000/api/PuntoVenta';
            } else {
                metodo = 'PUT';
                urlAxios = `http://localhost:4000/api/PuntoVenta/${id}`;
            }

            console.log(enviarSolicitud);
            enviarSolicitud(urlAxios, metodo, payload);
        }
    }

    return (
        <>
            <div className="container">
                <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                    <i className='fa-solid fa-circle-plus' /> Añadir Nuevos Puntos de Venta
                </button>
                <button onClick={iniciotHandler} className='btn  btn-dark'   >
                                <i className='fa-solid fa-circle-plus' />  Volver al inicio
                            </button>
                {dataPuntoVenta.map((item) => (
                    <div key={item.id} className="card mt-2">
                        <div className="card-header mb-2">
                            <p># {item.id} Nombre Sucursal: {item.nombre_puntoventa}</p>
                            <p>Direccion: <br></br>{item.direccion} </p>
                            <button onClick={() => deletePuntoVenta(item.id)} className="btn btn-outline-danger btn-sm">Borrar Sucursal</button>
                            <button onClick={() => openModal(2, item.id, item.nombre_puntoventa, item.direccion,item.contacto)} className='btn  btn-outline-warning btn-sm' data-bs-toggle='modal' data-bs-target='#modalProducts'> Editar Punto </button>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <footer className="blockquote-footer">Nombre del Contacto: {item.contacto} <br></br> Posteado el: {moment(item.fposteo).format('DD/MM/YYYY')}  </footer>
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
                                    <input type='text' id='nombre_puntoventa' className='form-control' placeholder='nombre_puntoventa' value={nombre_puntoventa} onChange={(e) => setNombrePuntoVenta(e.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                    <input type='text' id='direccion' className='form-control' placeholder='direccion' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                                </div>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                    <input type='text' id='contacto' className='form-control' placeholder='contacto' value={contacto} onChange={(e) => setContacto(e.target.value)} />
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