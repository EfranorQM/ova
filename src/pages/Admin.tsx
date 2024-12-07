import React, { useState } from "react";
import Header from "../components/Header";
import RegistrarModulo from "../components/RegistrarModulo";
import RegistrarLeccion from "../components/RegistrarLeccion";
import RegistrarUsuario from "../components/RegistrarUsuario"; 
import ListaModulos from "../components/ListaModulos";
import ListaLecciones from "../components/ListaLecciones";
import ListaUsuarios from "../components/ListaUsuarios";
import RegistrarRecursoMultimedia from "../components/RegistrarRecursoMultimedia";
import RegistrarActividad from "../components/RegistrarActividad";
import RegistrarPregunta from "../components/RegistrarPregunta";
import RegistrarResultado from "../components/RegistrarResultado";
import RegistrarProgreso from "../components/RegistrarProgreso";
import RegistrarOpcion from "../components/RegistrarOpcion";
import ListarRecursos from "../components/ListarRecursos"; 
import ListaActividades from "../components/ListaActividades";
import ListaPreguntas from "../components/ListaPreguntas";
import ListaOpciones from "../components/ListaOpciones";


const Admin: React.FC = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  // Estados para manejar las vistas y funcionalidades
  const [currentView, setCurrentView] = useState<"main" | "modulos" | "lecciones" 
  | "usuarios" | "recursos" | "actividades" | "preguntas" | "opciones">("main");

  const [selectedModuloId, setSelectedModuloId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showLeccionModal, setShowLeccionModal] = useState(false);
  const [showUsuarioModal, setShowUsuarioModal] = useState(false); // Modal de registrar usuario
  const [showRecursoModal, setShowRecursoModal] = useState(false);
  const [showActividadModal, setShowActividadModal] = useState(false);
  const [showPreguntaModal, setShowPreguntaModal] = useState(false);
  const [showResultadoModal, setShowResultadoModal] = useState(false);
  const [showProgresoModal, setShowProgresoModal] = useState(false);
  const [showOpcionesModal, setShowOpcionesModal] = useState(false);

  const handleSelectModulo = (moduloId: number) => {
    setSelectedModuloId(moduloId);
    setCurrentView("lecciones");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo en la parte superior */}
      <Header
        userName={usuario.nombre || "Invitado"}
        userRole={usuario.rol || 0}
      />
  
      {/* Contenido principal */}
      <main className="flex-1 container mx-auto px-6 mt-10">
        {currentView === "main" ? (
          // Vista principal: bienvenida y tarjetas
          <div>
            {/* Título y mensaje de bienvenida */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-indigo-600">
                ¡Bienvenido, Administrador!
              </h1>
              <p className="mt-4 text-gray-700">
                Desde aquí puedes gestionar los módulos, lecciones y usuarios
                del OVA.
              </p>
            </div>
  
            {/* Tarjetas de funciones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tarjeta de gestión de módulos */}
              <div className="bg-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-indigo-600">Módulos</h2>
                <p className="mt-2 text-gray-600">
                  Gestiona y organiza los módulos educativos del OVA.
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    onClick={() => setCurrentView("modulos")}
                  >
                    Ver Módulos
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-500"
                    onClick={() => setShowModal(true)}
                  >
                    Crear Módulo
                  </button>
                </div>
              </div>
  
              {/* Tarjeta de gestión de lecciones */}
              <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-green-600">Lecciones</h2>
                <p className="mt-2 text-gray-600">
                  Crea y edita las lecciones asociadas a los módulos.
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() => {
                      setSelectedModuloId(null);
                      setCurrentView("lecciones");
                    }}
                  >
                    Ver Lecciones
                  </button>
                  <button
                    className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500"
                    onClick={() => setShowLeccionModal(true)}
                  >
                    Crear Lección
                  </button>
                </div>
              </div>
  
              {/* Tarjeta de gestión de usuarios */}
              <div className="bg-red-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-red-600">Usuarios</h2>
                <p className="mt-2 text-gray-600">
                  Administra los usuarios y sus roles dentro del OVA.
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => setCurrentView("usuarios")}
                  >
                    Ver Usuarios
                  </button>
                  <button
                    className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500"
                    onClick={() => setShowUsuarioModal(true)}
                  >
                    Registrar Usuario
                  </button>
                </div>
              </div>
  
              {/* Tarjeta de gestión de recursos multimedia */}
              <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-blue-600">Recursos Multimedia</h2>
                <p className="mt-2 text-gray-600">
                  Gestiona los recursos multimedia del OVA.
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setCurrentView("recursos")}
                  >
                    Ver Recursos
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                    onClick={() => setShowRecursoModal(true)}
                  >
                    Crear Recurso
                  </button>
                </div>
              </div>

              {/* Tarjeta de actividades */}
              <div className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-yellow-600">Actividades</h2>
                <p className="mt-2 text-gray-600">
                  Crea y edita las actividades educativas del OVA.
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                    onClick={() => setCurrentView("actividades")}
                  >
                    Ver Actividades
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                    onClick={() => setShowActividadModal(true)}
                  >
                    Crear Actividad
                  </button>
                </div>
              </div>
  
              {/* Tarjeta de preguntas */}
              <div className="bg-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-purple-600">Preguntas</h2>
                <p className="mt-2 text-gray-600">
                  Administra las preguntas del sistema.
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    onClick={() => setCurrentView("preguntas")}
                  >
                    Ver Preguntas
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500"
                    onClick={() => setShowPreguntaModal(true)}
                  >
                    Crear Pregunta
                  </button>
                </div>
              </div>
              {/* Tarjeta de opciones */}
              <div className="bg-teal-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-teal-600">Opciones</h2>
                <p className="mt-2 text-gray-600">
                  Administra las respuestas de cada pregunta.
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                    onClick={() => setCurrentView("opciones")}
                  >
                    Ver Opciones
                  </button>
                  <button
                    className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500"
                    onClick={() => setShowOpcionesModal(true)}
                  >
                    Registrar Opción
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : currentView === "modulos" ? (
          // Vista de módulos
          <div>
            <button
              className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={() => setCurrentView("main")}
            >
              Volver
            </button>
            <ListaModulos onSelectModulo={handleSelectModulo} />
          </div>
        ) : currentView === "lecciones" ? (
          // Vista de lecciones
          <div>
            <button
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => setCurrentView("main")}
            >
              Volver
            </button>
            <ListaLecciones moduloId={selectedModuloId || undefined} />
          </div>
        ) : currentView === "recursos" ? (
          // Vista de recursos
          <div>
            <button
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setCurrentView("main")}
            >
              Volver
            </button>
            <ListarRecursos />
          </div>
        ): currentView === "preguntas" ? (
          // Vista de preguntas
          <div>
            <button
              className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={() => setCurrentView("main")}
            >
              Volver
            </button>
            <ListaPreguntas />
          </div>
        )         : currentView === "actividades" ? (
          // Vista de actividades
          <div>
            <button
              className="mb-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              onClick={() => setCurrentView("main")}
            >
              Volver
            </button>
            <ListaActividades />
          </div>
        ) : currentView === "opciones" ? (
          // Vista de opciones
          <div>
            <button
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => setCurrentView("main")}
            >
              Volver
            </button>
            <ListaOpciones />
          </div>
        )
        : (
          // Vista de usuarios
          <div>
            <button
              className="mb-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => setCurrentView("main")}
            >
              Volver
            </button>
            <ListaUsuarios />
          </div>
        )
        }
      </main>
  
      {/* Modal para registrar módulo */}
      {showModal && <RegistrarModulo onClose={() => setShowModal(false)} />}
      {/* Modal para registrar lección */}
      {showLeccionModal && (
        <RegistrarLeccion onClose={() => setShowLeccionModal(false)} />
      )}
      {/* Modal para registrar usuario */}
      {showUsuarioModal && (
        <RegistrarUsuario onClose={() => setShowUsuarioModal(false)} />
      )}
      {/* Modal para registrar recurso multimedia */}
{showRecursoModal && (
  <RegistrarRecursoMultimedia onClose={() => setShowRecursoModal(false)} />
)}
{showActividadModal && (
  <RegistrarActividad onClose={() => setShowActividadModal(false)} />
)}
{showPreguntaModal && (
  <RegistrarPregunta onClose={() => setShowPreguntaModal(false)} />
)}
{showResultadoModal && (
  <RegistrarResultado onClose={() => setShowResultadoModal(false)} />
)}
{showProgresoModal && (
  <RegistrarProgreso onClose={() => setShowProgresoModal(false)} />
)}
{showOpcionesModal && (
  <RegistrarOpcion onClose={() => setShowOpcionesModal(false)} />
)}
    </div>
  );
  
};

export default Admin;
