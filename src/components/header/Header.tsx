import { Header } from '@codegouvfr/react-dsfr/Header';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/axios';
import { useState } from 'react';
import { Badge } from '@dataesr/react-dsfr';
type errorObj = {
  message: string;
  error: { status: string; stack: string };
};

interface headerProps {
  authenticated: boolean | null;
  setAuthenticated: (e: boolean) => void;
  setError: (obj: errorObj) => void;
}

function HeaderComponent({
  authenticated,
  setAuthenticated,
  setError,
}: headerProps) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState<any>();

  const logOut = () => {
    api
      .get('/logout')
      .then(res => {
        if (res.data.error) {
          localStorage.setItem('auth', 'false');
          setAuthenticated(false);
          navigate('/');
        } else {
          open(res.data, '_self');
        }
      })
      .catch(error => {
        if (error.response) {
          setMsg(
            <Badge
              text="une erreur est survenue lors de la déconnexion"
              type="error"
            />
          );
        } else {
          if (error.request) {
            setError({
              message: 'une erreur est survenue lors de la déconnexion',
              error: { status: '', stack: '' },
            });
            navigate('/static/error');
          } else {
            setError({
              message: 'une erreur est survenue lors de la déconnexion',
              error: { status: '', stack: '' },
            });
            navigate('/static/error');
          }
        }
      });
  };
  return (
    <>
      {authenticated ? <button onClick={logOut}>Se déconnecter</button> : null}
      <Header
        brandTop={
          <>
            RÉPUBLIQUE
            <br />
            FRANÇAISE
          </>
        }
        homeLinkProps={{
          href: '/',
          title: "Accueil - Webconférence de l'Etat",
        }}
        //quickAccessItems={[headerFooterDisplayItem]}
        serviceTagline=""
        serviceTitle={window.location.host}
        navigation={[
          {
            linkProps: {
              href: 'faq',
              target: '_self',
            },
            text: 'Foire aux questions',
          },
          {
            linkProps: {
              href: 'cgu',
              target: '_self',
            },
            text: "Conditions générales d'utilisation",
          },
          {
            linkProps: {
              href: 'contact',
              target: '_self',
            },
            text: 'Contact',
          },
          {
            linkProps: {
              href: 'apropos',
              target: '_self',
            },
            text: 'À propos',
          },
          {
            linkProps: {
              href: 'browser_test',
              target: '_self',
            },
            text: 'Tester votre matériel',
          },
        ]}
      />
      {msg}
    </>
  );
}

export default HeaderComponent;
