import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

// Iconos según el rol
const roleIcons: { [key: number]: string } = {
  1: "👑", // Administrador
  2: "📚", // Docente
  3: "🎓", // Estudiante
};

// Botones según el rol
const roleButtons: { [key: number]: { label: string; path: string }[] } = {
  1: [
    { label: "Inicio", path: "/admin" },
    { label: "Módulos", path: "/modulos" },
    { label: "Lecciones", path: "/lecciones" },
    { label: "Registrar", path: "/registrar" },
  ],
  2: [
    { label: "Inicio", path: "/inicio" },
    { label: "Estudiantes", path: "/estudiantes" },
    { label: "Resultados", path: "/resultados" },
  ],
  3: [
    { label: "Inicio", path: "/inicio" },
    { label: "Módulos", path: "/modulos" },
  ],
};

interface HeaderProps {
  userName: string; // Nombre del usuario
  userRole: number; // Rol del usuario
}

const Header: React.FC<HeaderProps> = ({ userName, userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el usuario del localStorage y redirigir al login
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <header className="bg-indigo-600 text-white shadow-lg py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo OVA"
            className="w-12 h-12 rounded-full shadow-md border-2 border-white"
          />
          <h1 className="text-2xl font-bold tracking-wide">
            OVA de Ondas y Partículas
          </h1>
        </div>

        {/* Navegación según el rol */}
        <nav className="mt-4 md:mt-0 flex space-x-4">
          {roleButtons[userRole]?.map((button, index) => (
            <button
              key={index}
              onClick={() => navigate(button.path)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg shadow-md transition"
            >
              {button.label}
            </button>
          ))}
        </nav>

        {/* Información del usuario y botón de cerrar sesión */}
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <span className="text-2xl">{roleIcons[userRole]}</span>
          <span className="text-lg font-semibold">{userName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
