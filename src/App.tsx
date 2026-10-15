import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

type IconName = "arrow" | "check" | "phone" | "mail" | "menu" | "close" | "spark" | "plus" | "leaf" | "clock";

type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  intro: string;
  description: string;
  audience: string;
  bullets: string[];
};

export const phoneDisplay = "+48 696 777 270";
export const phoneHref = "tel:+48696777270";
export const email = "Narozna.monika@gmail.com";

export const services: Service[] = [
  {
    slug: "neurologopedia-ortodontyczna-kliniczna",
    number: "01",
    title: "Neurologopedia ortodontyczna i kliniczna",
    shortTitle: "Neurologopedia ortodontyczna i kliniczna",
    intro: "Wsparcie funkcji związanych z mową, oddechem i pracą aparatu oralnego.",
    description: "To obszar pracy, w którym ważne jest spojrzenie na komunikację i funkcje jamy ustnej w szerszym kontekście. Zakres spotkań dobierany jest do zgłaszanej potrzeby i ustaleń z pierwszej rozmowy.",
    audience: "Dla osób, które chcą przyjrzeć się funkcjom oralnym, artykulacji lub komunikacji.",
    bullets: ["ocena potrzeb i kierunku pracy", "ćwiczenia dopasowane do celu spotkań", "spokojne tempo i jasne zalecenia"],
  },
  {
    slug: "logopedia",
    number: "02",
    title: "Logopedia",
    shortTitle: "Logopedia",
    intro: "Uważna praca nad komunikacją, artykulacją i codziennym komfortem mówienia.",
    description: "Logopedia może obejmować różne obszary komunikacji. Podczas kontaktu najważniejsze jest nazwanie potrzeby i dobranie kolejnych kroków do osoby, jej możliwości oraz celu, z którym przychodzi.",
    audience: "Dla dzieci, młodzieży i dorosłych, którzy potrzebują wsparcia logopedycznego.",
    bullets: ["rozmowa o aktualnej potrzebie", "indywidualnie dobrane zadania", "wskazówki do spokojnej pracy między spotkaniami"],
  },
  {
    slug: "fizjoterapia",
    number: "03",
    title: "Fizjoterapia",
    shortTitle: "Fizjoterapia",
    intro: "Praca z ruchem i ciałem oparta na poznaniu Twojej sytuacji.",
    description: "Fizjoterapia to uważne przyglądanie się temu, jak ciało funkcjonuje w ruchu i codzienności. Plan spotkań powstaje w oparciu o rozmowę oraz aktualne potrzeby.",
    audience: "Dla osób, które chcą lepiej rozumieć swoje ciało i pracować z ruchem.",
    bullets: ["rozmowa o funkcjonowaniu w codzienności", "praca z ruchem w bezpiecznym zakresie", "plan dalszych kroków ustalany indywidualnie"],
  },
  {
    slug: "osteopatia",
    number: "04",
    title: "Osteopatia",
    shortTitle: "Osteopatia",
    intro: "Holistyczne spojrzenie na ciało i jego wzajemne zależności.",
    description: "Osteopatia pozwala spojrzeć na ciało jako na połączony system. Podczas spotkania ważne są Twoje odczucia, historia i sposób funkcjonowania, a dalszy kierunek jest ustalany wspólnie.",
    audience: "Dla osób, które szukają spokojnego, całościowego spojrzenia na swoje ciało.",
    bullets: ["uważna rozmowa i obserwacja", "praca manualna dopasowana do sytuacji", "jasne omówienie dalszego kierunku"],
  },
  {
    slug: "uroginekologia",
    number: "05",
    title: "Uroginekologia",
    shortTitle: "Uroginekologia",
    intro: "Wsparcie w obszarze dna miednicy, oddechu i codziennego ruchu.",
    description: "W uroginekologii ważna jest rozmowa bez skrępowania i zrozumiałe wyjaśnienie kolejnych kroków. Zakres spotkania jest dobierany do Twojej sytuacji i pytań.",
    audience: "Dla kobiet, które chcą świadomie przyjrzeć się obszarowi dna miednicy.",
    bullets: ["bezpieczna przestrzeń do rozmowy", "edukacja i praca z ruchem", "plan dopasowany do indywidualnej sytuacji"],
  },
  {
    slug: "treningi-medyczne",
    number: "06",
    title: "Treningi medyczne",
    shortTitle: "Treningi medyczne",
    intro: "Ruch dopasowany do możliwości, celu i aktualnej kondycji.",
    description: "Trening medyczny łączy świadomy ruch z uważnością na potrzeby organizmu. Ćwiczenia są dobierane tak, aby można było rozumieć ich cel i wykonywać je w swoim tempie.",
    audience: "Dla osób, które chcą włączyć uporządkowany ruch do swojej codzienności.",
    bullets: ["rozpoznanie celu treningowego", "stopniowanie intensywności", "ćwiczenia do wykorzystania w praktyce"],
  },
  {
    slug: "neurologopedia-pediatryczna",
    number: "07",
    title: "Neurologopedia pediatryczna",
    shortTitle: "Neurologopedia pediatryczna",
    intro: "Spokojne wsparcie rozwoju komunikacji dziecka i jego bliskich.",
    description: "Praca z dzieckiem zaczyna się od uważnej obserwacji i rozmowy z opiekunem. W zależności od potrzeb spotkania mogą koncentrować się na komunikacji, funkcjach oralnych i codziennym wsparciu dziecka.",
    audience: "Dla dzieci oraz rodziców, którzy potrzebują neurologopedycznego spojrzenia.",
    bullets: ["rozmowa z rodzicem i poznanie potrzeb", "forma pracy dostosowana do dziecka", "proste wskazówki do codziennych sytuacji"],
  },
  {
    slug: "biofeedback-uroginekologiczny",
    number: "08",
    title: "Biofeedback uroginekologiczny",
    shortTitle: "Biofeedback uroginekologiczny",
    intro: "Świadoma praca z sygnałami ciała w obszarze dna miednicy.",
    description: "Biofeedback uroginekologiczny pomaga lepiej zauważać reakcje organizmu podczas pracy. Zakres i sposób wykorzystania metody są omawiane indywidualnie podczas kontaktu.",
    audience: "Dla kobiet, które chcą uważniej pracować z obszarem dna miednicy.",
    bullets: ["wyjaśnienie metody i jej celu", "praca w spokojnym, zrozumiałym rytmie", "dobór dalszych kroków do potrzeb"],
  },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Neurologopedia i fizjoterapia - Monika Narożna",
    description: "Monika Narożna wspiera w obszarze neurologopedii, logopedii, fizjoterapii, osteopatii i uroginekologii. Poznaj ofertę i skontaktuj się.",
  },
  "/uslugi": {
    title: "Usługi terapeutyczne - Monika Narożna",
    description: "Poznaj usługi Moniki Narożnej: neurologopedię, logopedię, fizjoterapię, osteopatię, uroginekologię, treningi medyczne i biofeedback.",
  },
  "/o-mnie": {
    title: "O mnie i podejściu do terapii - Monika Narożna",
    description: "Sprawdź, jak wygląda pierwszy kontakt, jak porządkujemy potrzeby i jak może wyglądać dalszy kierunek współpracy z Moniką Narożną.",
  },
  "/kontakt": {
    title: "Kontakt - Monika Narożna",
    description: "Skontaktuj się z Moniką Narożną telefonicznie, mailowo lub przez formularz i opowiedz, czego potrzebujesz.",
  },
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
  if (name === "check") return <svg {...common}><path d="m5 12 4.2 4.2L19 6.5" /></svg>;
  if (name === "phone") return <svg {...common}><path d="M6.6 3.5 9 3l2 4.8-2 1.4c1 2.1 2.7 3.8 4.8 4.8l1.4-2 4.8 2-.5 2.4c-.3 1.4-1.5 2.3-2.9 2.2C10.2 18 6 13.8 5.4 8.4 5.2 7 5.2 5.8 6.6 3.5Z" /></svg>;
  if (name === "mail") return <svg {...common}><rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === "menu") return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
  if (name === "close") return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
  if (name === "spark") return <svg {...common}><path d="m12 3 1.4 6.1L19 12l-5.6 2.9L12 21l-1.4-6.1L5 12l5.6-2.9L12 3Z" /></svg>;
  if (name === "plus") return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
  if (name === "leaf") return <svg {...common}><path d="M20 4C11 4 5 8.2 5 14c0 3 2.3 5 5 5 5.8 0 10-6 10-15Z" /><path d="M4 20c3-5 7-8 12-10" /></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}

