import { Header } from '@codegouvfr/react-dsfr/Header';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/axios';
import { useState } from 'react';
import { Badge } from '@dataesr/react-dsfr';
import styles from './Header.module.css'
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
        // navigation={[
        //   {
        //     linkProps: {
        //       href: 'faq',
        //       target: '_self',
        //     },
        //     text: 'Foire aux questions',
        //   },
        //   {
        //     linkProps: {
        //       href: 'cgu',
        //       target: '_self',
        //     },
        //     text: "Conditions générales d'utilisation",
        //   },
        //   {
        //     linkProps: {
        //       href: 'contact',
        //       target: '_self',
        //     },
        //     text: 'Contact',
        //   },
        //   {
        //     linkProps: {
        //       href: 'apropos',
        //       target: '_self',
        //     },
        //     text: 'À propos',
        //   },
        //   {
        //     linkProps: {
        //       href: 'browser_test',
        //       target: '_self',
        //     },
        //     text: 'Tester votre matériel',
        //   },
        // ]}
        navigation={<div>
          {authenticated ? <Button priority="tertiary no outline" className={styles.logout} onClick={logOut}>Se déconnecter</Button> : null}
           <Link to={'faq'}><Button priority="tertiary no outline">Foire aux questions</Button></Link> 
           <Link to={'cgu'}><Button priority="tertiary no outline">Conditions générales d'utilisation</Button></Link>
           <Link to={'contact'}><Button priority="tertiary no outline">Contact</Button></Link>
           <Link to={'apropos'}><Button priority="tertiary no outline">À propos</Button></Link>
           <Link to={'browser_test'}><Button priority="tertiary no outline">Tester votre matériel</Button></Link>
           </div>}
      />
      {msg}
    </div>
  );
}

export default HeaderComponent;
