import React, { useState, useEffect } from "react";
import { fetchActividades, createPregunta } from "../services/api";

interface Actividad {
  id: number;
  titulo: string;
}

const RegistrarPregunta: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [pregunta, setPregunta] = useState("");
  const [tipo, setTipo] = useState<"opcion_multiple" | "verdadero_falso" | "respuesta_abierta" | "">("");
  const [actividadId, setActividadId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarActividades = async () => {
      try {
        const datos = await fetchActividades(); // Supongamos que esta función existe en tu API
        setActividades(datos);
      } catch (err) {
        setError("No se pudieron cargar las actividades.");
      } finally {
        setLoading(false);
      }
    };

    cargarActividades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!tipo || !actividadId) {
      setError("Por favor selecciona un tipo y una actividad.");
      return;
    }

    try {
      await createPregunta({
        pregunta,
        tipo,
        actividad: actividadId,
      });
      setSuccess(true);
      setPregunta("");
      setTipo("");
      setActividadId(null);
    } catch (err) {
      setError("Error al registrar la pregunta. Intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Pregunta</h2>
        {loading ? (
          <p className="text-white text-center">Cargando actividades...</p>
        ) : error ? (
          <p className="text-red-300 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Pregunta */}
            <div>
              <label htmlFor="pregunta" className="block text-sm font-medium text-white">
                Pregunta
              </label>
              <input
                id="pregunta"
                type="text"
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-purple-300 focus:outline-none"
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
                placeholder="Introduce la pregunta"
                required
              />
            </div>

            {/* Campo de Tipo */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-white">
                Tipo
              </label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) =>
                  setTipo(e.target.value as "opcion_multiple" | "verdadero_falso" | "respuesta_abierta")
                }
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona un tipo
                </option>
                <option value="opcion_multiple">Opción Múltiple</option>
                <option value="verdadero_falso">Verdadero/Falso</option>
                <option value="respuesta_abierta">Respuesta Abierta</option>
              </select>
            </div>

            {/* Selección de Actividad */}
            <div>
              <label htmlFor="actividad" className="block text-sm font-medium text-white">
                Actividad
              </label>
              <select
                id="actividad"
                value={actividadId || ""}
                onChange={(e) => setActividadId(Number(e.target.value))}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona una actividad
                </option>
                {actividades.map((actividad) => (
                  <option key={actividad.id} value={actividad.id}>
                    {actividad.titulo}
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
                ¡Pregunta registrada con éxito!
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
                className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition duration-300 ease-in-out"
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

export default RegistrarPregunta;