function Seo() {
  const location = useLocation();
  const service = services.find((item) => `/uslugi/${item.slug}` === location.pathname);
  const meta = service
    ? { title: `${service.shortTitle} - Monika Narożna`, description: `${service.title}: spokojna, indywidualnie dopasowana praca z Moniką Narożną. Poznaj zakres usługi i skontaktuj się.` }
    : pageMeta[location.pathname] ?? { title: "Strona nie znaleziona - Monika Narożna", description: "Ta strona nie istnieje. Wróć do strony głównej Moniki Narożnej." };

  useEffect(() => {
    document.title = meta.title;
    document.documentElement.lang = "pl";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute("content", meta.description);
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    ogTitle?.setAttribute("content", meta.title);
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    ogDescription?.setAttribute("content", meta.description);
    const existing = document.querySelector<HTMLScriptElement>('script[data-schema="monika-narozna"]');
    existing?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schema = "monika-narozna";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Monika Narożna",
      description: meta.description,
      telephone: phoneDisplay,
      email,
      availableService: services.map((item) => ({ "@type": "MedicalProcedure", name: item.title })),
      contactPoint: { "@type": "ContactPoint", telephone: phoneDisplay, email, contactType: "customer service", availableLanguage: "Polish" },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [location.pathname, meta.description, meta.title]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  const nav = [
    { to: "/", label: "Start" },
    { to: "/uslugi", label: "Usługi" },
    { to: "/o-mnie", label: "O mnie" },
    { to: "/kontakt", label: "Kontakt" },
  ];
  return <header className="site-header">
    <div className="header-inner container">
      <Link className="brand" to="/" aria-label="Monika Narożna - strona główna">
        <img src="/logo-mark.svg" alt="" width="42" height="42" />
        <span><strong>MONIKA NAROŻNA</strong><small>terapia · ruch · komunikacja</small></span>
      </Link>
      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Główna nawigacja">
        {nav.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? "active" : ""}>{item.label}</NavLink>)}
        <a className="nav-call" href={phoneHref}><Icon name="phone" size={16} /> Zadzwoń</a>
      </nav>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
        <span className="sr-only">{open ? "Zamknij menu" : "Otwórz menu"}</span><Icon name={open ? "close" : "menu"} size={24} />
      </button>
    </div>
  </header>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand"><img src="/logo-mark.svg" alt="" width="48" height="48" /><div><strong>MONIKA NAROŻNA</strong><span>terapia · ruch · komunikacja</span></div><p>Spokojna droga do lepszego funkcjonowania zaczyna się od rozmowy.</p></div>
      <div className="footer-links"><span className="eyebrow">Nawigacja</span><Link to="/uslugi">Usługi</Link><Link to="/o-mnie">O mnie</Link><Link to="/kontakt">Kontakt</Link></div>
      <div className="footer-contact"><span className="eyebrow">Kontakt</span><a href={phoneHref}><Icon name="phone" size={17} /> {phoneDisplay}</a><a href={`mailto:${email}`}><Icon name="mail" size={17} /> {email}</a></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Monika Narożna</span><span>Informacje o lokalizacji i polityce prywatności zostaną uzupełnione.</span></div>
  </footer>;
}

