import React, { useState, useEffect } from "react";
import { createUsuario, apiRequest } from "../services/api";

interface Rol {
  id: number;
  nombre: string; // Nombre del rol
}

interface RegistrarUsuarioProps {
  onClose: () => void; // Función para cerrar el modal
}

const RegistrarUsuario: React.FC<RegistrarUsuarioProps> = ({ onClose }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rolId, setRolId] = useState<number | null>(null);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await apiRequest("roles"); // Supongamos que el endpoint de roles es "roles"
        setRoles(data);
      } catch (err) {
        setError("No se pudieron cargar los roles. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rolId) {
      setError("Por favor, selecciona un rol.");
      return;
    }

    try {
      await createUsuario({ nombre, email, contrasena, rol: rolId });
      setSuccess(true);
      setNombre("");
      setEmail("");
      setContrasena("");
      setRolId(null);
      setError(null);
    } catch (err) {
      setError("Hubo un error al registrar el usuario. Intenta nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-lg shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Registrar Usuario</h2>
        {loading ? (
          <p className="text-gray-200 text-center">Cargando roles...</p>
        ) : error ? (
          <p className="text-red-200 text-center">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-white"
              >
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-red-300 focus:outline-none"
                placeholder="Introduce el nombre del usuario"
                required
              />
            </div>

            {/* Campo de Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-red-300 focus:outline-none"
                placeholder="Introduce el email del usuario"
                required
              />
            </div>

            {/* Campo de Contraseña */}
            <div>
              <label
                htmlFor="contrasena"
                className="block text-sm font-medium text-white"
              >
                Contraseña
              </label>
              <input
                id="contrasena"
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-red-300 focus:outline-none"
                placeholder="Introduce la contraseña"
                required
              />
            </div>

            {/* Campo de Selección de Rol */}
            <div>
              <label htmlFor="rol" className="block text-sm font-medium text-white">
                Rol
              </label>
              <select
                id="rol"
                value={rolId || ""}
                onChange={(e) => setRolId(Number(e.target.value))}
                className="mt-2 block w-full px-4 py-3 bg-white text-gray-800 border-none rounded-lg shadow focus:ring-2 focus:ring-red-300 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Selecciona un rol
                </option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensajes de Éxito o Error */}
            {error && (
              <p className="text-red-300 text-sm font-medium text-center">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-300 text-sm font-medium text-center">
                ¡Usuario registrado con éxito!
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
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
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

export default RegistrarUsuario;
