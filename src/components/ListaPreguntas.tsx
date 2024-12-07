import React, { useEffect, useState } from "react";
import { fetchPreguntas } from "../services/api";

interface Pregunta {
  id: number;
  actividad_titulo: string;
  pregunta: string;
  tipo: string;
  actividad: number;
}

const ListaPreguntas: React.FC = () => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const datos = await fetchPreguntas();
        setPreguntas(datos);
      } catch (err) {
        setError("No se pudieron cargar las preguntas. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarPreguntas();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-sm">Cargando preguntas...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (preguntas.length === 0) {
    return <p className="text-gray-500 text-sm">No hay preguntas disponibles.</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📋 Lista de Preguntas
      </h2>
      <ul className="space-y-4">
        {preguntas.map((pregunta) => (
          <li
            key={pregunta.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{pregunta.pregunta}</h3>
            <p className="text-gray-600 mb-2">
              <strong>Actividad:</strong> {pregunta.actividad_titulo}
            </p>
            <p className="text-gray-600">
              <strong>Tipo de Pregunta:</strong> {pregunta.tipo.replace("_", " ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPreguntas;
