import React, { useEffect, useState } from "react";
import { fetchModulos } from "../services/api";

interface Modulo {
  id: number;
  titulo: string;
  descripcion: string;
  orden: number;
  fecha_creacion: string;
}

interface ListaModulosProps {
  onSelectModulo: (moduloId: number) => void; // Función para manejar el cambio de vista
}

const ListaModulos: React.FC<ListaModulosProps> = ({ onSelectModulo }) => {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="container mx-auto mt-10 px-6">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        Lista de Módulos
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {modulos.map((modulo, index) => (
          <div
            key={modulo.id}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onSelectModulo(modulo.id)} // Llama al manejador de selección
            className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full w-48 h-48 flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-500 animate-float"
          >
            <div className="text-center">
              <h2 className="text-lg font-bold">{modulo.titulo}</h2>
              <p className="text-sm mt-2 line-clamp-2">{modulo.descripcion}</p>
            </div>
            <span className="absolute bottom-2 right-2 text-xs bg-white text-purple-600 px-3 py-1 rounded-full shadow-md">
              #{modulo.orden || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaModulos;
