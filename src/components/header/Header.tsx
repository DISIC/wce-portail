import { Header } from '@codegouvfr/react-dsfr/Header';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/axios';
import { useState } from 'react';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import { Accordion } from '@codegouvfr/react-dsfr/Accordion';

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
  const [expanded, setExpanded] = useState(false);

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
            <Badge noIcon severity="error">
              une erreur est survenue lors de la déconnexion
            </Badge>
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
          to: '/',
          title: "Accueil - Webconférence de l'Etat",
        }}
        //quickAccessItems={[headerFooterDisplayItem]}
        quickAccessItems={[
          {
            iconId: 'fr-icon-mail-fill',
            linkProps: {
              to: 'contact',
            },
            text: 'Contact',
          },
          <Button
            style={{ display: authenticated ? undefined : 'none' }}
            priority="tertiary no outline"
            onClick={logOut}
          >
            Se déconnecter
          </Button>,
        ]}
        id="fr-header-header-with-quick-access-items"
        serviceTagline=""
        serviceTitle={window.location.host}
        navigation={[
          {
            linkProps: {
              to: '/',
              target: '_self',
            },
            text: 'Acceuil',
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
        // navigation={
        //   <div>
        //     {/* <MainNavigation
        //       items={[
        //         {
        //           linkProps: { href: '#', target: '_self' },
        //           text: 'accès direct',
        //         },
        //         {
        //           isActive: true,
        //           linkProps: { href: '#', target: '_self' },
        //           text: 'accès direct',
        //         },
        //         {
        //           linkProps: { href: '#', target: '_self' },
        //           text: 'accès direct',
        //         },
        //         {
        //           linkProps: { href: '#', target: '_self' },
        //           text: 'accès direct',
        //         },
        //       ]}
        //     /> */}
        //     <div className={styles.logout}>
        //       <Link to={'contact'}>
        //         <Button priority="tertiary no outline">
        //           <EmailIcon /> &nbsp; Contact
        //         </Button>
        //       </Link>
        //       {authenticated ? (
        //         <Button priority="tertiary no outline" onClick={logOut}>
        //           Se déconnecter
        //         </Button>
        //       ) : null}
        //     </div>
        //     {/* <Button priority="tertiary no outline">
        //       <Accordion
        //         label="À propos"
        //         onChange={value => setExpanded(!value)}
        //         expanded={expanded}
        //       >
        //         <div className={styles.buttons}>
        //           <Link to={'apropos'}>
        //             <Button priority="tertiary no outline">
        //               Présentation du service
        //             </Button>
        //           </Link>
        //           <Link to={'faq'}>
        //             <Button priority="tertiary no outline">
        //               Foire aux questions
        //             </Button>
        //           </Link>
        //           <Link to={'cgu'}>
        //             <Button priority="tertiary no outline">
        //               Conditions générales d'utilisation
        //             </Button>
        //           </Link>
        //         </div>
        //       </Accordion>
        //     </Button> */}

        //     <Link to={'/'}>
        //       <Button priority="tertiary no outline">Accueil</Button>
        //     </Link>
        //     <Link to={'apropos'}>
        //       <Button priority="tertiary no outline">À propos</Button>
        //     </Link>
        //     <Link to={'faq'}>
        //       <Button priority="tertiary no outline">
        //         Foire aux questions
        //       </Button>
        //     </Link>
        //     <Link to={'cgu'}>
        //       <Button priority="tertiary no outline">
        //         Conditions générales d'utilisation
        //       </Button>
        //     </Link>
        //     <Link to={'faq'}>
        //       <Button priority="tertiary no outline">
        //         Centre de resources
        //       </Button>
        //     </Link>
        //     <Link to={'browser_test'}>
        //       <Button priority="tertiary no outline">
        //         Tester votre matériel
        //       </Button>
        //     </Link>
        //   </div>
        // }
      />
      {msg}
    </div>
  );
}

export default HeaderComponent;
