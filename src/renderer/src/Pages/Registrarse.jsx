import React from 'react';

const Registrarse = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secundario">
      <div className="flex justify-center items-center w-[1000px] h-[600px] p-8 bg-primario rounded-2xl shadow-lg">

        {/* Sección de Imagen */}
        <div className="w-[50%] flex justify-center items-center">
          <img src="./login.svg" alt="Ilustración de Registro" className="max-w-[100%]" />
        </div>

        {/* Sección del Formulario */}
        <div className="w-[50%] px-[60px]">
          <h2 className="mb-6 text-3xl font-extrabold text-center text-textoClaro">
            Crear Cuenta
          </h2>

          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-semibold text-textoClaro">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                placeholder="Tu nombre"
              />
            </div>

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

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-textoClaro">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-textoClaro bg-terceario rounded-lg hover:bg-opacity-90 transition duration-200 focus:outline-none"
            >
              Registrarse
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="/" className="text-sm text-terceario hover:underline">
              ¿Ya tienes una cuenta? Inicia sesión
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Registrarse;
