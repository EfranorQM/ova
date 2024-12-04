import React, { useEffect, useState } from "react";
import { fetchLecciones, fetchLeccionesPorModulo } from "../services/api";

interface Leccion {
  id: number;
  titulo: string;
  contenido: string;
  orden: number;
  modulo: number;
}

interface ListaLeccionesProps {
  moduloId?: number; // Prop opcional para filtrar por módulo
}

const ListaLecciones: React.FC<ListaLeccionesProps> = ({ moduloId }) => {
  const [lecciones, setLecciones] = useState<Leccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exploded, setExploded] = useState<number | null>(null); // Controla qué burbuja explotó

  useEffect(() => {
    const cargarLecciones = async () => {
      try {
        let datos;
        if (moduloId) {
          datos = await fetchLeccionesPorModulo(moduloId); // Cargar lecciones filtradas por módulo
        } else {
          datos = await fetchLecciones(); // Cargar todas las lecciones
        }
        setLecciones(datos);
      } catch (err) {
        setError("No se pudieron cargar las lecciones. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarLecciones();
  }, [moduloId]); // Se ejecuta cuando cambia el módulo

  const handleExplode = (id: number) => {
    setExploded(id); // Marca la burbuja como explotada
    setTimeout(() => setExploded(null), 500); // Restaura el estado tras la animación
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Cargando lecciones...</p>
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
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
        {moduloId ? `Lecciones del Módulo ${moduloId}` : "Lista de Lecciones"}
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {lecciones.map((leccion, index) => (
          <div
            key={leccion.id}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleExplode(leccion.id)} // Maneja la explosión
            className={`relative bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full w-48 h-48 flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-500 ${
              exploded === leccion.id ? "animate-pop" : "animate-float"
            }`}
          >
            {exploded !== leccion.id && (
              <div className="text-center">
                <h2 className="text-lg font-bold">{leccion.titulo}</h2>
                <p className="text-sm mt-2">Orden: {leccion.orden}</p>
                <p className="text-sm mt-2">Módulo: {leccion.modulo}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaLecciones;
