import React, { useEffect, useState } from "react";
import { fetchRecursosMultimedia } from "../services/api";

interface Recurso {
  id: number;
  tipo: string;
  url: string;
  descripcion: string;
  leccion: number;
}

const ListarRecursos: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarRecursos = async () => {
      try {
        const datos = await fetchRecursosMultimedia();
        setRecursos(datos);
      } catch (err) {
        setError("No se pudieron cargar los recursos multimedia. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarRecursos();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-sm text-center mt-6">Cargando recursos multimedia...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm text-center mt-6">{error}</p>;
  }

  if (recursos.length === 0) {
    return <p className="text-gray-500 text-sm text-center mt-6">No hay recursos multimedia disponibles.</p>;
  }

  return (
    <div className="container mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📁 Recursos Multimedia</h2>
      <ul className="space-y-6">
        {recursos.map((recurso) => (
          <li key={recurso.id} className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{recurso.descripcion}</h3>
            <div className="border-t pt-4">
              {recurso.tipo === "video" ? (
                <div className="relative h-64">
                  <iframe
                    src={recurso.url.replace("watch?v=", "embed/")}
                    title={recurso.descripcion}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : recurso.tipo === "grafico" ? (
                <div className="relative h-64">
                  <iframe
                    src={recurso.url}
                    title={recurso.descripcion}
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              ) : (
                <p className="text-gray-700">Tipo de recurso no soportado: {recurso.tipo}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarRecursos;
