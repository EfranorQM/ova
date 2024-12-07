import React, { useState, useEffect } from "react";
import { fetchLecciones, createActividad } from "../services/api";

interface Leccion {
  id: number;
  titulo: string;
}

const RegistrarActividad: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [lecciones, setLecciones] = useState<Leccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<"interactiva" | "evaluacion" | "">("");
  const [leccionId, setLeccionId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarLecciones = async () => {
      try {
        const datos = await fetchLecciones();
        setLecciones(datos);
      } catch (err) {
        setError("No se pudieron cargar las lecciones.");
      } finally {
        setLoading(false);
      }
    };

    cargarLecciones();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!tipo || !leccionId) {
      setError("Por favor selecciona un tipo y una lección.");
      return;
    }

    try {
      await createActividad({
        titulo,
        descripcion,
        tipo,
        leccion: leccionId,
      });
      setSuccess(true);
      setTitulo("");
      setDescripcion("");
      setTipo("");
      setLeccionId(null);
    } catch (err) {
      setError("Error al registrar la actividad. Intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Actividad</h2>
        {loading ? (
          <p className="text-white text-center">Cargando lecciones...</p>
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
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Introduce el título de la actividad"
                required
              />
            </div>

            {/* Campo de Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-white">
                Descripción
              </label>
              <textarea
                id="descripcion"
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Introduce una descripción de la actividad"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Campo de Tipo */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-white">
                Tipo
              </label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as "interactiva" | "evaluacion")}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona un tipo
                </option>
                <option value="interactiva">Interactiva</option>
                <option value="evaluacion">Evaluación</option>
              </select>
            </div>

            {/* Selección de Lección */}
            <div>
              <label htmlFor="leccion" className="block text-sm font-medium text-white">
                Lección
              </label>
              <select
                id="leccion"
                value={leccionId || ""}
                onChange={(e) => setLeccionId(Number(e.target.value))}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona una lección
                </option>
                {lecciones.map((leccion) => (
                  <option key={leccion.id} value={leccion.id}>
                    {leccion.titulo}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensajes de Éxito o Error */}
            {error && (
              <p className="text-red-300 text-sm font-medium text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-300 text-sm font-medium text-center">
                ¡Actividad registrada con éxito!
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
                className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
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

export default RegistrarActividad;
