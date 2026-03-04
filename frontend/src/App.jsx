import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import CreateSpot from './pages/CreateSpot';
import ShowSpot from './pages/ShowSpot';
import EditSpot from './pages/EditSpot';
import DeleteSpot from './pages/DeleteSpot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path='/spots/create'
        element={
          <ProtectedRoute>
            <CreateSpot />
          </ProtectedRoute>
        }
      />
      <Route
        path='/spots/details/:id'
        element={
          <ProtectedRoute>
            <ShowSpot />
          </ProtectedRoute>
        }
      />
      <Route
        path='/spots/edit/:id'
        element={
          <ProtectedRoute>
            <EditSpot />
          </ProtectedRoute>
        }
      />
      <Route
        path='/spots/delete/:id'
        element={
          <ProtectedRoute>
            <DeleteSpot />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default App;