function Layout() {
  return <><Seo /><ScrollToTop /><Header /><main><Outlet /></main><Footer /></>;
}

function ButtonLink({ to, children, variant = "primary" }: { to: string; children: ReactNode; variant?: "primary" | "secondary" | "text" }) {
  return <Link className={`button button-${variant}`} to={to}>{children}<Icon name="arrow" size={18} /></Link>;
}

function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? "light" : ""}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function ServiceCard({ service }: { service: Service }) {
  return <Link className="service-card" to={`/uslugi/${service.slug}`}>
    <div className="card-top"><span className="service-number">{service.number}</span><span className="circle-arrow"><Icon name="arrow" size={18} /></span></div>
    <h3>{service.title}</h3><p>{service.intro}</p><span className="read-more">Poznaj usługę <Icon name="arrow" size={15} /></span>
  </Link>;
}

const faqs = [
  ["Jak wygląda pierwszy kontakt?", "Możesz zadzwonić, napisać e-mail lub skorzystać z formularza. W krótkiej rozmowie opowiesz, czego potrzebujesz, a dalszy kierunek ustalimy indywidualnie."],
  ["Czy można zapytać o kilka usług jednocześnie?", "Tak. Jeśli nie wiesz, który obszar będzie właściwy, opisz swoją sytuację. Wspólnie uporządkujemy temat i wybierzemy dobry punkt startu."],
  ["Czy oferta obejmuje pracę z dziećmi?", "Tak, oferta obejmuje neurologopedię pediatryczną. Zakres spotkań jest dopasowany do dziecka i rozmowy z jego opiekunem."],
  ["Czy uroginekologia jest dla mnie?", "Możesz napisać lub zadzwonić i opowiedzieć, z czym przychodzisz. Podczas kontaktu wyjaśnimy, czy obszar uroginekologii odpowiada Twojej potrzebie."],
  ["Czy otrzymam ćwiczenia do pracy w domu?", "To zależy od celu i ustaleń dotyczących Twojej sytuacji. Jeśli domowa praca będzie częścią planu, omówimy ją w zrozumiały sposób."],
];

