import React, { useEffect, useState } from "react";
import { fetchOpciones } from "../services/api";

interface Opcion {
  id: number;
  pregunta_texto: string;
  texto: string;
  es_correcta: boolean;
  pregunta: number;
}

const ListaOpciones: React.FC = () => {
  const [opciones, setOpciones] = useState<Opcion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const datos = await fetchOpciones();
        setOpciones(datos);
      } catch (err) {
        setError("No se pudieron cargar las opciones. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarOpciones();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-sm">Cargando opciones...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (opciones.length === 0) {
    return <p className="text-gray-500 text-sm">No hay opciones disponibles.</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ✅ Lista de Opciones
      </h2>
      <ul className="space-y-4">
        {opciones.map((opcion) => (
          <li
            key={opcion.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">{opcion.pregunta_texto}</h3>
            <p className="text-gray-700">
              <strong>Opción:</strong> {opcion.texto}
            </p>
            <p className={`font-semibold ${opcion.es_correcta ? "text-green-500" : "text-red-500"}`}>
              {opcion.es_correcta ? "Respuesta Correcta" : "Respuesta Incorrecta"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaOpciones;
