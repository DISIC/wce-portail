import { Header } from '@codegouvfr/react-dsfr/Header';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/axios';
import { useState } from 'react';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import styles from './Header.module.css';

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
    fetch(`${import.meta.env.VITE_BASE_URL}/authentication/logout`, {
      redirect: 'manual',
    }).then(res => {
      if (res.type === 'opaqueredirect') {
        window.location.href = res.url;
      } else {
        // handle normally / pass on to next handler
        window.location.href = res.url;
      }
    });
    // api
    //   .get('/authentication/logout')
    //   .then(res => {
    //     if (res.data.error) {
    //       localStorage.setItem('auth', 'false');
    //       setAuthenticated(false);
    //       navigate('/');
    //     } else {
    //       open(res.data, '_self');
    //     }
    //   })
    //   .catch(error => {
    //     if (error.response) {
    //       setMsg(
    //         <Badge noIcon severity="error">
    //           une erreur est survenue lors de la déconnexion
    //         </Badge>
    //       );
    //     } else {
    //       if (error.request) {
    //         setError({
    //           message: 'une erreur est survenue lors de la déconnexion',
    //           error: { status: '', stack: '' },
    //         });
    //         navigate('/error');
    //       } else {
    //         setError({
    //           message: 'une erreur est survenue lors de la déconnexion',
    //           error: { status: '', stack: '' },
    //         });
    //         navigate('/error');
    //       }
    //     }
    //   });
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
          to: '/',
          title: "Accueil - Webconférence de l'Etat",
        }}
        quickAccessItems={[
          {
            iconId: 'fr-icon-mail-fill',
            linkProps: {
              to: 'contact',
            },
            text: 'Contact',
          },
          authenticated
            ? {
                iconId: 'fr-icon-user-fill',
                buttonProps: {
                  onClick: logOut,
                },
                text: 'Se déconnecter',
              }
            : null,
        ]}
        id="fr-header-header-with-quick-access-items"
        serviceTagline=""
        serviceTitle={window.location.host}
        navigation={[
          {
            linkProps: {
              to: '/',
              target: '_self',
              replace: true,
            },
            text: 'Accueil',
          },
          {
            menuLinks: [
              {
                linkProps: {
                  to: '/apropos',
                },
                text: 'Présentation du service',
              },
              {
                linkProps: {
                  to: 'faq',
                },
                text: 'Foire aux questions',
              },
              {
                linkProps: {
                  to: 'cgu',
                },
                text: "Conditions générales d'utilisation",
              },
            ],
            text: 'À propos',
          },
          {
            linkProps: {
              to: 'cgu',
              target: '_self',
            },
            text: 'Centre de ressources',
          },
          {
            linkProps: {
              to: 'browser_test',
              target: '_self',
            },
            text: 'Tester votre matériel',
          },
        ]}
      />
      {msg}
    </div>
  );
}

export default HeaderComponent;
