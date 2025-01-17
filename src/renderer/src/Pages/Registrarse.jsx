import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Registrarse = () => {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
  });

  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);
  
  // Manejo de cambios en los inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "confirmPassword") {
      setConfirmarContrasena(value);
    } else {
      setNuevoUsuario({
        ...nuevoUsuario,
        [id]: value, // Actualiza el valor del campo específico
      });
    }
  };

  // Validación de campos y contraseñas
  const validateForm = () => {
    const { nombre, apellido, correo, contrasena } = nuevoUsuario;

    // Verificar que todos los campos sean llenados
    if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena) {
      toast.error("Todos los campos son obligatorios.");
      return false;
    }

    // Verificar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
      toast.error("Las contraseñas no coinciden.");
      return false;
    }

    return true;
  };

  // Manejo del formulario al enviarlo
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    GuardarUsuario(nuevoUsuario); // Llama a la función para guardar el usuario
  };

  // Función para guardar el usuario en la base de datos
  const GuardarUsuario = (usuario) => {
    fetch("http://localhost:8080/usuario/postUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al guardar usuario");
        }
        return respuesta.text();
      })
      .then((data) => {
        if (data === "Correo existente") {
          // Si el servidor responde con "Correo existente"
          toast.error("Correo ya está registrado.");
        } else {
          console.log("Usuario guardado:", data);
          toast.success("Usuario registrado exitosamente!"); // Notificación de éxito

          // Limpiar campos después del registro
          setNuevoUsuario({
            nombre: "",
            apellido: "",
            correo: "",
            contrasena: "",
          });
          setConfirmarContrasena("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al guardar usuario"); // Notificación de error
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secundario">
      <div className="flex justify-center items-center w-[1000px] h-[600px] p-8 bg-primario rounded-2xl shadow-lg">
        {/* Sección de Imagen */}
        <div className="w-[50%] flex justify-center items-center">
          <img src="./login.svg" alt="Ilustración de Registro" className="max-w-[100%]" />
        </div>

        {/* Sección del Formulario */}
        <div className="w-[50%] px-[60px]">
          <h2 className=" text-3xl font-extrabold text-center text-textoClaro">
            Crear Cuenta
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block mb-2 text-sm font-semibold text-textoClaro">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={nuevoUsuario.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                placeholder="Nombre"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="apellido" className="block mb-2 text-sm font-semibold text-textoClaro">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                value={nuevoUsuario.apellido}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                placeholder="Apellido"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="correo" className="block mb-2 text-sm font-semibold text-textoClaro">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="correo"
                value={nuevoUsuario.correo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="contrasena" className="block mb-2 text-sm font-semibold text-textoClaro">
                Contraseña
              </label>
              <input
                type={mostrarContrasena ? "text" : "password"}
                id="contrasena"
                value={nuevoUsuario.contrasena}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                className="absolute right-4 top-[50px] transform -translate-y-1/2"
              >
                <i className={`fas ${mostrarContrasena ? 'fa-eye-slash' : 'fa-eye'} text-gray-500`} />
              </button>
            </div>

            <div className="mb-4 relative">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-textoClaro">
                Confirmar Contraseña
              </label>
              <input
                type={mostrarConfirmarContrasena ? "text" : "password"}
                id="confirmPassword"
                value={confirmarContrasena}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-acento bg-primario text-textoClaro rounded-lg focus:outline-none focus:ring-2 focus:ring-terceario"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)}
                className="absolute right-4 top-[50px] transform -translate-y-1/2"
              >
                <i className={`fas ${mostrarConfirmarContrasena ? 'fa-eye-slash' : 'fa-eye'} text-gray-500`} />
              </button>
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
