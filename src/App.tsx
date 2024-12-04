import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Importar los componentes de cada rol
import AdminPanel from "./pages/Admin"; // Suponiendo que Admin.tsx existe en pages
import DocentePanel from "./pages/Docente"; // Suponiendo que Docente.tsx existe en pages
import EstudiantePanel from "./pages/Estudiante"; // Importa el componente Estudiante

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
      </Routes>
    </Router>
  );
}

export default App;
