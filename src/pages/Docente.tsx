import React from "react";
import Header from "../components/Header";

const Docente: React.FC = () => {
  // Obtener el usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  return (
    <div>
      {/* Header con datos dinámicos */}
      <Header userName={usuario.nombre || "Invitado"} userRole={usuario.rol || 0} />

      {/* Contenido de la página */}
      <main className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center">
          Bienvenido al OVA
        </h1>
        <p className="text-center mt-4">
          Explora los módulos educativos y actividades interactivas.
        </p>
      </main>
    </div>
  );
};

export default Docente;
