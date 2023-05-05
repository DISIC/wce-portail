import { Footer, FooterProps } from '@codegouvfr/react-dsfr/Footer';

interface props {
  headerFooterDisplayItem: FooterProps.BottomItem;
}

function footer({ headerFooterDisplayItem }: props) {
  return (
    <Footer
      accessibility="fully compliant"
      brandTop={
        <>
          RÉPUBLIQUE
          <br />
          FRANÇAISE
        </>
      }
      contentDescription={
        <div>
          <a
            style={{
              marginRight: '10px',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            href="https://www.numerique.gouv.fr"
            target="_blank"
          >
            C'est une misssion de la DINUM
          </a>
          <a
            style={{
              marginRight: '10px',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            href="https://www.ecologie.gouv.fr/"
            target="_blank"
          >
            Ce site est Opéré par le MTE
          </a>
        </div>
      }
      cookiesManagementLinkProps={{
        href: '#',
      }}
      homeLinkProps={{
        href: '/',
        title: "Accueil - Webconférence de l'Etat",
      }}
      personalDataLinkProps={{
        href: '#',
      }}
      termsLinkProps={{
        href: '#',
      }}
      websiteMapLinkProps={{
        href: '#',
      }}
      bottomItems={[headerFooterDisplayItem]}
    />
  );
}

export default footer;
