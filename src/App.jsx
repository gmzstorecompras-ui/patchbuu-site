import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { STRINGS } from "./i18n";

/**
 * ✅ VERCEL = HUB OFICIAL
 * Dejá OFFICIAL_HUB_URL vacío para que este sitio sea el hub (recomendado).
 */
const PROJECT_NAME = "$PINGY";
const X_PROFILE_URL = "https://x.com/PINGY";
const TELEGRAM_URL = "https://t.me/+d4wZY1wKinM5NmRh";
const OFFICIAL_HUB_URL = ""; // <- vacío = este sitio es el Hub

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="sectionHead">
        <h2>{title}</h2>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function LinkCard({ title, desc, href, cta }) {
  return (
    <a className="linkCard" href={href} target="_blank" rel="noreferrer">
      <div className="linkCardTop">
        <div className="linkCardTitle">{title}</div>
        <div className="linkCardCta">{cta} →</div>
      </div>
      <div className="muted">{desc}</div>
    </a>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("pingy_lang") || "es");
  const t = useMemo(() => STRINGS[lang], [lang]);

  const hasTelegram = Boolean(TELEGRAM_URL && TELEGRAM_URL.startsWith("http"));

  const origin = typeof window !== "undefined" ? window.location.origin : "/";
  const isSiteHub = !(OFFICIAL_HUB_URL && OFFICIAL_HUB_URL.startsWith("http"));
  const hubUrl = isSiteHub ? origin : OFFICIAL_HUB_URL;
  const hubCardUrl = isSiteHub ? `${origin}#top` : hubUrl;

  useEffect(() => {
    document.title = t.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.metaDesc);
    localStorage.setItem("pingy_lang", lang);
  }, [lang, t]);

  const toggleLang = () => setLang((p) => (p === "en" ? "es" : "en"));

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // “patch rain” decorativo
  const pieces = useMemo(() => {
    const count = 16;
    const types = ["p1", "p2", "p3"];
    const rand = (a, b) => a + Math.random() * (b - a);

    return Array.from({ length: count }, (_, i) => {
      const type = types[i % types.length];
      return {
        key: i,
        type,
        left: `${rand(2, 98).toFixed(2)}%`,
        size: `${rand(18, 34).toFixed(0)}px`,
        drift: `${rand(-28, 28).toFixed(0)}px`,
        rot: `${rand(0, 360).toFixed(0)}deg`,
        dur: `${rand(18, 32).toFixed(2)}s`,
        delay: `-${rand(0, 28).toFixed(2)}s`,
        opacity: rand(0.12, 0.28).toFixed(2),
      };
    });
  }, []);

  return (
    <div className="page">
      <div className="puzzleRain" aria-hidden="true">
        {pieces.map((p) => (
          <span
            key={p.key}
            className={`puzzlePieceSvg ${p.type}`}
            style={{
              left: p.left,
              "--sz": p.size,
              "--drift": p.drift,
              "--rot": p.rot,
              animationDuration: p.dur,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <header className="nav">
        <div
          className="brand"
          onClick={() => scrollTo("top")}
          onKeyDown={(e) => (e.key === "Enter" ? scrollTo("top") : null)}
          role="button"
          tabIndex={0}
          aria-label="Go to top"
        >
          <span className="dot" />
          <span className="brandName">{PROJECT_NAME}</span>
          <span className="brandTag">📡🧲</span>
        </div>

        <nav className="navLinks" aria-label="Site navigation">
          <button onClick={() => scrollTo("proof")}>{t.nav.proof}</button>
          <button onClick={() => scrollTo("lore")}>{t.nav.lore}</button>
          <button onClick={() => scrollTo("status")}>{t.nav.status}</button>
          <button onClick={() => scrollTo("official")}>{t.nav.official}</button>
          <button onClick={() => scrollTo("community")}>{t.nav.community}</button>
        </nav>

        <div className="navActions">
          {/* ✅ Botón idioma */}
          <button className="pill neon" onClick={toggleLang} title="Toggle language">
            {t.toggle}
          </button>

          {/* ✅ HUB (uno solo) */}
          {isSiteHub ? (
            <button className="pill" onClick={() => scrollTo("official")} title="Hub oficial">
              HUB
            </button>
          ) : (
            <a className="pill" href={hubUrl} target="_blank" rel="noreferrer" title="Official Hub">
              HUB
            </a>
          )}

          {hasTelegram ? (
            <a className="pill" href={TELEGRAM_URL} target="_blank" rel="noreferrer" title="Telegram">
              TG
            </a>
          ) : null}

          <a className="pill primary" href={X_PROFILE_URL} target="_blank" rel="noreferrer" title="X">
            X
          </a>
        </div>
      </header>

      <main id="top" className="main">
        <section className="hero">
          <div className="heroInner">
            <div className="badge">{t.hero.badge}</div>

            <h1>
              {t.hero.title} <span className="accent">{t.hero.titleAccent}</span>
            </h1>

            <p className="lead">{t.hero.subtitle}</p>

            <div className="heroWarning">
              <strong>{t.hero.caWarningStrong}</strong> {t.hero.caWarning}
            </div>

            <div className="ctaRow">
              {hasTelegram ? (
                <a className="btn primary" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                  {t.hero.ctaTelegram}
                </a>
              ) : null}

              <button className="btn" onClick={() => scrollTo("proof")}>
                {t.hero.ctaPrimary}
              </button>

              <button className="btn" onClick={() => scrollTo("lore")}>
                {t.hero.ctaSecondary}
              </button>
            </div>

            <div className="marquee" aria-hidden="true">
              <div className="marqueeInner">
                <span>{t.hero.marquee} </span>
                <span>{t.hero.marquee} </span>
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

          <div className="ctaRow">
            <a className="btn primary" href={X_PROFILE_URL} target="_blank" rel="noreferrer">
              {t.lore.cta}
            </a>
            {hasTelegram ? (
              <a className="btn" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                {t.lore.ctaTelegram}
              </a>
            ) : null}
          </div>
        </Section>

        <Section id="status" title={t.status.title} subtitle={t.status.subtitle}>
          <div className="callout">
            <ul>
              {t.status.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="container">
            <p className="muted small tokenNote">{t.status.note}</p>
          </div>
        </Section>

        <Section id="official" title={t.official.title} subtitle={t.official.subtitle}>
          <div className="linkGrid">
            <LinkCard
              title={t.official.hubTitle}
              desc={t.official.hubDesc}
              href={hubCardUrl}
              cta={t.official.open}
            />

            <LinkCard title="X" desc={t.official.xDesc} href={X_PROFILE_URL} cta={t.official.open} />

            {hasTelegram ? (
              <LinkCard
                title="Telegram"
                desc={t.official.tgDesc}
                href={TELEGRAM_URL}
                cta={t.official.join}
              />
            ) : null}
          </div>

          <div className="callout">
            <ul>
              {t.official.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="community" title={t.community.title} subtitle={t.community.subtitle}>
          <p className="muted communityHint">{t.community.howToStart}</p>

          <div className="ctaRow">
            <a className="btn primary" href={X_PROFILE_URL} target="_blank" rel="noreferrer">
              {t.community.buttons.x}
            </a>

            {hasTelegram ? (
              <a className="btn" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                {t.community.buttons.telegram}
              </a>
            ) : null}

            <button className="btn" onClick={() => scrollTo("official")}>
              {t.community.buttons.hub}
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