function HomePage() {
  return <>
    <section className="hero container">
      <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> Terapia · ruch · komunikacja</span><h1>Neurologopedia, fizjoterapia i uroginekologia - <em>spokojnie, po Twojej stronie.</em></h1><p className="hero-lead">Różne potrzeby nie wymagają jednej gotowej odpowiedzi. Zaczynamy od rozmowy, uważności i dobrania kierunku, który ma sens dla Ciebie.</p><div className="hero-actions"><ButtonLink to="/uslugi">Poznaj usługi</ButtonLink><ButtonLink to="/kontakt" variant="secondary">Porozmawiajmy</ButtonLink></div><div className="hero-proof"><span><b>08</b> obszarów wsparcia</span><i /><span><b>01</b> indywidualny kierunek</span></div><div className="hero-contact"><span>Najprostszy pierwszy krok:</span><a href={phoneHref}>{phoneDisplay}</a></div></div>
      <div className="hero-visual"><div className="hero-art" aria-label="Abstrakcyjny znak Moniki Narożnej" role="img"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-grid" /><div className="art-mark"><span>M</span><span>N</span><i /></div><div className="art-note note-one">uważność</div><div className="art-note note-two">ruch</div><div className="art-note note-three">kontakt</div></div><div className="floating-card floating-card-top"><Icon name="spark" size={18} /><span><b>Holistyczne podejście</b><small>mowa · ciało · ruch</small></span></div><div className="floating-card floating-card-bottom"><Icon name="leaf" size={18} /><span><b>W Twoim tempie</b><small>spokojnie i konkretnie</small></span></div></div>
    </section>
    <section className="intro-strip"><div className="container intro-grid"><div><span className="eyebrow">Dobrze zacząć od</span><strong>jednej konkretnej rozmowy.</strong></div><p>Bez presji i bez gotowych scenariuszy. Opowiesz, co jest dla Ciebie ważne, a ja pomogę uporządkować możliwe kolejne kroki.</p><ButtonLink to="/kontakt" variant="text">Napisz lub zadzwoń</ButtonLink></div></section>
    <section className="section container" id="uslugi"><SectionHeading eyebrow="Obszary wsparcia" title="Jedno miejsce, różne potrzeby." text="Wybierz obszar, który jest Ci najbliższy. Jeśli nie wiesz, od czego zacząć, napisz - wspólnie znajdziemy właściwy kierunek." /><div className="service-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div><div className="section-end"><ButtonLink to="/uslugi" variant="secondary">Zobacz pełną ofertę</ButtonLink></div></section>
    <section className="dark-section"><div className="container approach-grid"><div><SectionHeading light eyebrow="Podejście" title="Terapia to nie wyścig. To uważne spotkanie." text="Ważne jest dla mnie, żeby rozumieć, z czym przychodzisz, i żeby kolejne kroki były dla Ciebie jasne. Każdy obszar pracy ma swoją specyfikę, ale punkt wyjścia pozostaje ten sam: rozmowa i zaufanie." /><ButtonLink to="/o-mnie" variant="secondary">Poznaj moje podejście</ButtonLink></div><div className="approach-card"><div className="approach-mark"><Icon name="leaf" size={25} /></div><span className="eyebrow">W centrum</span><h3>Twoja codzienność</h3><p>Nie tylko nazwa usługi. Także to, jak się czujesz, jak się poruszasz, komunikujesz i czego potrzebujesz w zwykłym dniu.</p><div className="line-list"><span><Icon name="check" size={17} /> słuchanie bez pośpiechu</span><span><Icon name="check" size={17} /> jasny język i konkret</span><span><Icon name="check" size={17} /> kierunek dopasowany do sytuacji</span></div></div></div></section>
    <section className="section container process-section"><SectionHeading eyebrow="Jak zacząć" title="Cztery kroki do pierwszego spotkania." text="Nie musisz wiedzieć wszystkiego przed kontaktem. Wystarczy, że opowiesz, co skłoniło Cię do napisania." /><div className="process-grid">{[["01", "Kontakt", "Zadzwoń, napisz e-mail lub zostaw wiadomość przez formularz."], ["02", "Rozmowa", "Opowiesz o swojej sytuacji i pytaniach, z którymi przychodzisz."], ["03", "Kierunek", "Wspólnie porządkujemy temat i dobieramy właściwy obszar pracy."], ["04", "Kolejne kroki", "Ustalamy, co będzie potrzebne dalej i jak możesz zacząć." ]].map(([number, title, text]) => <div className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
    <section className="cream-band"><div className="container area-grid"><div><span className="eyebrow">Obszar działania</span><h2>Masz pytanie? Zacznijmy od kontaktu.</h2></div><div><p>Dokładne informacje o lokalizacji i formie wizyt zostaną uzupełnione. Już teraz możesz opisać swoją potrzebę telefonicznie lub mailowo.</p><ButtonLink to="/kontakt">Skontaktuj się</ButtonLink></div></div></section>
    <section className="section container faq-section"><SectionHeading eyebrow="FAQ" title="Najczęstsze pytania na start." text="Jeśli nie ma tu Twojego pytania, napisz lub zadzwoń - chętnie odpowiem." /><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><Icon name="plus" size={20} /></summary><p>{answer}</p></details>)}</div></section>
    <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">Pierwszy krok</span><h2>Nie musisz mieć gotowych słów.</h2><p>Wystarczy wiadomość: „Chcę porozmawiać o…”. Resztę uporządkujemy razem.</p></div><ButtonLink to="/kontakt">Napisz do mnie</ButtonLink></div></section>
  </>;
}

