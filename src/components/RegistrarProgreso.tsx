import React, { useState, useEffect } from "react";
import { fetchUsuarios, fetchLecciones, createProgreso } from "../services/api";

interface Usuario {
  id: number;
  nombre: string;
}

interface Leccion {
  id: number;
  titulo: string;
}

const RegistrarProgreso: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [lecciones, setLecciones] = useState<Leccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [completado, setCompletado] = useState<boolean>(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [leccionId, setLeccionId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuariosData = await fetchUsuarios();
        const leccionesData = await fetchLecciones();
        setUsuarios(usuariosData);
        setLecciones(leccionesData);
      } catch (err) {
        setError("No se pudieron cargar los datos necesarios.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!usuarioId || !leccionId) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      await createProgreso({
        completado,
        usuario: usuarioId,
        leccion: leccionId,
      });
      setSuccess(true);
      setCompletado(false);
      setUsuarioId(null);
      setLeccionId(null);
    } catch (err) {
      setError("Error al registrar el progreso. Intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-teal-500 to-green-600 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Progreso</h2>
        {loading ? (
          <p className="text-white text-center">Cargando datos...</p>
        ) : error ? (
          <p className="text-red-300 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Completado */}
            <div>
              <label htmlFor="completado" className="block text-sm font-medium text-white">
                ¿Completado?
              </label>
              <select
                id="completado"
                value={completado ? "true" : "false"}
                onChange={(e) => setCompletado(e.target.value === "true")}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-teal-300 focus:outline-none"
                required
              >
                <option value="false">No</option>
                <option value="true">Sí</option>
              </select>
            </div>

            {/* Selección de Usuario */}
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-white">
                Usuario
              </label>
              <select
                id="usuario"
                value={usuarioId || ""}
                onChange={(e) => setUsuarioId(Number(e.target.value))}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-teal-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona un usuario
                </option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Selección de Lección */}
            <div>
              <label htmlFor="leccion" className="block text-sm font-medium text-white">
                Lección
              </label>
              <select
                id="leccion"
                value={leccionId || ""}
                onChange={(e) => setLeccionId(Number(e.target.value))}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-teal-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona una lección
                </option>
                {lecciones.map((leccion) => (
                  <option key={leccion.id} value={leccion.id}>
                    {leccion.titulo}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensajes de Éxito o Error */}
            {error && (
              <p className="text-red-300 text-sm font-medium text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-300 text-sm font-medium text-center">
                ¡Progreso registrado con éxito!
              </p>
            )}

            {/* Botones */}
            <div className="flex justify-between">
              <button
                type="button"
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300 ease-in-out"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrarProgreso;
