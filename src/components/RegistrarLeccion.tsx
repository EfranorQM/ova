import React, { useState, useEffect } from "react";
import { fetchModulos, createLeccion } from "../services/api";

interface Modulo {
  id: number;
  titulo: string;
}

const RegistrarLeccion: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [orden, setOrden] = useState<number | null>(null);
  const [moduloId, setModuloId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarModulos = async () => {
      try {
        const datos = await fetchModulos();
        setModulos(datos);
      } catch (err) {
        setError("No se pudieron cargar los módulos.");
      } finally {
        setLoading(false);
      }
    };

    cargarModulos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!moduloId) {
      setError("Por favor selecciona un módulo.");
      return;
    }

    try {
      await createLeccion({
        titulo,
        contenido,
        orden,
        modulo: moduloId,
      });
      setSuccess(true);
      setTitulo("");
      setContenido("");
      setOrden(null);
      setModuloId(null);
    } catch (err) {
      setError("Error al registrar la lección. Intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-green-500 to-blue-600 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Lección</h2>
        {loading ? (
          <p className="text-white text-center">Cargando módulos...</p>
        ) : error ? (
          <p className="text-red-300 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Título */}
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-white">
                Título
              </label>
              <input
                id="titulo"
                type="text"
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-green-300 focus:outline-none"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Introduce el título de la lección"
                required
              />
            </div>
  
            {/* Campo de Contenido */}
            <div>
              <label htmlFor="contenido" className="block text-sm font-medium text-white">
                Contenido
              </label>
              <textarea
                id="contenido"
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-green-300 focus:outline-none"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Introduce el contenido de la lección"
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
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-green-300 focus:outline-none"
                value={orden || ""}
                onChange={(e) => setOrden(Number(e.target.value))}
                placeholder="Número de orden de la lección"
              />
            </div>
  
            {/* Selección de Módulo */}
            <div>
              <label htmlFor="modulo" className="block text-sm font-medium text-white">
                Módulo
              </label>
              <select
                id="modulo"
                value={moduloId || ""}
                onChange={(e) => setModuloId(Number(e.target.value))}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-green-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona un módulo
                </option>
                {modulos.map((modulo) => (
                  <option key={modulo.id} value={modulo.id}>
                    {modulo.titulo}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Mensajes de Éxito o Error */}
            {error && (
              <p className="text-red-300 text-sm font-medium text-center">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-300 text-sm font-medium text-center">
                ¡Lección registrada con éxito!
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
        )}
      </div>
    </div>
  );
  
};

export default RegistrarLeccion;