function ServicesPage() {
  return <><section className="page-intro container"><div><span className="eyebrow">Oferta</span><h1>Usługi, które odpowiadają na różne potrzeby.</h1><p>Neurologopedia, logopedia, ruch, osteopatia i uroginekologia w jednym miejscu. Wybierz temat, który jest Ci najbliższy, albo skontaktuj się, jeśli potrzebujesz pomocy w wyborze.</p></div><div className="intro-aside"><span>08</span><small>obszarów pracy</small></div></section><section className="section container services-page-grid"><div className="service-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></section><section className="dark-section compact-dark"><div className="container split-cta"><div><span className="eyebrow">Nie wiesz, od czego zacząć?</span><h2>Opowiedz, czego potrzebujesz.</h2></div><ButtonLink to="/kontakt" variant="secondary">Skontaktuj się</ButtonLink></div></section></>;
}

function ServicePage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundPage />;
  return <><section className="service-hero container"><div className="service-hero-copy"><Link className="back-link" to="/uslugi">← Wszystkie usługi</Link><span className="eyebrow">Usługa {service.number}</span><h1>{service.title}</h1><p>{service.intro}</p><ButtonLink to="/kontakt">Porozmawiajmy o tym</ButtonLink></div><div className="service-number-display">{service.number}<Icon name="spark" size={30} /></div></section><section className="section container detail-grid"><article className="detail-copy"><span className="eyebrow">Na czym polega</span><h2>Spokojnie, konkretnie i z uważnością na Twoją sytuację.</h2><p>{service.description}</p><p>{service.audience}</p></article><aside className="detail-card"><span className="eyebrow">Ważne na start</span><h3>Nie musisz wiedzieć, jak nazwać potrzebę.</h3><p>Opisz własnymi słowami, co skłoniło Cię do kontaktu. Pierwsza rozmowa służy temu, żeby uporządkować temat.</p><a className="inline-link" href={phoneHref}>Zadzwoń: {phoneDisplay} <Icon name="arrow" size={16} /></a></aside></section><section className="cream-band"><div className="container benefits-grid"><div><span className="eyebrow">Możliwe elementy pracy</span><h2>Każdy krok ma swój cel.</h2></div><div className="benefit-list">{service.bullets.map((bullet) => <span key={bullet}><Icon name="check" size={18} /> {bullet}</span>)}</div></div></section><section className="section container service-bottom"><SectionHeading eyebrow="Następny krok" title="Chcesz sprawdzić, czy to dobry kierunek?" text="Napisz lub zadzwoń. Opowiesz krótko o swojej sytuacji, a ja odpowiem na pierwsze pytania." /><ButtonLink to="/kontakt">Skontaktuj się</ButtonLink></section></>;
}

