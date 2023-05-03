import { Button } from '@codegouvfr/react-dsfr/Button';
import { useState } from 'react';
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';

function App() {
  const [state, setState] = useState(false);

  function handle() {
    setState(true);
  }
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
}

export default App;
