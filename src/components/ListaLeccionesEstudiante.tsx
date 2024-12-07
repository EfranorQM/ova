import React, { useState, useEffect } from "react";
import ListaActividadesEstudiante from "./ListaActividadesEstudiante";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { createProgreso, fetchRecursosPorLeccion } from "../services/api";

interface Leccion {
  id: number;
  titulo: string;
  contenido: string;
}

interface Recurso {
  id: number;
  tipo: string;
  url: string;
  descripcion: string;
  leccion: number;
}

interface ListaLeccionesEstudianteProps {
  lecciones: Leccion[];
}

const ListaLeccionesEstudiante: React.FC<ListaLeccionesEstudianteProps> = ({ lecciones }) => {
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [progresoEnviado, setProgresoEnviado] = useState<{ [key: number]: boolean }>({});
  const [recursos, setRecursos] = useState<{ [key: number]: Recurso[] }>({});
  const [loadingRecursos, setLoadingRecursos] = useState<{ [key: number]: boolean }>({});

  // Obtener información del usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const usuarioId = usuario.id;

  // Función para cargar recursos por lección
  const cargarRecursos = async (leccionId: number) => {
    setLoadingRecursos((prev) => ({ ...prev, [leccionId]: true }));
    try {
      const datos = await fetchRecursosPorLeccion(leccionId);
      setRecursos((prev) => ({ ...prev, [leccionId]: datos }));
    } catch (error) {
      console.error(`Error al cargar recursos para la lección ${leccionId}:`, error);
    } finally {
      setLoadingRecursos((prev) => ({ ...prev, [leccionId]: false }));
    }
  };

  // Cargar recursos cuando se monta el componente
  useEffect(() => {
    lecciones.forEach((leccion) => cargarRecursos(leccion.id));
  }, [lecciones]);

  // Función para convertir URLs de YouTube a formato embed
  const convertirURLYouTube = (url: string) => {
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleEnviarProgreso = async (leccionId: number) => {
    try {
      await createProgreso({
        completado: true,
        usuario: usuarioId,
        leccion: leccionId,
      });
      setProgresoEnviado((prev) => ({ ...prev, [leccionId]: true }));
      setMensaje(`¡Progreso de la lección "${lecciones.find((l) => l.id === leccionId)?.titulo}" enviado con éxito!`);
    } catch (error) {
      console.error("Error al enviar el progreso:", error);
      setMensaje("Hubo un error al enviar el progreso. Intenta nuevamente.");
    }
  };

  return (
    <div className="mt-8 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📚 Lecciones del Módulo</h2>
      {mensaje && (
        <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
          {mensaje}
        </div>
      )}
      {lecciones.length > 0 ? (
        <ul className="space-y-6">
          {lecciones.map((leccion) => (
            <li
              key={leccion.id}
              className="flex flex-col p-6 bg-white shadow-lg rounded-lg border-l-8 border-blue-500 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <BookOpenIcon className="h-12 w-12 text-blue-500 mr-4" />
                <h3 className="text-2xl font-semibold text-gray-800">{leccion.titulo}</h3>
              </div>
              <p className="text-gray-600 mb-4">{leccion.contenido}</p>

              {/* Mostrar recursos multimedia directamente */}
              {loadingRecursos[leccion.id] ? (
                <p className="text-gray-500 mb-4">Cargando contenido...</p>
              ) : recursos[leccion.id]?.length > 0 ? (
                recursos[leccion.id].map((recurso) => (
                  <div key={recurso.id} className="mb-4">
                    <p className="text-gray-700 font-semibold mb-2">{recurso.descripcion}</p>
                    {recurso.tipo === "video" && (
                      <div className="aspect-w-16 aspect-h-9 mb-4">
                        <iframe
                          src={convertirURLYouTube(recurso.url)}
                          title={recurso.descripcion}
                          allowFullScreen
                          className="w-full h-64 rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    {recurso.tipo === "imagen" && (
                      <img src={recurso.url} alt={recurso.descripcion} className="w-full h-auto rounded-lg shadow-md mb-4" />
                    )}
                    {recurso.tipo === "grafico" && (
                      <iframe
                        src={recurso.url}
                        title={recurso.descripcion}
                        className="w-full h-96 rounded-lg shadow-md mb-4"
                      />
                    )}
                    {recurso.tipo === "documento" && (
                      <iframe
                        src={recurso.url}
                        title={recurso.descripcion}
                        className="w-full h-96 rounded-lg shadow-md mb-4"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mb-4">No hay contenido disponible para esta lección.</p>
              )}

              {/* Incorporar el componente de actividades */}
              <ListaActividadesEstudiante leccionId={leccion.id} />

              {/* Botón para enviar el progreso */}
              <button
                onClick={() => handleEnviarProgreso(leccion.id)}
                disabled={progresoEnviado[leccion.id]}
                className={`mt-6 px-4 py-2 rounded-lg shadow-md transition duration-300 ${
                  progresoEnviado[leccion.id]
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {progresoEnviado[leccion.id] ? "Progreso Enviado" : "Enviar Progreso"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center text-lg">No hay lecciones disponibles.</p>
      )}
    </div>
  );
};

export default ListaLeccionesEstudiante;
