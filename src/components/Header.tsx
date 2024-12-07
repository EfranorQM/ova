import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

// Iconos según el rol
const roleIcons: { [key: number]: string } = {
  1: "👑", // Administrador
  2: "📚", // Docente
  3: "🎓", // Estudiante
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
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6">
        {/* Título alineado a la izquierda */}
        <h1 className="text-2xl font-bold tracking-wide text-left flex-1">
          OVA de Ondas y Partículas
        </h1>

        {/* Logo centrado con animación */}
        <div className="flex justify-center w-full md:w-auto mt-4 md:mt-0">
          <img
            src={logo}
            alt="Logo OVA"
            className="w-20 h-20 rounded-full shadow-lg border-2 border-white transform transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Información del usuario */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0 flex-1 justify-end">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{roleIcons[userRole]}</span>
            <div className="text-right">
              <p className="text-lg font-semibold">{userName}</p>
              <p className="text-sm text-indigo-200">
                {userRole === 1
                  ? "Administrador"
                  : userRole === 2
                  ? "Docente"
                  : "Estudiante"}
              </p>
            </div>
          </div>

          {/* Botón de cerrar sesión */}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl transition duration-300 ease-in-out"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
