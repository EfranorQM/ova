import React, { useEffect, useState } from "react";
import { fetchActividadesPorLeccion } from "../services/api";
import ListaPreguntasEstudiante from "./ListaPreguntasEstudiante"; // Importar el componente
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';

interface Actividad {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: "interactiva" | "evaluacion";
}

interface ListaActividadesEstudianteProps {
  leccionId: number;
}

const ListaActividadesEstudiante: React.FC<ListaActividadesEstudianteProps> = ({ leccionId }) => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarActividades = async () => {
      try {
        const datos = await fetchActividadesPorLeccion(leccionId);
        setActividades(datos);
      } catch (err) {
        setError("No se pudieron cargar las actividades. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarActividades();
  }, [leccionId]);

  if (loading) {
    return <p className="text-gray-500 text-sm">Cargando actividades...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (actividades.length === 0) {
    return <p className="text-gray-500 text-sm">No hay actividades disponibles para esta lección.</p>;
  }

  return (
    <div className="mt-6">
      <h4 className="text-2xl font-bold text-gray-700 mb-4">Actividades</h4>
      <ul className="space-y-4">
        {actividades.map((actividad) => (
          <li
            key={actividad.id}
            className="p-5 bg-white border-l-4 border-blue-400 shadow-md rounded-lg hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
          >
            <h5 className="text-xl font-semibold text-gray-800">{actividad.titulo}</h5>
            <p className="text-gray-600 mt-2">{actividad.descripcion}</p>
            <span className="mt-3 inline-block text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full capitalize">
              {actividad.tipo}
            </span>
            <div className="mt-4">
              {/* Agregar preguntas debajo de cada actividad */}
              <ListaPreguntasEstudiante actividadId={actividad.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default ListaActividadesEstudiante;
