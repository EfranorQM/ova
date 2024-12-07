import React, { useEffect, useState } from "react";
import { fetchResultadoPorUsuario } from "../services/api";
import { Chart } from "react-google-charts";
import { ArrowPathIcon, ExclamationCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";

interface Resultado {
  id: number;
  usuario_nombre: string;
  actividad_titulo: string;
  calificacion: string;
  fecha_completado: string;
  usuario: number;
  actividad: number;
}

interface EstadisticasEstudianteProps {
  estudiante: {
    id: number;
    nombre: string;
  };
}

const EstadisticasEstudiante: React.FC<EstadisticasEstudianteProps> = ({ estudiante }) => {
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarResultados = async () => {
      try {
        const datos = await fetchResultadoPorUsuario(estudiante.id);
        setResultados(datos);
      } catch (err) {
        setError("No se pudieron cargar los resultados. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarResultados();
  }, [estudiante.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-12">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500 mr-2" />
        <p className="text-gray-500 text-lg">Cargando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center mt-12">
        <ExclamationCircleIcon className="h-8 w-8 text-red-500 mr-2" />
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (resultados.length === 0) {
    return (
      <div className="flex items-center justify-center mt-12">
        <UserCircleIcon className="h-8 w-8 text-gray-500 mr-2" />
        <p className="text-gray-500 text-lg">No hay resultados disponibles para este estudiante.</p>
      </div>
    );
  }

  const data = [
    ["Actividad", "Calificación"],
    ...resultados.map((resultado) => [resultado.actividad_titulo, parseFloat(resultado.calificacion)]),
  ];

  const options = {
    title: `Resultados de ${estudiante.nombre}`,
    hAxis: { title: "Actividades", slantedText: true, slantedTextAngle: 45 },
    vAxis: { title: "Calificación", minValue: 0, maxValue: 5 },
    legend: "none",
    colors: ["#1E90FF"],
    titleTextStyle: {
      fontSize: 20,
      bold: true,
    },
    backgroundColor: "#F9FAFB",
    chartArea: { width: "80%", height: "70%" },
  };

  return (
    <div className="container mx-auto mt-12 px-6">
      <button
        onClick={() => window.location.reload()}
        className="mb-6 px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md flex items-center hover:bg-blue-600 transition duration-300"
      >
        <ArrowPathIcon className="h-5 w-5 mr-2" />
        Regresar a la Lista de Estudiantes
      </button>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Chart chartType="ColumnChart" width="100%" height="400px" data={data} options={options} />
      </div>
    </div>
  );
};

export default EstadisticasEstudiante;
