// filepath: Frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';

function App() {
  return (
    <Router>
    <Routes>
      {/* Ruta principal con el componente de Login */}
      <Route path="/" element={<Login />} />

      {/* Ruta para la vista nueva, a donde ir después de iniciar sesión */}
      <Route path="/Main" element={<Main />} />
    </Routes>
  </Router>
  );
}

export default App;