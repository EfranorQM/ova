export const API_URL = "https://ova-core-981714647360.us-central1.run.app/api"; // Actualiza a la URL de tu backend si cambia

// Función genérica para realizar peticiones a la API
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error("Error en la petición:", errorMessage);
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// Registrar un módulo
export async function createModulo(data: { titulo: string; descripcion: string; orden: number | null }) {
  try {
    // Realizamos la petición POST al endpoint correspondiente
    const response = await fetch(`${API_URL}/modulos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al registrar el módulo:", errorMessage);
      throw new Error(`Error al registrar el módulo: ${response.statusText}`);
    }

    const result = await response.json();

    // Si el backend devuelve una lista, filtramos el último módulo
    if (Array.isArray(result)) {
      console.warn("El backend devolvió una lista en lugar de un objeto único.");
      return result[result.length - 1]; // Devuelve el último elemento como módulo creado
    }

    return result; // Devuelve el módulo creado si la respuesta es un objeto
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
}

// Función para obtener todos los módulos
export async function fetchModulos() {
  return await apiRequest("modulos");
}

// Función para obtener todos los usuarios
export async function fetchUsuarios() {
  return await apiRequest("usuarios");
}

// Función para obtener todas las lecciones
export async function fetchLecciones() {
  return await apiRequest("lecciones");
}

// Obtener lecciones filtradas por módulo
export async function fetchLeccionesPorModulo(moduloId: number) {
  const endpoint = `lecciones/?modulo_id=${moduloId}`;
  return await apiRequest(endpoint);
}

// Función para crear una leccion
export async function createLeccion(data: {
  titulo: string;
  contenido: string;
  orden: number | null;
  modulo: number;
}): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/lecciones/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al crear la lección:", errorMessage);
      throw new Error(`Error al crear la lección: ${response.statusText}`);
    }

    return await response.json(); // Retorna la lección creada
  } catch (error) {
    console.error("Error en la solicitud de creación de lección:", error);
    throw error;
  }
}

// Función para registrar un usuario
export async function createUsuario(data: {
  nombre: string;
  email: string;
  contrasena: string;
  rol: number;
}) {
  try {
    const response = await fetch(`${API_URL}/usuarios/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al registrar el usuario:", errorMessage);
      throw new Error(`Error al registrar el usuario: ${response.statusText}`);
    }

    return await response.json(); // Devuelve el usuario registrado
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
}
