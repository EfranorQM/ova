import React, { useEffect, useState } from "react";
import { fetchPreguntasPorActividad, fetchOpcionesPorPregunta, fetchResultadoPorUsuarioYActividad, createResultado } from "../services/api";
import ListaOpcionesEstudiante from "./ListaOpcionesEstudiante";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface Pregunta {
  id: number;
  pregunta: string;
  tipo: "opcion_multiple" | "verdadero_falso" | "respuesta_abierta";
}

interface ListaPreguntasEstudianteProps {
  actividadId: number;
}

const ListaPreguntasEstudiante: React.FC<ListaPreguntasEstudianteProps> = ({ actividadId }) => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<{ [key: number]: number[] }>({});
  const [resultados, setResultados] = useState<{ [key: number]: boolean }>({});
  const [enviado, setEnviado] = useState(false);
  const [calificacion, setCalificacion] = useState<number | null>(null);
  const [resultadoPrevio, setResultadoPrevio] = useState<boolean>(false);

  // Obtener información del usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const usuarioId = usuario.id;

  useEffect(() => {
    const cargarPreguntasYResultado = async () => {
      try {
        // Verificar si ya existe un resultado previo
        const resultado = await fetchResultadoPorUsuarioYActividad(usuarioId, actividadId);
        if (resultado.length > 0) {
          setCalificacion(resultado[0].calificacion);
          setResultadoPrevio(true);
        } else {
          // Cargar preguntas solo si no hay resultado previo
          const datos = await fetchPreguntasPorActividad(actividadId);
          setPreguntas(datos);
        }
      } catch (err) {
        setError("No se pudieron cargar las preguntas o el resultado. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarPreguntasYResultado();
  }, [actividadId, usuarioId]);

  const handleSeleccionRespuesta = (preguntaId: number, opcionId: number) => {
    setRespuestas((prev) => {
      const opcionesSeleccionadas = prev[preguntaId] || [];
      if (opcionesSeleccionadas.includes(opcionId)) {
        return { ...prev, [preguntaId]: opcionesSeleccionadas.filter((id) => id !== opcionId) };
      } else {
        return { ...prev, [preguntaId]: [...opcionesSeleccionadas, opcionId] };
      }
    });
  };

  const handleEnviarRespuestas = async () => {
    const nuevosResultados: { [key: number]: boolean } = {};
    let respuestasCorrectas = 0;

    for (const pregunta of preguntas) {
      try {
        const opciones = await fetchOpcionesPorPregunta(pregunta.id);
        const opcionesCorrectas = opciones.filter((opcion: any) => opcion.es_correcta).map((opcion: any) => opcion.id);
        const respuestasSeleccionadas = respuestas[pregunta.id] || [];

        // Verifica si todas las opciones seleccionadas son correctas y si no falta ninguna opción correcta
        const esCorrecta =
          respuestasSeleccionadas.length === opcionesCorrectas.length &&
          respuestasSeleccionadas.every((opcionId) => opcionesCorrectas.includes(opcionId));

        nuevosResultados[pregunta.id] = esCorrecta;
        if (esCorrecta) {
          respuestasCorrectas++;
        }
      } catch (err) {
        console.error(`Error al validar respuestas para la pregunta ${pregunta.id}:`, err);
        nuevosResultados[pregunta.id] = false;
      }
    }

    setResultados(nuevosResultados);
    setEnviado(true);

    // Calcular calificación
    const totalPreguntas = preguntas.length;
    const nuevaCalificacion = (respuestasCorrectas / totalPreguntas) * 5;
    setCalificacion(parseFloat(nuevaCalificacion.toFixed(2)));

    // Guardar el resultado en el backend
    try {
      await createResultado({
        calificacion: parseFloat(nuevaCalificacion.toFixed(2)),
        usuario: usuarioId,
        actividad: actividadId,
      });
    } catch (err) {
      console.error("Error al registrar la calificación:", err);
    }
  };

  if (loading) {
    return <p className="text-gray-500 text-sm">Cargando preguntas...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (resultadoPrevio) {
    return (
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-200 bg-opacity-50">
          <div className="p-3 bg-white bg-opacity-95 rounded-md shadow-md max-w-xs w-auto text-center -translate-y-4">
            <h3 className="text-sm font-semibold text-red-600 mb-1">¡Actividad Realizada!</h3>
            <p className="text-xs text-gray-700">
              Calificación: <span className="font-bold text-blue-600">{calificacion} / 5</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  

  return (
  <div className="mt-6">
    <ul className="space-y-6">
      {preguntas.map((pregunta) => (
        <li
          key={pregunta.id}
          className="p-5 bg-white border-l-4 border-blue-400 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <h5 className="text-lg font-semibold text-gray-800 mb-3">{pregunta.pregunta}</h5>
          <span className="text-sm text-blue-500 bg-blue-100 px-2 py-1 rounded-full capitalize mb-3 inline-block">
            {pregunta.tipo}
          </span>

          <ListaOpcionesEstudiante
            preguntaId={pregunta.id}
            onSeleccion={(opcionId) => handleSeleccionRespuesta(pregunta.id, opcionId)}
          />

          {enviado && (
            <div className={`mt-4 flex items-center font-semibold ${resultados[pregunta.id] ? "text-green-500" : "text-red-500"}`}>
              {resultados[pregunta.id] ? (
                <>
                  <CheckCircleIcon className="h-6 w-6 mr-2" />
                  ¡Respuesta Correcta!
                </>
              ) : (
                <>
                  <XCircleIcon className="h-6 w-6 mr-2" />
                  Respuesta Incorrecta
                </>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>

    {calificacion !== null && (
      <p className="mt-6 text-xl font-bold text-gray-800">
        Tu calificación es: <span className="text-blue-600">{calificacion} / 5</span>
      </p>
    )}

    <button
      onClick={handleEnviarRespuestas}
      disabled={enviado}
      className={`mt-8 px-5 py-3 rounded-lg font-semibold text-white shadow-md transition-transform duration-300 ${
        enviado ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 hover:scale-105"
      }`}
    >
      Enviar Respuestas
    </button>
  </div>
);
};

export default ListaPreguntasEstudiante;
