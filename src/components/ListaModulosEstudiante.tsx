import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { fetchModulos } from "../services/api";

interface Modulo {
  id: number;
  titulo: string;
  descripcion: string;
  orden: number;
  fecha_creacion: string;
}

const ListaModulosEstudiante: React.FC = () => {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  useEffect(() => {
    const cargarModulos = async () => {
      try {
        const datos = await fetchModulos();
        setModulos(datos);
      } catch (err) {
        setError("No se pudieron cargar los módulos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarModulos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Cargando módulos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 px-6">
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-10">
        📚 Módulos Disponibles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {modulos.map((modulo) => (
          <div
            key={modulo.id}
            className="relative bg-white text-gray-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold shadow">
              Orden: {modulo.orden}
            </div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">{modulo.titulo}</h2>
            <p className="text-sm text-gray-600 mb-4">{modulo.descripcion}</p>
            <button
              className="w-full px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
              onClick={() => navigate(`/estudiante/modulos/${modulo.id}`)}
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default ListaModulosEstudiante;
