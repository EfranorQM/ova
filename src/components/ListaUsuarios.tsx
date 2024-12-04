import React, { useEffect, useState } from "react";
import { fetchUsuarios } from "../services/api";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: number;
}

const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para mapear roles
  const obtenerRol = (rol: number): string => {
    switch (rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Docente";
      case 3:
        return "Estudiante";
      default:
        return "Desconocido";
    }
  };

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const datos = await fetchUsuarios();
        setUsuarios(datos);
      } catch (err) {
        setError("No se pudieron cargar los usuarios. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Cargando usuarios...</p>
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
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Lista de Usuarios
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="relative bg-gradient-to-br from-red-400 to-red-600 text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            <div className="absolute top-2 right-2 bg-white text-red-600 rounded-full px-3 py-1 text-xs font-semibold shadow-md">
              ID: {usuario.id}
            </div>
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white text-red-600 rounded-full shadow-lg">
                <span className="text-xl font-bold">
                  {usuario.nombre[0].toUpperCase()}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold">{usuario.nombre}</h2>
                <p className="text-sm text-red-200">{usuario.email}</p>
              </div>
            </div>
            <p className="text-white text-sm">
              <strong>Rol:</strong> {obtenerRol(usuario.rol)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaUsuarios;
