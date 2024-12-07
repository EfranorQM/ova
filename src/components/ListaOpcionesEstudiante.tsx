import React, { useEffect, useState } from "react";
import { fetchOpcionesPorPregunta } from "../services/api";

interface Opcion {
  id: number;
  texto: string;
  es_correcta: boolean;
  pregunta: number;
}

interface ListaOpcionesEstudianteProps {
  preguntaId: number;
  onSeleccion: (opcionId: number) => void;
}

const ListaOpcionesEstudiante: React.FC<ListaOpcionesEstudianteProps> = ({ preguntaId, onSeleccion }) => {
  const [opciones, setOpciones] = useState<Opcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const datos = await fetchOpcionesPorPregunta(preguntaId);
        setOpciones(datos);
      } catch (err) {
        setError("No se pudieron cargar las opciones. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarOpciones();
  }, [preguntaId]);

  const handleSeleccion = (opcionId: number) => {
    setRespuestaSeleccionada(opcionId);
    onSeleccion(opcionId); // Comunica la opción seleccionada al componente padre
  };

  if (loading) {
    return <p className="text-gray-500 text-sm">Cargando opciones...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (opciones.length === 0) {
    return <p className="text-gray-500 text-sm">No hay opciones disponibles para esta pregunta.</p>;
  }

  return (
    <ul className="mt-2 space-y-2">
      {opciones.map((opcion) => (
        <li key={opcion.id} className="p-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name={`pregunta-${preguntaId}`}
              value={opcion.id}
              checked={respuestaSeleccionada === opcion.id}
              onChange={() => handleSeleccion(opcion.id)}
              className="h-4 w-4 text-blue-500"
            />
            <span className="text-gray-700">{opcion.texto}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ListaOpcionesEstudiante;
