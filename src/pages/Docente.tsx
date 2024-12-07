import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchUsuarios } from "../services/api";
import EstadisticasEstudiante from "../components/EstadisticasEstudiante";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: number;
}

const Docente: React.FC = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [estudiantes, setEstudiantes] = useState<Usuario[]>([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarEstudiantes = async () => {
      try {
        const usuarios = await fetchUsuarios();
        const estudiantesFiltrados = usuarios.filter((u: Usuario) => u.rol === 3); // Filtrar estudiantes
        setEstudiantes(estudiantesFiltrados);
      } catch (err) {
        setError("No se pudieron cargar los estudiantes. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarEstudiantes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Cargando estudiantes...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header userName={usuario.nombre || "Invitado"} userRole={usuario.rol || 0} />
  
      <main className="container mx-auto mt-12 px-6">
        {selectedEstudiante ? (
          <EstadisticasEstudiante estudiante={selectedEstudiante} />
        ) : (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-10 shadow-xl">
              <h1 className="text-5xl font-extrabold text-center">
                ¡Bienvenido, <span className="capitalize">{usuario.nombre || "Invitado"}</span>!
              </h1>
              <p className="text-center mt-4 text-xl">
                Selecciona un estudiante para ver sus resultados.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
  {estudiantes.map((estudiante) => (
    <div
      key={estudiante.id}
      className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex items-center space-x-4"
      onClick={() => setSelectedEstudiante(estudiante)}
    >
      <div className="flex-shrink-0">
        <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold">
            {estudiante.nombre.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">{estudiante.nombre}</h2>
        <p className="text-gray-600">{estudiante.email}</p>
      </div>
    </div>
  ))}
</div>

          </>
        )}
      </main>
    </div>
  );  
};

export default Docente;