function AboutPage() {
  return <><section className="page-intro about-intro container"><div><span className="eyebrow">O mnie</span><h1>Uważność, wiedza i ruch - w Twoim tempie.</h1><p>Monika Narożna to przestrzeń do rozmowy o mowie, ciele i codziennym funkcjonowaniu. Bez pośpiechu szukamy punktu, od którego można zacząć.</p></div><div className="monogram-large"><span>M</span><span>N</span><i /></div></section><section className="section container about-grid"><article><span className="eyebrow">Moje podejście</span><h2>Najpierw słucham. Potem działamy.</h2><p>Każdy kontakt zaczyna się od poznania Twojej sytuacji. Nie zakładam jednego scenariusza dla wszystkich - ważne są Twoje pytania, codzienność i to, co chcesz zmienić lub lepiej zrozumieć.</p><p>Usługi łączą obszary komunikacji, ruchu i świadomej pracy z ciałem. Jeśli nie wiesz, do której usługi się zgłosić, wystarczy opisać potrzebę własnymi słowami.</p></article></section><section className="dark-section"><div className="container approach-grid about-process"><div><SectionHeading light eyebrow="Współpraca" title="Mniej domysłów, więcej jasności." text="Chcę, żeby po kontakcie było Ci łatwiej zrozumieć, co może wydarzyć się dalej." /></div><div className="line-list large"><span><b>01</b> Nazywamy potrzebę</span><span><b>02</b> Wybieramy pierwszy krok</span><span><b>03</b> Sprawdzamy, co działa dla Ciebie</span><span><b>04</b> Rozmawiamy o dalszym kierunku</span></div></div></section><section className="section container about-end"><SectionHeading eyebrow="Masz pytanie?" title="Najlepiej zapytać wprost." text="Napisz e-mail lub zadzwoń. Każdy kontakt może zacząć się od prostego pytania." /><ButtonLink to="/kontakt">Przejdź do kontaktu</ButtonLink></section></>;
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setError("Uzupełnij wymagane pola i zaznacz zgodę, aby przejść dalej.");
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = `Kontakt ze strony - ${data.get("service") || "zapytanie"}`;
    const body = `Dzień dobry,\n\nNazywam się ${data.get("name")}.\nTelefon: ${data.get("phone")}\nE-mail: ${data.get("email")}\nInteresuje mnie: ${data.get("service") || "nie wybrano"}.\n\n${data.get("message")}\n\nWysłano przez formularz na stronie Moniki Narożnej.`;
    setError("");
    setSent(true);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  if (sent) return <div className="form-success" role="status"><span className="success-icon"><Icon name="check" size={22} /></span><h3>Wiadomość jest gotowa.</h3><p>Otwieram Twoją aplikację pocztową z uzupełnioną treścią. Jeśli nie otworzy się automatycznie, napisz bezpośrednio na <a href={`mailto:${email}`}>{email}</a>.</p><button className="text-button" type="button" onClick={() => setSent(false)}>Wróć do formularza</button></div>;
  return <form className="contact-form" onSubmit={submit} noValidate><div className="form-row"><label>Imię i nazwisko <input name="name" type="text" autoComplete="name" required placeholder="Jak mam się do Ciebie zwracać?" /></label><label>Telefon <input name="phone" type="tel" autoComplete="tel" required placeholder="+48 ..." /></label></div><div className="form-row"><label>Adres e-mail <input name="email" type="email" autoComplete="email" required placeholder="ty@przyklad.pl" /></label><label>Obszar, który Cię interesuje <select name="service" defaultValue=""><option value="" disabled>Wybierz z listy</option>{services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}<option value="Nie wiem jeszcze">Nie wiem jeszcze</option></select></label></div><label>Wiadomość <textarea name="message" required placeholder="Napisz krótko, z czym się zgłaszasz."></textarea></label><label className="consent"><input type="checkbox" name="consent" required /><span>Wyrażam zgodę na kontakt w sprawie mojego zapytania. <small>W tej wersji formularz otwiera aplikację pocztową.</small></span></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary" type="submit">Przygotuj wiadomość <Icon name="arrow" size={18} /></button></form>;
}

