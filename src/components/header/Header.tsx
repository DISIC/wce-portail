import { Header } from '@codegouvfr/react-dsfr/Header';
import { Gaufre } from '@gouvfr-lasuite/integration';
import styles from './Header.module.css';
import '@gouvfr-lasuite/integration/dist/css/gaufre.css';
import Button from '@codegouvfr/react-dsfr/Button';

type errorObj = {
  message: string;
  error: { status: string; stack: string };
};

interface headerProps {
  authenticated: boolean | null;
  setAuthenticated: (e: boolean) => void;
  setError: (obj: errorObj) => void;
}

function HeaderComponent({ authenticated }: headerProps) {
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
  };
  return (
    <div className={styles.parent}>
      <Header
        brandTop={<>INTITULE<br />OFFICIEL</>}
        homeLinkProps={{
          href: '/',
          title: 'Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)'
        }}
        id="fr-header-header-with-quick-access-items"
        quickAccessItems={[
          {
            iconId: 'fr-icon-information-line fr-btn--icon-right',
            linkProps: {
              href: '#'
            },
            text: 'Informations'
          },
          {
            buttonProps: {
              onClick: function noRefCheck(){}
            },
            iconId: 'fr-btn fr-icon-account-circle-fill fr-btn--icon-right',
            text: 'Connexion'
          },
        ]}
        serviceTitle="Joona.fr"
      />
    </div>
  );
}

export default HeaderComponent;
