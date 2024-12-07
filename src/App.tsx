import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Importar los componentes de cada rol
import AdminPanel from "./pages/Admin";
import DocentePanel from "./pages/Docente";
import EstudiantePanel from "./pages/Estudiante";
import Modulos from "./pages/Modulos";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/" element={<Login />} />

        {/* Ruta protegida para Administradores */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedType={[1]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para Docentes */}
        <Route
          path="/docente"
          element={
            <ProtectedRoute allowedType={[2]}>
              <DocentePanel />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para Estudiantes */}
        <Route
          path="/estudiante"
          element={
            <ProtectedRoute allowedType={[3]}>
              <EstudiantePanel />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para la página de Módulos del Estudiante */}
        <Route
          path="/estudiante/modulos/:id"
          element={
            <ProtectedRoute allowedType={[3]}>
              <Modulos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
