import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../components/UserContext.jsx';
import config from '../components/config'

const Login = () => {

    const url = config.API_URL

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!correo || !contrasena) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }

        if (!validateEmail(correo)) {
            toast.error('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${url}/usuario/login`, {
                correo,
                contrasena
            });

            if (response.data.nombres !== 'No existe') {
                setUser({ nombres: response.data.nombres, apellidos: response.data.apellidos });
                navigate('/inicio');
                toast.success('¡Inicio de sesión exitoso!');
            } else {
                toast.error('Credenciales incorrectas');
            }
        } catch (error) {
            toast.error('Error al conectarse con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secundario">
            <div className="flex justify-center items-center w-[1000px] h-[500px] p-8 bg-primario rounded-2xl shadow-lg">
                <div className="w-[50%] flex justify-center items-center">
                    <img src="./login.svg" alt="Ilustración de Login" className="max-w-[100%]" />
                </div>
                <div className="w-[50%] px-[60px]">
                    <h2 className="mb-6 text-4xl font-extrabold text-center text-textoClaro">
                        Iniciar Sesión
                    </h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-textoClaro">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                                placeholder="tucorreo@ejemplo.com"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-textoClaro">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-terceario rounded-lg hover:bg-opacity-90 transition duration-200 focus:outline-none"
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link to="/Registrarse" className="text-sm text-terceario hover:underline">
                            ¿No tienes una cuenta? Regístrate
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;