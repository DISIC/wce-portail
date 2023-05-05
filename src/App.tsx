import { Button } from '@codegouvfr/react-dsfr/Button';
import { useState } from 'react';
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":roomName" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
