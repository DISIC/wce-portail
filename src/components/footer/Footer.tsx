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
          Un service proposé par la Direction Interministérielle du Numérique
          (DINUM) et opéré par le Ministère de la Transition Écologique et de la
          Cohésion des Territoires (MTECT).
        </div>
      }
      // cookiesManagementLinkProps={{
      //   href: '#',
      // }}
      homeLinkProps={{
        href: '/',
        title: "Accueil - Webconférence de l'Etat",
      }}
      personalDataLinkProps={{
        href: '/donneespersonnelles',
      }}
      termsLinkProps={{
        href: 'mentionslegales',
      }}
      websiteMapLinkProps={{
        href: 'faq',
      }}
      accessibilityLinkProps={{
        href: 'accessibilite',
      }}
      bottomItems={[headerFooterDisplayItem]}
    />
  );
}

export default footer;
