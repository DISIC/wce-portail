import { Header } from '@codegouvfr/react-dsfr/Header';

function header() {
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
    </>
  );
}

export default header;
