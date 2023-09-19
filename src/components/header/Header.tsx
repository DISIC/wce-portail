import { Header } from '@codegouvfr/react-dsfr/Header';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/axios';
import { useState } from 'react';
import { Badge } from '@dataesr/react-dsfr';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

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
            navigate('/error');
          } else {
            setError({
              message: 'une erreur est survenue lors de la déconnexion',
              error: { status: '', stack: '' },
            });
            navigate('/error');
          }
        }
      });
  };
  return (
    <div className={styles.parent}>
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
        navigation={
          <div>
            <div className={styles.logout}>
              <Link to={'faq'}>
                <Button priority="tertiary no outline">
                  Centre de resources
                </Button>
              </Link>
              {authenticated ? (
                <Button priority="tertiary no outline" onClick={logOut}>
                  Se déconnecter
                </Button>
              ) : (
                <Button priority="tertiary no outline" onClick={logOut}>
                  Se déconnecter
                </Button>
              )}
            </div>

            {/* 
              <Button priority="tertiary no outline">
                Foire aux questions
              </Button>
            </Link>
            <Link to={'cgu'}>
              <Button priority="tertiary no outline">
                Conditions générales d'utilisation
              </Button>
            </Link>
            <Link to={'contact'}>
              <Button priority="tertiary no outline">Contact</Button>
            </Link>
            <Link to={'apropos'}>
              <Button priority="tertiary no outline">À propos</Button>
            </Link>
            <Link to={'browser_test'}>
              <Button priority="tertiary no outline">
                Tester votre matériel
              </Button>
            </Link> */}
          </div>
        }
      />
      {msg}
    </div>
  );
}

export default HeaderComponent;
