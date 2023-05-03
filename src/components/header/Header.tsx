import React, { ReactNode } from 'react';
import { Header, HeaderProps } from '@codegouvfr/react-dsfr/Header';

interface props {
  headerFooterDisplayItem: HeaderProps.QuickAccessItem;
}

function header({ headerFooterDisplayItem }: props) {
  return (
    <>
      <Header
        brandTop={
          <>
            INTITULE
            <br />
            OFFICIEL
          </>
        }
        homeLinkProps={{
          href: '/',
          title:
            'Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)',
        }}
        quickAccessItems={[headerFooterDisplayItem]}
        serviceTagline="baseline - précisions sur l'organisation"
        serviceTitle="Nom du site / service"
      />
    </>
  );
}

export default header;