function ContactPage() {
  return <><section className="page-intro contact-intro container"><div><span className="eyebrow">Kontakt</span><h1>Opowiedz, czego potrzebujesz.</h1><p>Wybierz wygodną formę kontaktu. Możesz zadzwonić, napisać e-mail lub skorzystać z formularza poniżej.</p></div><div className="contact-direct"><span className="eyebrow">Bezpośrednio</span><a href={phoneHref}><Icon name="phone" size={19} /> {phoneDisplay}</a><a href={`mailto:${email}`}><Icon name="mail" size={19} /> {email}</a></div></section><section className="section container contact-layout"><div className="contact-note"><span className="eyebrow">Kilka słów wystarczy</span><h2>Nie musisz znać właściwej nazwy usługi.</h2><p>Opisz swoją sytuację własnymi słowami. Jeśli będzie trzeba, wspólnie uporządkujemy temat i wybierzemy dobry punkt startu.</p><div className="contact-mini"><span><Icon name="clock" size={19} /> Odpowiedź po kontakcie</span><span><Icon name="leaf" size={19} /> Spokojna forma rozmowy</span></div></div><div className="form-shell"><ContactForm /></div></section><section className="cream-band"><div className="container area-grid"><div><span className="eyebrow">Obszar działania</span><h2>Informacje lokalizacyjne uzupełnimy w kolejnym kroku.</h2></div><div><p>Jeśli chcesz zapytać o formę wizyty, napisz lub zadzwoń. Wstępny kontakt możesz nawiązać z dowolnego miejsca w Polsce.</p><a className="inline-link" href={`mailto:${email}`}>Napisz e-mail <Icon name="arrow" size={16} /></a></div></div></section></>;
}

function NotFoundPage() {
  return <section className="not-found container"><span className="eyebrow">404</span><h1>Ta strona nie istnieje.</h1><p>Wróć do oferty albo skontaktuj się bezpośrednio.</p><ButtonLink to="/">Wróć na start</ButtonLink></section>;
}

export { AboutPage, ContactPage, HomePage, Layout, NotFoundPage, ServicePage, ServicesPage };
