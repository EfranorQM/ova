import React, { useState } from "react";
import { createModulo } from "../services/api"; // Asegúrate de que el path sea correcto

interface RegistrarModuloProps {
  onClose: () => void; // Función para cerrar el modal
}

const RegistrarModulo: React.FC<RegistrarModuloProps> = ({ onClose }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [orden, setOrden] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
  
    try {
      const nuevoModulo = await createModulo({ titulo, descripcion, orden });
      console.log("Módulo registrado con éxito:", nuevoModulo);
      setSuccess(true);
      setTitulo("");
      setDescripcion("");
      setOrden(null);
    } catch (err) {
      console.error("Error al registrar el módulo:", err);
      setError("No se pudo registrar el módulo. Intenta nuevamente.");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Módulo</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Título */}
          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-medium text-white"
            >
              Título
            </label>
            <input
              id="titulo"
              type="text"
              className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Introduce el título del módulo"
              required
            />
          </div>
  
          {/* Campo de Descripción */}
          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-white"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe el contenido del módulo"
              rows={4}
              required
            ></textarea>
          </div>
  
          {/* Campo de Orden */}
          <div>
            <label htmlFor="orden" className="block text-sm font-medium text-white">
              Orden
            </label>
            <input
              id="orden"
              type="number"
              className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              value={orden || ""}
              onChange={(e) => setOrden(Number(e.target.value))}
              placeholder="Número de orden del módulo"
            />
          </div>
  
          {/* Mensajes de Éxito o Error */}
          {error && (
            <p className="text-red-300 text-sm font-medium text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-300 text-sm font-medium text-center">
              ¡Módulo registrado con éxito!
            </p>
          )}
  
          {/* Botones */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default RegistrarModulo;