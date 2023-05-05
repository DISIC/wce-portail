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
        navigation={[
          {
            linkProps: {
              href: '#',
              target: '_self',
            },
            text: 'accès direct',
          },
          {
            isActive: true,
            linkProps: {
              href: '#',
              target: '_self',
            },
            text: 'accès direct',
          },
          {
            linkProps: {
              href: '#',
              target: '_self',
            },
            text: 'accès direct',
          },
          {
            linkProps: {
              href: '#',
              target: '_self',
            },
            text: 'accès direct',
          },
        ]}
      />
    </>
  );
}

export default header;
