import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import './index.css';
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa';
import { Link } from 'react-router-dom';
startReactDsfr({
  defaultColorScheme: 'system',
  Link,
});

//Only in TypeScript projects
declare module '@codegouvfr/react-dsfr/spa' {
  interface RegisterLink {
    Link: typeof Link;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
