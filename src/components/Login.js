import React from 'react';
import axios from "axios";
import swAlertService from "../services/swAlert";
import {useNavigate, Navigate} from "react-router-dom";

import background from "../assets/bg-img.png";
import "../css/login.css"

function Login(){

    const navigate = useNavigate();

    const sendHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^\S+@\S+\.\S+$/;

        if(email === '' || password === ''){
            swAlertService("Los campos no pueden estar vacios");
            return;
        }

        if(email !== '' && !regexEmail.test(email)){
            swAlertService("El email debe ser válido");
            return;
        }

        if(email !== 'challenge@alkemy.org' || password !== 'react'){
            swAlertService("Usuario o contraseña incorrectos");
            return;
        }

        axios.post('http://challenge-react.alkemy.org', {email, password})
        .then(res => {

                    swAlertService("Ingresaste exitosamente");
                    const token = res.data.token;
                    sessionStorage.setItem('token', token);
                    navigate("/home")

        })
    }

    let token = sessionStorage.getItem('token');

            return(
                <>
                {token && <Navigate to="/home"/>}
                {!token && <div className="h-100 w-100 d-flex flex-column flex-md-row justify-content-center align-items-center background">
                    
                    <img src={background} alt="imagen de tarantino film" ></img>
                    
                    <div className="d-flex flex-column bg-light pb-4 pt-3 ps-4 pe-4 rounded" style={{width: "500px"}}>
                        <h2 className="mb-3">Ingresa a <span className="text-danger">A</span>lkeflix</h2>
                        <form className="d-flex flex-column" onSubmit={sendHandler}>
                            <label htmlFor="floatingInput" className="form-label">Email</label>
                            <input className="p-1 rounded mb-2 form-control" type="text" name="email" placeholder="challenge@alkemy.org"/>
                            <label htmlFor="floatingPassword" className="form-label">Contraseña</label>
                            <input className="p-1 rounded mb-4 form-control" type="password" name="password" placeholder="react"/>
                            <button type="submit" className="bg-dark p-1 text-white rounded">Ingresar</button>
                        </form>
                    </div>
                </div>}
                
                </>
            )

}



export default Login;