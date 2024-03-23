import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const InicioSesion = () => {
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        nombre_usuario: "",
        pass: ""
    });
    const [inicioSesion, setInicioSesion] = useState("");
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setDataForm({ ...dataForm, [name]: value });
    }
    const submitHandler = async () => {
        event.preventDefault();
        const url = `http://localhost:4000/api/usuario/auth/${dataForm.nombre_usuario}/${dataForm.pass}`;
        try {
            const result = await axios.get(url);
            const resultData = (await result).data;
            navigate('/Home');
        } catch (err) {
            setInicioSesion("Error de Inicio de Sesion");
        }
    }
    return (
        <>
            <div className='container' >
                <div className="row justify-content-center">
                    <div class="card login-container">
                        <div class="card-header">
                            <h3 class="text-center">Inicio de Sesión</h3>
                        </div>
                        <div class="card-body">
                        <form onSubmit={submitHandler} >
                            <fieldset>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Usuario</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control-plaintext" placeholder="Ingrese su usuario"
                                            name="nombre_usuario"
                                            onChange={onChangeHandler} />
                                    </div>
                                    <label className="col-sm-2 col-form-label">Contraseña</label>
                                    <div className="col-sm-10">
                                        <input type="password" className="form-control-plaintext" placeholder="Ingrese su contraseña"
                                            name="pass"
                                            onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Iniciar Sesion</button>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    <div> {inicioSesion} </div>
                </div>
            </div>
        </>
    )
}
