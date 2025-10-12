import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreateSpot from './pages/CreateSpot';
import ShowSpot from './pages/ShowSpot';
import EditSpot from './pages/EditSpot';
import DeleteSpot from './pages/DeleteSpot';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/spots/create' element={<CreateSpot />} />
      <Route path='/spots/details/:id' element={<ShowSpot />} />
      <Route path='/spots/edit/:id' element={<EditSpot />} />
      <Route path='/spots/delete/:id' element={<DeleteSpot />} />
    </Routes>
  );
};

export default App;
