import React, { useState, useEffect } from "react";
import { fetchPreguntas, createOpcion } from "../services/api";

interface Pregunta {
  id: number;
  pregunta: string;
}

const RegistrarOpcion: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [texto, setTexto] = useState("");
  const [esCorrecta, setEsCorrecta] = useState(false);
  const [preguntaId, setPreguntaId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const datos = await fetchPreguntas();
        setPreguntas(datos);
      } catch (err) {
        setError("No se pudieron cargar las preguntas.");
      } finally {
        setLoading(false);
      }
    };

    cargarPreguntas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!preguntaId) {
      setError("Por favor selecciona una pregunta.");
      return;
    }

    try {
      await createOpcion({
        texto,
        es_correcta: esCorrecta,
        pregunta: preguntaId,
      });
      setSuccess(true);
      setTexto("");
      setEsCorrecta(false);
      setPreguntaId(null);
    } catch (err) {
      setError("Error al registrar la opción. Intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Opción</h2>
        {loading ? (
          <p className="text-white text-center">Cargando preguntas...</p>
        ) : error ? (
          <p className="text-red-300 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Texto de la Opción */}
            <div>
              <label htmlFor="texto" className="block text-sm font-medium text-white">
                Texto de la Opción
              </label>
              <input
                id="texto"
                type="text"
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-teal-300 focus:outline-none"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Introduce el texto de la opción"
                required
              />
            </div>

            {/* Casilla de Verificación para esCorrecta */}
            <div className="flex items-center">
              <input
                id="esCorrecta"
                type="checkbox"
                className="h-5 w-5 text-teal-500"
                checked={esCorrecta}
                onChange={(e) => setEsCorrecta(e.target.checked)}
              />
              <label htmlFor="esCorrecta" className="ml-2 text-sm font-medium text-white">
                ¿Es correcta esta opción?
              </label>
            </div>

            {/* Selección de Pregunta */}
            <div>
              <label htmlFor="pregunta" className="block text-sm font-medium text-white">
                Pregunta
              </label>
              <select
                id="pregunta"
                value={preguntaId || ""}
                onChange={(e) => setPreguntaId(Number(e.target.value))}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-teal-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona una pregunta
                </option>
                {preguntas.map((pregunta) => (
                  <option key={pregunta.id} value={pregunta.id}>
                    {pregunta.pregunta}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensajes de Éxito o Error */}
            {error && <p className="text-red-300 text-sm font-medium text-center">{error}</p>}
            {success && <p className="text-green-300 text-sm font-medium text-center">¡Opción registrada con éxito!</p>}

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
                className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300 ease-in-out"
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

export default RegistrarOpcion;
