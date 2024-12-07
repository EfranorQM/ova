import React from "react";
import Header from "../components/Header";
import ListaModulosEstudiante from "../components/ListaModulosEstudiante";

const Estudiante: React.FC = () => {
  // Obtener el usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header con datos dinámicos */}
      <Header userName={usuario.nombre || "Invitado"} userRole={usuario.rol || 0} />
  
      {/* Contenido de la página */}
      <main className="container mx-auto mt-12 px-6">
        {/* Sección de Bienvenida */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-extrabold text-center">
            ¡Bienvenido, <span className="capitalize">{usuario.nombre || "Invitado"}</span>!
          </h1>
          <p className="text-center mt-2 text-lg">
            Explora los módulos educativos y participa en actividades interactivas.
          </p>
        </div>
  
        {/* Sección de Módulos */}
        <section className="mt-12">
          <ListaModulosEstudiante />
        </section>
      </main>
    </div>
  );  
};

export default Estudiante;
