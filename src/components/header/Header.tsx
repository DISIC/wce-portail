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
      />
    </>
  );
}

export default header;
