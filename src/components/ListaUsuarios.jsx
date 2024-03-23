import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { alertaSuccess, alertaError, alertaWarning, alertaConfirmation } from '../functions';
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";
//import moment from 'moment';

export const ListaUsuarios = () => { 
  const [form, setForm] = useState({
    nombre_usuario : "", 
    correo_electronico : "", 
    contrasena : "", 
    nombre : "", 
    foto_perfil : "", 
    activo : true, 
    id_rol : 1
   });

   const onChangeHandler = () => {
    const { name, value } = event.target;
    if (name ==="foto_perfil") {
       const img = event.target.files[0];
       setForm({ ...form, [name]: img });
       return;
    }
    setForm({ ...form, [name]: value });
}
const submitHandler = async () => {
    const url = "http://localhost:4000/api/usuario";
    event.preventDefault();
    const datosFormulario = new FormData();    
    datosFormulario.append( "nombre_usuario" , form.nombre_usuario);
    datosFormulario.append( "correo_electronico" , form.correo_electronico);
    datosFormulario.append( "contrasena" , form.contrasena);
    datosFormulario.append( "nombre" , form.nombre);
    datosFormulario.append( "foto_perfil" , form.foto_perfil);

    const result  = await axios.post(url, datosFormulario);
    const resultData = (await result).data;
    navigate('/Home')
}
    const navigate = useNavigate();
    const [titleModal, setTitleModal] = useState('');
    const [operation, setOperation] = useState(1);

    return (
        <>
        <div className='container mt-5' >
            <form onSubmit={submitHandler} >
                <fieldset>
                    <legend>Crear Usuario</legend>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Usuario</label>
                        <div className="col-sm-10">
                            <input className="form-control-plaintext"
                                name="nombre_usuario"
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Correo Electronico</label>
                        <div className="col-sm-10">
                            <input className="form-control-plaintext"
                                name="correo_electronico"
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Contraseña </label>
                        <div className="col-sm-10">
                            <input type="password"   className="form-control-plaintext"
                                name="contrasena"
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-10">
                            <input className="form-control-plaintext"
                                name="nombre"
                                onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="form-label mt-4">Imagen</label>
                        <input className="form-control " type="file" name="foto_perfil" onChange={onChangeHandler} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Crear Post</button>
                </fieldset>
            </form>
        </div>
    </>     
    )
}