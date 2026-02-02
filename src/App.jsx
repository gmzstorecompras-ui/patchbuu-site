import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { STRINGS } from "./i18n";

const X_PROFILE_URL = "https://x.com/Patchbuu"; // Cambialo si tu handle cambia

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="sectionHead">
        <h2>{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("patchbuu_lang") || "en");
  const t = useMemo(() => STRINGS[lang], [lang]);

  useEffect(() => {
    document.title = t.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.metaDesc);
    localStorage.setItem("patchbuu_lang", lang);
  }, [lang, t]);

  const toggleLang = () => setLang((p) => (p === "en" ? "es" : "en"));

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      <header className="nav">
        <div className="brand" onClick={() => scrollTo("top")} role="button" tabIndex={0}>
          <span className="dot" />
          <span className="brandName">PatchBuu</span>
          <span className="brandTag">🍬🩹</span>
        </div>

        <nav className="navLinks">
          <button onClick={() => scrollTo("proof")}>{t.nav.proof}</button>
          <button onClick={() => scrollTo("lore")}>{t.nav.lore}</button>
          <button onClick={() => scrollTo("token")}>{t.nav.token}</button>
          <button onClick={() => scrollTo("directions")}>{t.nav.directions}</button>
          <button onClick={() => scrollTo("community")}>{t.nav.community}</button>
        </nav>

        <div className="navActions">
         <button className="pill neon" onClick={toggleLang} title="Toggle language">

            {t.toggle}
          </button>
          <a className="pill primary" href={X_PROFILE_URL} target="_blank" rel="noreferrer">
            X
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroInner">
            <div className="badge">{t.hero.badge}</div>
            <h1>
              {t.hero.title} <span className="accent">{t.hero.titleAccent}</span>
            </h1>
            <p className="lead">{t.hero.subtitle}</p>

            <div className="ctaRow">
              <button className="btn primary" onClick={() => scrollTo("proof")}>
                {t.hero.ctaPrimary}
              </button>
              <button className="btn" onClick={() => scrollTo("lore")}>
                {t.hero.ctaSecondary}
              </button>
            </div>

            <div className="marquee" aria-hidden="true">
              <div className="marqueeInner">
                <span>PatchBuu • Born in 3D • Made of patches • Cute chaos • EN/ES • </span>
                <span>PatchBuu • Born in 3D • Made of patches • Cute chaos • EN/ES • </span>
              </div>
            </div>
          </div>
        </section>

        <Section id="proof" title={t.proof.title} subtitle={t.proof.subtitle}>
          <div className="grid3">
            {t.proof.cards.map((c) => (
              <div className="card" key={c.k}>
                <div className="cardK">{c.k}</div>
                <div className="cardV">{c.v}</div>
              </div>
            ))}
          </div>

          <div className="callout">
            <ul>
              {t.proof.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="lore" title={t.lore.title} subtitle={t.lore.subtitle}>
          <div className="stack">
            {t.lore.items.map((it) => (
              <div className="card" key={it.title}>
                <div className="cardTitle">{it.title}</div>
                <div className="muted">{it.text}</div>
              </div>
            ))}
          </div>

          <div className="row">
            <a className="btn primary" href={X_PROFILE_URL} target="_blank" rel="noreferrer">
              {t.lore.cta}
            </a>
          </div>
        </Section>

        <Section id="token" title={t.token.title} subtitle={t.token.subtitle}>
          <div className="table">
            {t.token.rows.map((r) => (
              <div className="tr" key={r.k}>
                <div className="tdk">{r.k}</div>
                <div className="tdv">{r.v}</div>
              </div>
            ))}
          </div>

          <p className="muted small">{t.token.note}</p>
        </Section>

        <Section id="directions" title={t.directions.title} subtitle={t.directions.subtitle}>
          <div className="callout">
            <ul>
              {t.directions.items.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="community" title={t.community.title} subtitle={t.community.subtitle}>
          <div className="ctaRow">
            <a className="btn primary" href={X_PROFILE_URL} target="_blank" rel="noreferrer">
              {t.community.buttons.x}
            </a>
            <button className="btn" disabled title="Coming soon">
              {t.community.buttons.telegram}
            </button>
            <button className="btn" disabled title="Coming soon">
              {t.community.buttons.links}
            </button>
          </div>

          <footer className="footer">
            <div className="muted small">{t.community.footer}</div>
          </footer>
        </Section>
      </main>
    </div>
  );
}
