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
// Función para obtener todas las opciones
export async function fetchOpciones() {
  return await apiRequest("opciones");
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

// Función para obtener todas las lecciones
export async function fetchRecursosMultimedia() {
  return await apiRequest("recursos-multimedia");
}
// Obtener recursos multimedia por leccion
export async function fetchRecursosPorLeccion(leccionId: number) {
  try {
    const endpoint = `recursos-multimedia/?leccion_id=${leccionId}`; // Usar leccion_id como parámetro
    const response = await apiRequest(endpoint);
    return response; // Devuelve actividades filtradas
  } catch (error) {
    console.error("Error al obtener las actividades por lección:", error);
    throw error;
  }
}
// Función para obtener todas las actividades
export async function fetchActividades() {
  return await apiRequest("actividades");
}
// Función para obtener todas las preguntas
export async function fetchPreguntas() {
  return await apiRequest("preguntas");
}
// Obtener actividades filtradas por lección
export async function fetchActividadesPorLeccion(leccionId: number) {
  try {
    const endpoint = `actividades/?leccion_id=${leccionId}`; // Usar leccion_id como parámetro
    const response = await apiRequest(endpoint);
    return response; // Devuelve actividades filtradas
  } catch (error) {
    console.error("Error al obtener las actividades por lección:", error);
    throw error;
  }
}


// Función para registrar un recurso multimedia
export async function createRecursoMultimedia(data: {
  tipo: "imagen" | "video" | "documento" | "grafico";
  url: string;
  descripcion: string;
  leccion: number | null;
}): Promise<any> {
  try {
    // Validar los datos antes de realizar la solicitud
    if (!["imagen", "video", "documento", "grafico"].includes(data.tipo)) {
      throw new Error(
        "El tipo debe ser uno de los siguientes: imagen, video, documento, grafico."
      );
    }

    if (!data.url || !data.descripcion || data.leccion === null) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST al endpoint correspondiente
    const response = await fetch(`${API_URL}/recursos-multimedia/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al registrar el recurso multimedia:", errorMessage);
      throw new Error(
        `Error al registrar el recurso multimedia: ${response.statusText}`
      );
    }

    return await response.json(); // Retorna el recurso creado
  } catch (error) {
    console.error("Error en la solicitud de creación de recurso multimedia:", error);
    throw error;
  }
}

export async function createActividad(data: {
  titulo: string;
  descripcion: string;
  tipo: "interactiva" | "evaluacion";
  leccion: number | null;
}): Promise<any> {
  try {
    // Validar los datos antes de realizar la solicitud
    if (!["interactiva", "evaluacion"].includes(data.tipo)) {
      throw new Error(
        "El tipo debe ser uno de los siguientes: interactiva, evaluacion."
      );
    }

    if (!data.titulo || !data.descripcion || data.leccion === null) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST al endpoint correspondiente
    const response = await fetch(`${API_URL}/actividades/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al registrar la actividad:", errorMessage);
      throw new Error(
        `Error al registrar la actividad: ${response.statusText}`
      );
    }

    return await response.json(); // Retorna la actividad creada
  } catch (error) {
    console.error("Error en la solicitud de creación de actividad:", error);
    throw error;
  }
}

export async function createPregunta(data: {
  pregunta: string;
  tipo: "opcion_multiple" | "verdadero_falso" | "respuesta_abierta";
  actividad: number | null;
}): Promise<any> {
  try {
    // Validar los datos antes de realizar la solicitud
    if (!["opcion_multiple", "verdadero_falso", "respuesta_abierta"].includes(data.tipo)) {
      throw new Error(
        "El tipo debe ser uno de los siguientes: opcion_multiple, verdadero_falso, respuesta_abierta."
      );
    }

    if (!data.pregunta || data.actividad === null) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST al endpoint correspondiente
    const response = await fetch(`${API_URL}/preguntas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al registrar la pregunta:", errorMessage);
      throw new Error(`Error al registrar la pregunta: ${response.statusText}`);
    }

    return await response.json(); // Retorna la pregunta creada
  } catch (error) {
    console.error("Error en la solicitud de creación de pregunta:", error);
    throw error;
  }
}

// Obtener preguntas filtradas por actividad
export async function fetchPreguntasPorActividad(actividadId: number) {
  try {
    const endpoint = `preguntas/?actividad_id=${actividadId}`; // Usar actividad_id como parámetro
    const response = await apiRequest(endpoint);
    return response; // Devuelve las preguntas filtradas
  } catch (error) {
    console.error("Error al obtener las preguntas por actividad:", error);
    throw error;
  }
}
export async function fetchOpcionesPorPregunta(preguntaId: number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/opciones/?pregunta_id=${preguntaId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al obtener las opciones de respuesta:", errorMessage);
      throw new Error(`Error al obtener las opciones: ${response.statusText}`);
    }

    return await response.json(); // Retorna la lista de opciones
  } catch (error) {
    console.error("Error en la solicitud de opciones por pregunta:", error);
    throw error;
  }
}

export async function createResultado(data: {
  calificacion: number;
  usuario: number;
  actividad: number;
}): Promise<any> {
  try {
    // Validar los datos antes de realizar la solicitud
    if (data.calificacion < 0 || data.calificacion > 5) {
      throw new Error("La calificación debe estar entre 0 y 5.");
    }

    if (!data.usuario || !data.actividad) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST al endpoint correspondiente
    const response = await fetch(`${API_URL}/resultados/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al registrar el resultado:", errorMessage);
      throw new Error(`Error al registrar el resultado: ${response.statusText}`);
    }

    return await response.json(); // Retorna el resultado creado
  } catch (error) {
    console.error("Error en la solicitud de creación de resultado:", error);
    throw error;
  }
}

export async function createProgreso(data: {
  completado: boolean;
  usuario: number;
  leccion: number;
}): Promise<any> {
  try {
    // Validar los datos antes de realizar la solicitud
    if (data.usuario === null || data.leccion === null) {
      throw new Error("Los campos usuario y lección son obligatorios.");
    }

    // Realizar la solicitud POST al endpoint correspondiente
    const response = await fetch(`${API_URL}/progreso/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al registrar el progreso:", errorMessage);
      throw new Error(`Error al registrar el progreso: ${response.statusText}`);
    }

    return await response.json(); // Retorna el progreso creado
  } catch (error) {
    console.error("Error en la solicitud de creación de progreso:", error);
    throw error;
  }
}

// Obtener un módulo específico por ID junto con sus lecciones
export async function fetchModuloPorId(id: number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/modulos/${id}/`);
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al obtener el módulo:", errorMessage);
      throw new Error(`Error al obtener el módulo: ${response.statusText}`);
    }
    return await response.json(); // Retorna el módulo con sus lecciones
  } catch (error) {
    console.error("Error en la solicitud de obtener módulo:", error);
    throw error;
  }
}
// Función para obtener resultados por usuario
export async function fetchResultadoPorUsuario(usuarioId: number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/resultados/?usuario_id=${usuarioId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al obtener el resultado:", errorMessage);
      throw new Error(`Error al obtener el resultado: ${response.statusText}`);
    }

    return await response.json(); // Retorna el resultado filtrado
  } catch (error) {
    console.error("Error en la solicitud de resultado por usuario:", error);
    throw error;
  }
}

// Función para obtener resultados por usuario y actividad
export async function fetchResultadoPorUsuarioYActividad(usuarioId: number, actividadId: number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/resultados/?usuario_id=${usuarioId}&actividad_id=${actividadId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al obtener el resultado:", errorMessage);
      throw new Error(`Error al obtener el resultado: ${response.statusText}`);
    }

    return await response.json(); // Retorna el resultado filtrado
  } catch (error) {
    console.error("Error en la solicitud de resultado por usuario y actividad:", error);
    throw error;
  }
}
export async function createOpcion(data: {
  texto: string;
  es_correcta: boolean;
  pregunta: number;
}): Promise<any> {
  try {
    // Validar que los campos no estén vacíos
    if (!data.texto || data.pregunta === null || data.pregunta === undefined) {
      throw new Error("Todos los campos son obligatorios.");
    }

    // Realizar la solicitud POST al endpoint correspondiente
    const response = await fetch(`${API_URL}/opciones/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error al crear la opción:", errorMessage);
      throw new Error(`Error al crear la opción: ${response.statusText}`);
    }

    return await response.json(); // Retorna la opción creada
  } catch (error) {
    console.error("Error en la solicitud de creación de opción:", error);
    throw error;
  }
}
