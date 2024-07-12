import { jsx as e, Fragment as u, jsxs as i } from "react/jsx-runtime";
import { createContext as x, useContext as H, Fragment as _ } from "react";
const g = (r, t, l = void 0) => {
  const n = Array.isArray(t) ? t : t.replace(/(\[(\d)\])/g, ".$2").replace(/^\./, "").split(".");
  if (!n.length || n[0] === void 0)
    return r;
  const a = n[0];
  return typeof r != "object" || r === null || !(a in r) || r[a] === void 0 ? l : g(r[a], n.slice(1), l);
}, L = {
  placeholder: "Entrez votre adresse e-mail",
  srLabel: "Adresse e-mail",
  submit: "Suivant",
  title: "Connexion avec {linebreak}votre adresse e-mail"
}, P = {
  homepageLinkTitle: {
    withoutService: "Retour à l'accueil",
    withService: "Retour à l'accueil - {serviceName}"
  },
  license: "Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous {license}",
  licenseEtalab: "licence etalab-2.0",
  links: {
    a11y: {
      perfect: "Accessibilité : conforme",
      partial: "Accessibilité : partiellement conforme",
      bad: "Accessibilité : non conforme"
    },
    privacy: "Données personnelles",
    sitemap: "Plan du site",
    terms: "Mentions légales"
  }
}, T = {
  label: "Les services de La Suite numérique"
}, W = {
  homepageLinkTitle: "Accueil - {serviceName}"
}, M = {
  newWindow: "{title} - nouvelle fenêtre"
}, S = {
  help: "Qu'est-ce que ProConnect ?",
  loginWith: "S’identifier avec",
  loginWithProconnect: "{loginWith} {proconnect}",
  or: "ou",
  title: "Connexion avec ProConnect"
}, v = {
  email: L,
  footer: P,
  gaufre: T,
  header: W,
  links: M,
  proconnect: S
}, N = x(v);
function O({
  translations: r,
  children: t
}) {
  return /* @__PURE__ */ e(N.Provider, { value: r, children: t });
}
function f() {
  const t = H(N) || v;
  return {
    t: function(n, a = {}) {
      const o = g(t, n);
      if (!o)
        return console.warn(`Translation for key "${n}" not found`), n;
      if (a) {
        const s = [];
        if (Object.keys(a).forEach((c) => {
          typeof a[c] != "string" && s.push(c);
        }), !s.length)
          return o.replace(/{(\w+)}/g, (c, m) => a[m]);
        const d = o.split(/{(.*?)}/);
        return /* @__PURE__ */ e(u, { children: d.map((c, m) => c in a ? /* @__PURE__ */ e(_, { children: a[c] }, m) : c) });
      }
      return o;
    }
  };
}
const k = ({
  action: r = "#",
  method: t = "post",
  onSubmit: l,
  inputName: n = "email",
  children: a
}) => {
  const {
    t: o
  } = f();
  return /* @__PURE__ */ i("form", { action: r, method: t, className: "fr-mb-4w fr-mb-md-6w", onSubmit: (s) => {
    l && l(s);
  }, children: [
    /* @__PURE__ */ e("div", { className: "fr-mb-4w fr-mb-md-6w", children: /* @__PURE__ */ e("input", { className: "fr-input lasuite-input", name: n, type: "email", "aria-label": o("email.srLabel"), placeholder: o("email.placeholder") }) }),
    a,
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e("button", { className: "fr-btn lasuite-btn", children: o("email.submit") }) })
  ] });
}, E = ({
  entity: r,
  homepageUrl: t = "/",
  serviceName: l,
  description: n,
  sitemapUrl: a,
  a11yUrl: o,
  a11yLevel: s,
  termsUrl: d,
  privacyUrl: c,
  links: m = [{
    label: "La Suite Numérique",
    url: "https://lasuite.numerique.gouv.fr/"
  }],
  legalLinks: p = [{
    label: "legifrance.gouv.fr",
    url: "https://legifrance.gouv.fr"
  }, {
    label: "info.gouv.fr",
    url: "https://info.gouv.fr"
  }, {
    label: "service-public.fr",
    url: "https://service-public.fr"
  }, {
    label: "data.gouv.fr",
    url: "https://data.gouv.fr"
  }],
  license: b
}) => {
  const {
    t: C
  } = f(), y = C(s === "fully compliant" ? "footer.links.a11y.perfect" : s === "partially compliant" ? "footer.links.a11y.partial" : "footer.links.a11y.bad");
  return /* @__PURE__ */ e("footer", { className: "fr-footer", role: "contentinfo", id: "footer-7127", children: /* @__PURE__ */ i("div", { className: "fr-container lasuite-container", children: [
    /* @__PURE__ */ i("div", { className: "fr-footer__body", children: [
      /* @__PURE__ */ e("div", { className: "fr-footer__brand fr-enlarge-link", children: /* @__PURE__ */ e("a", { id: "footer-operator", href: t, title: l ? C("footer.homepageLinkTitle.withService", {
        serviceName: l
      }) : C("footer.homepageLinkTitle.withoutService"), children: /* @__PURE__ */ e("p", { className: "fr-logo", children: r }) }) }),
      /* @__PURE__ */ i("div", { className: "fr-footer__content", children: [
        !!n && /* @__PURE__ */ e("p", { className: "fr-footer__content-desc", children: n }),
        /* @__PURE__ */ e("ul", { className: "fr-footer__content-list", children: p.map((h) => /* @__PURE__ */ e("li", { className: "fr-footer__content-item", children: /* @__PURE__ */ e("a", { target: "_blank", rel: "noopener external", title: C("links.newWindow", {
          title: h.label
        }), className: "fr-footer__content-link", href: h.url, children: h.label }) }, h.url)) })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "fr-footer__bottom", children: [
      /* @__PURE__ */ i("ul", { className: "fr-footer__bottom-list", children: [
        !!a && /* @__PURE__ */ e("li", { className: "fr-footer__bottom-item", children: /* @__PURE__ */ e("a", { className: "fr-footer__bottom-link", href: a, children: C("footer.links.sitemap") }) }),
        !!o && /* @__PURE__ */ e("li", { className: "fr-footer__bottom-item", children: /* @__PURE__ */ e("a", { className: "fr-footer__bottom-link", href: o, children: y }) }),
        !!d && /* @__PURE__ */ e("li", { className: "fr-footer__bottom-item", children: /* @__PURE__ */ e("a", { className: "fr-footer__bottom-link", href: d, children: C("footer.links.terms") }) }),
        !!c && /* @__PURE__ */ e("li", { className: "fr-footer__bottom-item", children: /* @__PURE__ */ e("a", { className: "fr-footer__bottom-link", href: c, children: C("footer.links.privacy") }) }),
        m.map((h) => /* @__PURE__ */ e("li", { className: "fr-footer__bottom-item", children: /* @__PURE__ */ e("a", { className: "fr-footer__bottom-link", href: h.url, children: h.label }) }, h.url))
      ] }),
      /* @__PURE__ */ e("div", { className: "fr-footer__bottom-copy", children: b === void 0 && /* @__PURE__ */ e("p", { children: C("footer.license", {
        license: /* @__PURE__ */ e("a", { href: "https://github.com/etalab/licence-ouverte/blob/master/LO.md", target: "_blank", rel: "noopener external", title: C("links.newWindow", {
          title: "licence etalab-2.0"
        }), children: C("footer.licenseEtalab") })
      }) }) || b })
    ] })
  ] }) });
}, Z = {
  responsive: "lasuite-gaufre-btn--responsive",
  small: "lasuite-gaufre-btn--small"
}, R = ({
  variant: r
}) => {
  const {
    t
  } = f(), l = r ? Z[r] : "";
  return /* @__PURE__ */ e("button", { type: "button", className: `lasuite-gaufre-btn ${l} lasuite-gaufre-btn--vanilla js-lasuite-gaufre-btn`, title: t("gaufre.label"), children: t("gaufre.label") });
}, $ = ({
  entity: r,
  serviceName: t,
  logo: l,
  homepageUrl: n = "/",
  showServiceName: a = !0,
  actions: o
}) => {
  const {
    t: s
  } = f();
  return /* @__PURE__ */ e("header", { role: "banner", className: "fr-header lasuite-header", children: /* @__PURE__ */ e("div", { className: "fr-header__body", children: /* @__PURE__ */ e("div", { className: "fr-container lasuite-container", children: /* @__PURE__ */ i("div", { className: "fr-header__body-row", children: [
    /* @__PURE__ */ i("div", { className: "fr-header__brand lasuite-header__brand fr-enlarge-link", children: [
      /* @__PURE__ */ e("div", { className: "fr-header__brand-top lasuite-header__brand-top", children: /* @__PURE__ */ e("div", { className: "fr-header__logo", children: /* @__PURE__ */ e("p", { className: "fr-logo", children: r }) }) }),
      /* @__PURE__ */ e("div", { className: "fr-header__service lasuite-header__service", children: /* @__PURE__ */ i("a", { className: "lasuite-header__service-link", href: n, title: s("header.homepageLinkTitle", {
        serviceName: t
      }), "aria-label": s("header.homepageLinkTitle", {
        serviceName: t
      }), children: [
        typeof l == "string" ? /* @__PURE__ */ e("img", { className: "lasuite-header__service-logo fr-responsive-img", src: l, alt: a ? "" : t }) : l,
        a && /* @__PURE__ */ e("p", { className: "fr-header__service-title lasuite-header__service-title", children: t })
      ] }) })
    ] }),
    typeof o > "u" ? /* @__PURE__ */ e("div", { className: "fr-header__tools", children: /* @__PURE__ */ e("div", { className: "fr-header__tools-links lasuite-header__tools-links", "data-fr-js-header-links": "true", children: /* @__PURE__ */ e(R, {}) }) }) : o
  ] }) }) }) });
}, j = ({
  tagline: r,
  lasuiteApiUrl: t,
  serviceId: l,
  description: n,
  children: a
}) => {
  const o = typeof r == "string" ? /* @__PURE__ */ e(u, { children: r.replace(/<br\/>/g, "<br>").replace(/<br \/>/g, "<br>").split("<br>").map((s) => s.split(/(\*\*.*?\*\*)/g).map((d, c) => d.startsWith("**") && d.endsWith("**") ? /* @__PURE__ */ e("strong", { className: "lasuite-homepage__tagline-strong", children: d.slice(2, -2) }, c) : /* @__PURE__ */ e(_, { children: d }, c))).map((s, d, c) => /* @__PURE__ */ i(_, { children: [
    s,
    d !== c.length - 1 ? /* @__PURE__ */ e("br", {}) : null
  ] }, d)) }) : r;
  return /* @__PURE__ */ i("div", { className: "lasuite-homepage__wrapper", children: [
    /* @__PURE__ */ e("div", { className: "fr-container fr-p-0 lasuite-container", children: /* @__PURE__ */ e("div", { className: "lasuite-homepage__content", children: /* @__PURE__ */ e("div", { className: "fr-container--fluid", children: /* @__PURE__ */ i("div", { className: "fr-grid-row", children: [
      /* @__PURE__ */ i("div", { className: "lasuite-homepage__main-col", children: [
        /* @__PURE__ */ e("div", { className: "lasuite-homepage__tagline-container", children: /* @__PURE__ */ e("h1", { className: "lasuite-homepage__tagline", children: o }) }),
        n ? /* @__PURE__ */ e("div", { className: "lasuite-homepage__desc-container", children: n }) : null
      ] }),
      /* @__PURE__ */ e("div", { className: "lasuite-homepage__secondary-col", children: /* @__PURE__ */ e("div", { className: "lasuite-homepage__form-container", children: /* @__PURE__ */ e("div", { className: "lasuite-homepage__form", children: a }) }) })
    ] }) }) }) }),
    !!t && /* @__PURE__ */ i("picture", { className: "lasuite-homepage__bg", children: [
      /* @__PURE__ */ e("source", { srcSet: `${t}/api/backgrounds/v1/${l || "default"}.avif`, type: "image/avif" }),
      /* @__PURE__ */ e("img", { src: `${t}/api/backgrounds/v1/${l || "default"}.jpg`, alt: "", width: "1920", height: "1200" })
    ] })
  ] });
}, V = ({
  lasuiteApiUrl: r,
  entity: t,
  tagline: l,
  serviceName: n,
  serviceId: a,
  logo: o,
  homepageUrl: s,
  headerOptions: d,
  footerOptions: c,
  description: m,
  children: p
}) => /* @__PURE__ */ i("div", { className: "lasuite lasuite-homepage", children: [
  /* @__PURE__ */ e($, { entity: t, serviceName: n, logo: o, homepageUrl: s, ...d }),
  /* @__PURE__ */ e(j, { serviceName: n, serviceId: a, tagline: l, description: m, lasuiteApiUrl: r, children: p }),
  /* @__PURE__ */ e(E, { entity: t, serviceName: n, homepageUrl: s, ...c })
] }), w = ({
  url: r
}) => {
  const {
    t
  } = f();
  return /* @__PURE__ */ i("div", { children: [
    /* @__PURE__ */ e("a", { className: "fr-btn fr-mb-3w lasuite-btn lasuite-connect", href: r, children: /* @__PURE__ */ i("span", { className: "lasuite-connect__inner", children: [
      /* @__PURE__ */ i("svg", { className: "lasuite-connect__icon", width: "62", height: "67", viewBox: "0 0 62 67", fill: "none", children: [
        /* @__PURE__ */ e("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M27.5676 2.74562C29.8464 1.45719 32.6401 1.45719 34.9133 2.74562C42.0743 6.80448 49.2355 10.8855 56.3741 14.9886C58.6417 16.2881 60.0415 18.677 60.0471 21.265C60.0695 29.4214 60.0695 37.5889 60.0471 45.7453C60.0415 48.3332 58.6417 50.7275 56.3741 52.027C49.2355 56.1246 42.0743 60.2055 34.9133 64.2643C32.6401 65.5528 29.8464 65.5528 27.5676 64.2643C20.4065 60.2055 13.2454 56.1246 6.10674 52.027C3.83916 50.7275 2.43939 48.3332 2.43379 45.7453C2.41139 37.5889 2.41139 29.4214 2.43379 21.265C2.43939 18.677 3.83916 16.2881 6.10674 14.9886C13.2454 10.8855 20.4065 6.80448 27.5676 2.74562Z", fill: "white" }),
        /* @__PURE__ */ e("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.36193 37.526C9.35768 32.9763 9.36204 28.4266 9.37479 23.8769C9.37904 22.1225 10.3267 20.5023 11.865 19.6209C17.4831 16.3975 23.114 13.1867 28.7534 9.99265C30.2917 9.11964 32.187 9.11964 33.7253 9.99265C39.3647 13.1867 44.9997 16.3975 50.6178 19.6209C52.1519 20.5023 53.0997 22.1225 53.1039 23.8769C53.1252 30.2943 53.1252 36.7202 53.1039 43.1377C53.0997 44.8921 52.1519 46.512 50.6178 47.3934C46.3086 49.8656 41.9911 52.3336 37.6692 54.7889C37.4992 54.7091 37.3121 54.6253 37.1081 54.5329C35.6037 53.874 33.4407 53.2107 33.3514 53.1225C33.0242 52.8035 32.8201 51.4774 33.2834 49.9329C33.4066 49.5257 33.5767 49.1102 33.8019 48.6989C33.8189 48.6653 33.836 48.6358 33.853 48.6022C33.8657 48.5854 33.8741 48.5688 33.8826 48.552C34.0441 48.2834 34.2226 48.0231 34.4223 47.7755C34.4393 47.7545 34.4607 47.7292 34.4819 47.7082C34.5074 47.6705 34.537 47.6369 34.5668 47.6033C34.6135 47.5487 34.6646 47.4943 34.7156 47.4398C34.7198 47.4356 34.7198 47.4356 34.7241 47.4314C34.9663 47.1753 35.2425 46.9318 35.5485 46.7094C35.8247 46.5751 36.1647 46.5078 36.5047 46.4407C37.6648 46.4407 38.8249 46.7765 39.9851 46.9108C40.1211 46.9108 40.2571 46.9779 40.3931 47.0451C40.8053 47.1164 41.2814 47.1165 41.6893 46.978C42.1695 46.8437 42.7134 46.5752 42.9173 45.9708C43.0831 45.4797 43.2616 44.9592 42.9854 44.485C42.5774 43.8806 43.3976 43.679 43.6695 43.2719C43.8735 42.9361 43.5336 42.7346 43.4656 42.3989C43.3976 42.2604 43.1256 42.3318 42.9854 42.1261C43.4656 41.9246 44.2135 41.5217 43.8735 40.9131C43.6695 40.5773 43.3296 40.04 43.7376 39.7C44.2136 39.4314 44.9658 39.4987 45.1698 39.0286C45.5098 38.2186 44.7617 37.547 44.3495 36.8713C44.1455 36.4683 43.8737 36.1998 43.6017 35.7927C43.3297 35.3226 42.9855 34.9154 42.8495 34.3782C42.6455 33.8409 42.9173 33.3667 42.9173 32.8294C42.9853 31.8179 42.7135 30.8064 42.4415 29.7949C42.2376 29.3248 42.1694 28.7833 41.9612 28.3132C41.8974 28.0446 41.8295 27.7761 41.6213 27.5033C41.5533 27.369 41.5533 27.1675 41.6213 27.0331C41.8975 26.8317 42.1696 26.6302 42.4415 26.3616C42.6455 26.0216 42.5095 25.5514 42.1695 25.35C41.6893 25.1443 41.7573 25.82 41.4173 25.9543H41.2133C41.1453 25.7529 41.2813 25.6857 41.4173 25.5514C41.4173 25.4843 41.4172 25.35 41.3492 25.35C41.0773 25.35 40.8053 25.2829 40.7373 25.1444C40.0531 24.2043 39.097 23.7299 38.0771 23.327C38.3491 23.3942 38.621 23.4613 38.893 23.4613C39.3732 23.5284 39.9172 23.5285 40.3252 23.327C40.6694 23.1927 40.7374 22.6554 40.8734 22.3154C41.0094 22.0468 40.8054 21.6439 40.6695 21.4424C40.355 20.9429 39.8661 20.6198 39.3647 20.3638C39.1097 20.2295 38.7018 20.0154 38.3873 19.8476C38.3066 19.8056 38.2429 19.7719 38.1919 19.7467C38.1876 19.7425 38.1791 19.7385 38.1748 19.7385C37.6054 19.4237 34.2608 18.517 30.9716 18.5128C27.6866 18.5128 23.9851 19.8099 23.9851 19.8099H23.9895C23.6495 19.9274 23.1267 20.1204 22.5785 20.3638C21.924 20.6534 21.0146 21.0521 20.4706 21.7111C19.9267 22.3826 19.3786 23.0583 19.1746 23.8642C18.2864 24.4056 17.7423 25.2115 17.2664 26.0216C16.6502 27.1674 15.7663 28.1789 15.8981 29.459C16.0383 30.5377 16.3102 31.5492 16.5142 32.695C16.5822 33.0979 16.6502 33.4337 16.7862 33.8408C16.9222 34.2437 16.7862 34.7139 16.9902 35.0539C17.1304 35.2553 17.0624 35.5239 17.3344 35.6582V35.9269C17.4024 35.994 17.4024 36.0611 17.5384 36.0611V36.3339C18.0824 37.0054 18.7665 37.6141 19.1065 38.3528C19.2425 38.7599 18.4265 38.5543 18.0823 38.42C17.4023 38.0842 16.9903 37.547 16.4463 37.0727C16.4463 37.0727 16.3782 37.1398 16.3782 37.2069C16.6502 37.6812 17.6744 38.2858 17.1304 38.6257C16.8542 38.76 16.5141 38.4199 16.2421 38.6928C16.1741 38.8271 16.2421 38.9614 16.2421 39.0957C15.8342 38.827 15.4221 38.9615 15.0141 38.8272C14.7421 38.76 14.674 38.2185 14.3298 38.2185C13.4458 38.0171 12.6258 37.8155 11.7376 37.7484C10.9302 37.6603 10.1524 37.5386 9.36193 37.526ZM18.5328 51.2129C17.5213 50.6337 16.51 50.0587 15.5028 49.4795C15.677 49.4669 15.8512 49.4459 16.0381 49.4039C16.4589 49.3116 16.8541 49.0681 17.2664 48.9338V49.0682C18.2863 48.6653 19.0385 47.788 20.0627 47.4523C20.1307 47.4523 20.2666 47.5866 20.4026 47.5195C21.0188 46.9781 21.6988 46.3736 22.587 46.5079C22.587 46.5751 22.587 46.6421 22.655 46.6421C22.672 46.6421 22.689 46.6421 22.7017 46.6421C22.4595 46.8226 22.2174 47.0032 21.9709 47.1795C21.9071 47.2508 21.9709 47.318 22.0431 47.318C22.3831 47.1795 22.5871 46.9109 22.9271 46.7766C22.8591 46.8437 22.8589 46.9779 22.7909 47.0451C22.553 47.2087 22.3066 47.4062 22.0516 47.6328C21.2102 48.3421 20.5003 49.1186 19.7736 49.9244H19.7821C19.3954 50.34 19.0002 50.7512 18.6135 51.1332C18.588 51.1584 18.5625 51.1835 18.5328 51.2129ZM13.9729 48.6065C13.4289 48.2917 12.885 47.981 12.3411 47.6662C13.6967 47.5361 15.0948 47.5782 16.3782 46.9108C17.4704 46.3736 18.4946 45.6307 19.3785 44.6905C19.3785 44.6905 19.4464 44.7576 19.4464 44.8247C19.2424 45.4963 18.8345 45.9707 18.2862 46.3737C17.8783 46.5751 17.6063 46.9107 17.2664 47.0451C17.0624 47.1794 16.8543 47.318 16.6503 47.4523C15.7366 47.7671 14.7931 48.1952 13.9729 48.6065ZM12.1966 47.5865C12.0861 47.5235 11.9755 47.4564 11.865 47.3934C10.3267 46.512 9.37904 44.8921 9.37479 43.1377C9.37054 41.9709 9.37053 40.7998 9.36628 39.633C10.1227 39.7589 10.8663 39.9436 11.6015 40.1745C12.2177 40.3759 12.7618 40.6445 13.3057 40.9803C13.582 41.1859 13.7179 41.3874 13.9899 41.5217C14.3299 41.7232 14.8101 41.7231 15.15 41.5887H15.4901C16.5143 41.3201 17.6063 41.0516 18.2862 40.3087C18.2862 40.3759 18.3585 40.3759 18.4265 40.3759C18.2183 40.9132 18.2184 41.5216 17.8104 41.9917C17.8104 42.0588 17.7423 42.1932 17.8783 42.2603H18.0144C17.9464 42.2603 17.8783 42.2603 17.8783 42.3317C17.8783 42.466 18.0823 42.3318 18.1503 42.4661C17.8104 42.5332 17.4703 42.6004 17.2664 42.869C17.2664 42.9362 17.4023 42.936 17.4703 42.936C17.3344 43.0703 17.1304 43.0034 17.0624 43.1377C17.0624 43.1377 17.1303 43.2047 17.1983 43.2047C17.1303 43.2047 17.0624 43.2048 17.0624 43.2719V43.4775C16.8542 43.4775 16.7863 43.6118 16.6503 43.6789C16.9223 43.8804 17.1305 43.6789 17.4025 43.6789C16.6503 43.9475 16.0381 44.3505 15.2859 44.552C15.15 44.552 15.286 44.7577 15.15 44.7577C15.354 44.892 15.4901 44.6905 15.6941 44.6905C14.7422 45.2277 13.7858 45.6979 12.7617 46.3064C12.7617 46.3064 12.6258 46.4408 12.6258 46.5751H12.3537C12.2177 46.6423 12.2857 46.8437 12.1497 46.978C12.4897 47.1795 12.8978 46.7094 13.1018 46.978C13.1698 46.978 12.9657 47.0451 12.8297 47.0451C12.7617 47.0451 12.7618 47.1795 12.6938 47.1795H12.4898C12.3538 47.318 12.2178 47.385 12.2178 47.5865C12.2093 47.5865 12.2051 47.5865 12.1966 47.5865ZM9.36628 38.571C9.36628 38.4913 9.36628 38.4115 9.36628 38.3276C10.1057 38.1723 10.8197 38.0339 11.5337 38.0843C11.7376 38.0843 12.0138 38.0171 12.2178 38.0843C11.2106 38.0297 10.3012 38.2898 9.36628 38.571ZM40.4229 33.3162C40.0192 33.2154 39.6708 33.3162 39.2628 33.3162C38.7146 33.4505 38.2385 33.5176 37.7625 33.7191C38.1705 33.4505 38.5786 33.182 39.0588 33.0477C39.3988 32.9805 39.7386 32.779 40.0828 32.779C40.4908 32.7119 40.8989 32.5733 41.2388 32.7118C41.5831 32.8461 42.127 32.8462 42.195 33.0477C42.331 33.4506 41.9911 33.8577 41.5831 34.1263C41.5151 34.2606 41.7871 34.3277 41.7871 34.462C41.7191 34.5963 41.515 34.6634 41.3748 34.6634C41.2388 34.7306 41.1028 34.9322 40.9668 35.0707C41.1028 35.0707 40.9667 35.2721 41.1027 35.2721C40.8307 35.6079 41.2389 36.2794 40.8309 36.4179C40.3549 36.5522 39.8067 36.5522 39.2628 36.4179C39.5348 36.3508 39.8746 36.4852 40.0828 36.2124V35.9437C40.0828 35.8765 40.0106 35.8765 39.9426 35.8765C39.8746 35.9436 39.8067 35.9437 39.8067 35.9437C39.8067 35.8094 39.6707 35.675 39.6027 35.675C39.1947 35.7422 38.8504 35.5407 38.5784 35.2721C38.7824 35.205 38.9865 35.1377 39.1947 35.2049C39.3987 35.2049 39.3306 34.865 39.5346 34.7307H39.7386C40.1466 34.1934 40.9667 34.0591 41.1027 33.5176C41.1027 33.3833 40.6949 33.3833 40.4229 33.3162Z", fill: "#000091" }),
        /* @__PURE__ */ e("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M26.6766 1.20663C29.5041 -0.397002 32.9811 -0.397002 35.8085 1.20663C42.9752 5.26549 50.1363 9.34626 57.2806 13.4494C60.0969 15.064 61.8381 18.0391 61.8437 21.2575C61.8661 29.4194 61.8661 37.5869 61.8437 45.7488C61.8381 48.9672 60.0969 51.9421 57.2806 53.5623C50.1363 57.6599 42.9752 61.741 35.8085 65.8053C32.9811 67.4034 29.5041 67.4034 26.6766 65.8053C19.5099 61.741 12.3432 57.6599 5.20451 53.5623C2.38263 51.9421 0.647135 48.9672 0.635938 45.7488C0.613542 37.5869 0.613542 29.4194 0.635938 21.2575C0.647135 18.0391 2.38263 15.064 5.20451 13.4494C12.3432 9.34626 19.5099 5.26549 26.6766 1.20663ZM28.4626 4.28662C21.3016 8.33994 14.1462 12.421 7.00749 16.5185C5.29421 17.5028 4.23603 19.311 4.23043 21.2685C4.20803 29.4249 4.20803 37.5869 4.23043 45.7378C4.23603 47.6953 5.29421 49.5035 7.00749 50.4878C14.1462 54.5853 21.3016 58.6665 28.4626 62.7254C30.1815 63.6986 32.2979 63.6986 34.0168 62.7254C41.1778 58.6665 48.3335 54.5853 55.4722 50.4878C57.1854 49.5035 58.2436 47.6953 58.2492 45.7378C58.2716 37.5869 58.2716 29.4249 58.2492 21.2685C58.2436 19.311 57.1854 17.5028 55.4722 16.5185C48.3335 12.421 41.1778 8.33994 34.0168 4.28662C32.2979 3.30785 30.1815 3.30785 28.4626 4.28662Z", fill: "#000091" })
      ] }),
      /* @__PURE__ */ e("span", { className: "lasuite-connect__text", children: t("proconnect.loginWithProconnect", {
        loginWith: /* @__PURE__ */ e("span", { className: "lasuite-connect__login", children: t("proconnect.loginWith") }),
        proconnect: /* @__PURE__ */ e("span", { className: "lasuite-connect__brand", children: "ProConnect" })
      }) })
    ] }) }),
    /* @__PURE__ */ e("p", { className: "fr-mb-0", children: /* @__PURE__ */ e("a", { className: "fr-link lasuite-link fr-icon-arrow-right-line fr-link--icon-left", href: "https://proconnect.gouv.fr/", children: t("proconnect.help") }) })
  ] });
}, q = (r) => {
  const {
    t
  } = f();
  return /* @__PURE__ */ i(u, { children: [
    /* @__PURE__ */ e("h2", { className: "fr-h4 fr-mb-8w lasuite-text-center", children: t("email.title", {
      linebreak: /* @__PURE__ */ e("br", { role: "presentation", className: "fr-hidden-sm" })
    }) }),
    /* @__PURE__ */ e("div", { className: "lasuite-input-width", children: /* @__PURE__ */ e(k, { ...r }) })
  ] });
}, B = ({
  proconnectUrl: r,
  emailForm: t = {}
}) => {
  const {
    t: l
  } = f();
  return /* @__PURE__ */ i(u, { children: [
    /* @__PURE__ */ e("h2", { className: "fr-h4 fr-mb-4w fr-mb-md-8w lasuite-text-center", children: l("email.title", {
      linebreak: /* @__PURE__ */ e("br", { role: "presentation", className: "fr-hidden-sm" })
    }) }),
    /* @__PURE__ */ i("div", { className: "lasuite-input-width", children: [
      /* @__PURE__ */ e(k, { ...t }),
      /* @__PURE__ */ e("p", { className: "fr-hr-or lasuite-hr-or fr-mb-6w", children: l("proconnect.or") }),
      /* @__PURE__ */ e("h2", { className: "fr-sr-only", children: l("proconnect.title") }),
      /* @__PURE__ */ e(w, { url: r })
    ] })
  ] });
}, Q = (r) => {
  const {
    t
  } = f();
  return /* @__PURE__ */ i(u, { children: [
    /* @__PURE__ */ e("h2", { className: "fr-h4 fr-mb-4w fr-mb-md-8w lasuite-text-center", children: t("proconnect.title") }),
    /* @__PURE__ */ e("div", { className: "lasuite-input-width", children: /* @__PURE__ */ e(w, { ...r }) })
  ] });
};
export {
  k as EmailForm,
  E as Footer,
  R as Gaufre,
  $ as Header,
  V as Homepage,
  j as HomepageContent,
  q as HomepageEmail,
  B as HomepageEmailOrProconnect,
  Q as HomepageProconnect,
  O as LaSuiteTranslationsProvider,
  w as ProconnectButton,
  v as frTranslations,
  f as useTranslate
};
