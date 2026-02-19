// filepath: src/components/ProtectedRoute.tsx
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../globaStorage';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUserStore();
  const usuarioGuardado = localStorage.getItem('usuario');

  if (!user && !usuarioGuardado) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
