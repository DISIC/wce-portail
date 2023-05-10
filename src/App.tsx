import { Button } from '@codegouvfr/react-dsfr/Button';
import { useState } from 'react';
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import Jitsi from './pages/login/Jitsi';
import { Routes, Route } from 'react-router-dom';
import FAQ from './pages/FAQ/FAQ.md';
import DonneesPerso from './pages/DonneesPerso/DonneesPerso.md';
import Contact from './pages/Contact/Contact.md';
import Cgu from './pages/Cgu/Cgu.md';
import Apropos from './pages/Apropos/Apropos.md';
import Accessibilite from './pages/Accessibilite/Accessibilite.md';
import Mentionslegales from './pages/MentionsLegales/MentionsLegales.md';
import StaticPagesBuilder from './pages/staticPagesBuilder/StaticPagesBuilder';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":roomName" element={<Jitsi />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route
          path="faq"
          element={<StaticPagesBuilder markDown={FAQ} contentTable={true} />}
        />
        <Route
          path="donneespersonnelles"
          element={
            <StaticPagesBuilder markDown={DonneesPerso} contentTable={true} />
          }
        />
        <Route
          path="contact"
          element={
            <StaticPagesBuilder markDown={Contact} contentTable={false} />
          }
        />
        <Route
          path="apropos"
          element={
            <StaticPagesBuilder markDown={Apropos} contentTable={true} />
          }
        />
        <Route
          path="cgu"
          element={<StaticPagesBuilder markDown={Cgu} contentTable={true} />}
        />
        <Route
          path="accessibilite"
          element={
            <StaticPagesBuilder markDown={Accessibilite} contentTable={true} />
          }
        />
        <Route
          path="mentionslegales"
          element={
            <StaticPagesBuilder
              markDown={Mentionslegales}
              contentTable={true}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
