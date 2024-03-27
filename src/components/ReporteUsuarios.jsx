import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { alertaSuccess, alertaError, alertaWarning } from '../functions';
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";
import moment from 'moment';

export const ReporteUsuarios = ({ contador }) => {
    const navigate = useNavigate();
    const [datos, useData] = useState([]);

    const getDatos = async () => {
        const url = "http://localhost:4000/api/usuario";
        const result = await axios.get(url);
        const resultData = (await result).data;
        useData(resultData);
    }
    const iniciotHandler = () => {
        navigate('/Home');
    }
    useEffect(() => {
        getDatos();
    }, [contador]);


    return (
        <>
            <div className="container">
                {datos.map((item) => (
                    <div key={item.nombre_usuario} className="card mt-2">
                        <div className="card-header mb-2">
                            <div className="card-body">
                                <img src={`data:${item.mime_type};base64,${item.foto_perfil}`} style={{width : '40%' }}  className="rounded  img-thumbnail" />
                            </div>                            
                            <p><h3>{item.nombre}</h3> <br></br> </p>                           
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <footer className="blockquote-footer"> 
                                    <br></br><p>Nombre Usuario: {item.nombre_usuario}</p>
                                    <p>E-Mail: <br></br>{item.correo_electronico} </p>
                                    Rol: {item.nombre_rol} 
                                    <br></br>Posteado el: {moment(item.fecha_creacion).format('DD/MM/YYYY')}
                                    <br></br>  
                                </footer>
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