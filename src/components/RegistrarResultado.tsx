import React, { useState, useEffect } from "react";
import { fetchUsuarios, fetchActividades, createResultado } from "../services/api";

interface Usuario {
  id: number;
  nombre: string;
}

interface Actividad {
  id: number;
  titulo: string;
}

const RegistrarResultado: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [calificacion, setCalificacion] = useState<number | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [actividadId, setActividadId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuariosData = await fetchUsuarios();
        const actividadesData = await fetchActividades();
        setUsuarios(usuariosData);
        setActividades(actividadesData);
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

    if (calificacion === null || !usuarioId || !actividadId) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      await createResultado({
        calificacion,
        usuario: usuarioId,
        actividad: actividadId,
      });
      setSuccess(true);
      setCalificacion(null);
      setUsuarioId(null);
      setActividadId(null);
    } catch (err) {
      setError("Error al registrar el resultado. Intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Resultado</h2>
        {loading ? (
          <p className="text-white text-center">Cargando datos...</p>
        ) : error ? (
          <p className="text-red-300 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Calificación */}
            <div>
              <label htmlFor="calificacion" className="block text-sm font-medium text-white">
                Calificación
              </label>
              <input
                id="calificacion"
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-pink-300 focus:outline-none"
                value={calificacion || ""}
                onChange={(e) => setCalificacion(parseFloat(e.target.value))}
                placeholder="Introduce la calificación (0-5)"
                required
              />
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
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-pink-300 focus:outline-none"
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

            {/* Selección de Actividad */}
            <div>
              <label htmlFor="actividad" className="block text-sm font-medium text-white">
                Actividad
              </label>
              <select
                id="actividad"
                value={actividadId || ""}
                onChange={(e) => setActividadId(Number(e.target.value))}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-pink-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona una actividad
                </option>
                {actividades.map((actividad) => (
                  <option key={actividad.id} value={actividad.id}>
                    {actividad.titulo}
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
                ¡Resultado registrado con éxito!
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
                className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition duration-300 ease-in-out"
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

export default RegistrarResultado;
