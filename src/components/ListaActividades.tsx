import React, { useEffect, useState } from "react";
import { fetchActividades } from "../services/api";

interface Actividad {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  leccion: number;
}

const ListaActividades: React.FC = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarActividades = async () => {
      try {
        const datos = await fetchActividades();
        setActividades(datos);
      } catch (err) {
        setError("No se pudieron cargar las actividades. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarActividades();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-center">Cargando actividades...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (actividades.length === 0) {
    return <p className="text-gray-500 text-center">No hay actividades disponibles.</p>;
  }

  return (
    <div className="container mx-auto mt-10 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Lista de Actividades</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actividades.map((actividad) => (
          <div
            key={actividad.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold mb-2">{actividad.titulo}</h2>
            <p className="text-gray-700 mb-4">{actividad.descripcion}</p>
            <span className="inline-block bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              Tipo: {actividad.tipo}
            </span>
            <p className="text-gray-500 mt-2 text-sm">Lección ID: {actividad.leccion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaActividades;
