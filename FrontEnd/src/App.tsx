// filepath: src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Perfil from './components/Perfil';
import AdminPeliculas from './components/AdminPeliculas'; // <-- Importa la nueva vista
import { useUserStore } from './globaStorage';
import ProtectedRoute from './components/ProtectedRoute';
import { mapUser } from './utils/mapUser';
import DetallePelicula from './components/DetallePelicula';

function App() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
  if (usuarioGuardado) {
    setUser(mapUser(JSON.parse(usuarioGuardado)));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminPeliculas"
          element={
            <ProtectedRoute>
              <AdminPeliculas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pelicula/:id"
          element={
            <ProtectedRoute>
              <DetallePelicula />      
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
