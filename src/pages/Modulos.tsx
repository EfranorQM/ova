import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchModuloPorId, fetchLeccionesPorModulo } from "../services/api";
import Header from "../components/Header";
import ListaLeccionesEstudiante from "../components/ListaLeccionesEstudiante";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface Leccion {
  id: number;
  titulo: string;
  contenido: string;
}
const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

interface Modulo {
  id: number;
  titulo: string;
  descripcion: string;
}

const Modulos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [modulo, setModulo] = useState<Modulo | null>(null);
  const [lecciones, setLecciones] = useState<Leccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const moduloDatos = await fetchModuloPorId(Number(id));
        setModulo(moduloDatos);

        const leccionesDatos = await fetchLeccionesPorModulo(Number(id));
        setLecciones(leccionesDatos);
      } catch (err) {
        setError("No se pudo cargar la información. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-gray-500 text-lg">Cargando módulo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <svg
            className="h-12 w-12 text-red-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v20m10-10H2"
            ></path>
          </svg>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!modulo) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <svg
            className="h-12 w-12 text-red-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v20m10-10H2"
            ></path>
          </svg>
          <p className="text-red-500 text-lg">No se encontró el módulo.</p>
        </div>
      </div>
    );
  }

  return (
    
    <div className="bg-gray-100 min-h-screen">
       <Header userName={usuario.nombre || "Invitado"} userRole={usuario.rol || 0} />
      <div className="container mx-auto mt-10 px-6">
        {/* Botón de Volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" />
          Volver
        </button>

        <h1 className="text-5xl font-bold text-blue-700 mb-6">{modulo.titulo}</h1>
        <p className="text-gray-700 text-lg mb-8">{modulo.descripcion}</p>
        <ListaLeccionesEstudiante lecciones={lecciones} />
      </div>
    </div>
  );
};

export default Modulos;
