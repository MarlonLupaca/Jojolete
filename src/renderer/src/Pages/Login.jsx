import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-secundario">
            <div className="flex justify-center items-center w-[1000px] h-[500px] p-8 bg-primario rounded-2xl shadow-lg">

                {/* Sección de Imagen */}
                <div className="w-[50%] flex justify-center items-center">
                    <img src="./login.svg" alt="Ilustración de Login" className="max-w-[100%]" />
                </div>

                {/* Sección del Formulario */}
                <div className="w-[50%] px-[60px]">
                    <h2 className="mb-6 text-4xl font-extrabold text-center text-textoClaro">
                        Iniciar Sesión
                    </h2>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-textoClaro">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
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
                                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                                placeholder="••••••••"
                            />
                        </div>
                        <Link to="/home">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-terceario rounded-lg hover:bg-opacity-90 transition duration-200 focus:outline-none"
                            >
                                Iniciar Sesión
                            </button>
                        </Link>
                        
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
