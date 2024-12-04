import React, { useState } from "react";
import { fetchUsuarios } from "../services/api";
import logo from "../assets/logo.png";

const Login: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para la carga

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError("");
    setIsLoading(true); // Activar animación

    try {
      const usuarios = await fetchUsuarios();

      const usuarioEncontrado = usuarios.find(
        (usuario: any) =>
          usuario.email === correo && usuario.contrasena === contrasena
      );

      if (usuarioEncontrado) {
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

        if (usuarioEncontrado.rol === 1) {
          window.location.href = "/admin";
        } else if (usuarioEncontrado.rol === 2) {
          window.location.href = "/docente";
        } else if (usuarioEncontrado.rol === 3) {
          window.location.href = "/estudiante";
        } else {
          setMensajeError("Rol de usuario no válido.");
        }
      } else {
        setMensajeError("Correo o contraseña incorrectos.");
      }
    } catch (error) {
      setMensajeError("Error al conectar con el servidor.");
    } finally {
      setIsLoading(false); // Desactivar animación
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 relative">
        {/* Logo o Ilustración */}
        <div className="flex justify-center -mt-12">
          <img
            src={logo} // Reemplaza con tu logo
            alt="Logo OVA"
            className={`w-36 h-36 rounded-full shadow-lg border-4 border-white ${
              isLoading ? "animate-spin-slow" : ""
            }`}
          />
        </div>
        <h2 className="text-3xl font-bold text-center mt-6 text-gray-800">
          Bienvenido al OVA Ondas y Partículas
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Aprende, crece, transforma.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contrasena"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Tu contraseña"
              required
            />
          </div>
          {mensajeError && (
            <p className="text-red-500 text-sm text-center">{mensajeError}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            disabled={isLoading} // Deshabilitar el botón durante la carga
          >
            {isLoading ? "Cargando..." : "Ingresar"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Olvidaste tu contraseña?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Recuperar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
