import { useState, useEffect, useMemo, createContext, useContext } from "react";
import photo from './Profil_Vanessa-bg.png';
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";

const palettes = {
  dark: {
    bg: "#080d1a", bg2: "#0d1220", bg3: "#111827",
    bgRgb: "8,13,26", bg2Rgb: "13,18,32", bg3Rgb: "17,24,39",
    pink: "#FE4BC1", pinkRgb: "254,75,193", pinkDim: "rgba(254,75,193,0.1)", pinkBorder: "rgba(254,75,193,0.22)",
    text: "#f1f5f9", textRgb: "241,245,249",
    textSoft: "#94a3b8", textSoftRgb: "148,163,184",
    textMuted: "#475569", textMutedRgb: "71,85,105",
    border: "#1a2035", borderRgb: "26,32,53",
    cardShadow: "0 2px 12px rgba(0,0,0,0.25)",
    cardShadowHover: "0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)",
    certShadow: "0 2px 8px rgba(0,0,0,0.2)",
    certShadowHover: "0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)",
    skillHoverShadow: "0 4px 16px rgba(0,0,0,0.4)",
  },
  light: {
    bg: "#ffffff", bg2: "#f8fafc", bg3: "#eef1f6",
    bgRgb: "255,255,255", bg2Rgb: "248,250,252", bg3Rgb: "238,241,246",
    pink: "#D6339C", pinkRgb: "214,51,156", pinkDim: "rgba(214,51,156,0.08)", pinkBorder: "rgba(214,51,156,0.25)",
    text: "#0f172a", textRgb: "15,23,42",
    textSoft: "#475569", textSoftRgb: "71,85,105",
    textMuted: "#64748b", textMutedRgb: "100,116,139",
    border: "#e2e8f0", borderRgb: "226,232,240",
    cardShadow: "0 2px 12px rgba(15,23,42,0.06)",
    cardShadowHover: "0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
    certShadow: "0 2px 8px rgba(15,23,42,0.05)",
    certShadowHover: "0 8px 32px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
    skillHoverShadow: "0 4px 16px rgba(15,23,42,0.1)",
  },
};

const ThemeContext = createContext(null);
function useTheme() {
  return useContext(ThemeContext).C;
}

function getInitialMode() {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("theme");
  return saved === "light" ? "light" : "dark";
}

function useW() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function Tag({ children }) {
  const C = useTheme();
  return (
    <span style={{
      color: C.textSoft, fontSize: "0.71rem", fontWeight: 500,
      background: `rgba(${C.textSoftRgb},0.07)`, padding: "0.18rem 0.55rem",
      borderRadius: "5px", border: `1px solid rgba(${C.textSoftRgb},0.1)`,
      display: "inline-block", lineHeight: 1.6,
    }}>{children}</span>
  );
}

function SectionLabel({ children }) {
  const C = useTheme();
  return (
    <p style={{
      fontSize: "0.68rem", color: C.pink, textTransform: "uppercase",
      letterSpacing: "0.16em", marginBottom: "0.5rem", fontWeight: 700,
    }}>{children}</p>
  );
}

const Btn = ({ onClick, children, style: s }) => (
  <button onClick={onClick} style={{
    cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.02em",
    transition: "all 0.18s", ...s,
  }}>{children}</button>
);

function ThemeToggle({ mode, onToggle }) {
  const C = useTheme();
  return (
    <button
      onClick={onToggle}
      aria-label={mode === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
      title={mode === "dark" ? "Mode clair" : "Mode sombre"}
      style={{
        background: "transparent", border: `1px solid ${C.border}`, borderRadius: "8px",
        width: "34px", height: "34px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: C.textSoft, transition: "all 0.15s", fontFamily: "inherit",
      }}
      onMouseEnter={e => { e.currentTarget.style.color = C.pink; e.currentTarget.style.borderColor = C.pinkBorder; }}
      onMouseLeave={e => { e.currentTarget.style.color = C.textSoft; e.currentTarget.style.borderColor = C.border; }}
    >
      {mode === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const C = useTheme();
  const w = useW();
  const mob = w < 768;
  const skills = ["Power BI · DAX", "Python · Pandas", "SQL · PL/SQL", "Snowflake", "Machine Learning", "Talend · ETL", "BigQuery · GCP", "Scikit-learn"];

  const HeroText = ({ mobile }) => (
    <div style={mobile
      ? { padding: "2.5rem 1.5rem 3.5rem", textAlign: "center", zIndex: 1 }
      : { flex: "0 0 50%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 0 4rem 3.5rem", zIndex: 1 }
    }>
      <p style={{ fontSize: "1.55rem", color: C.textSoft, marginBottom: "0.75rem", fontWeight: 500 }}>
        Bonjour, je suis
      </p>
      <h1 style={{
        fontSize: mobile ? "2.8rem" : "clamp(1.8rem, 4.2vw, 4.8rem)",
        fontWeight: 800, lineHeight: 0.97, marginBottom: "0.75rem", letterSpacing: "-0.03em",
      }}>
        Vanessa<br />
        <span style={{ color: C.pink }}>Kenfack</span><br />
        <span style={{ color: C.textSoft, fontWeight: 300 }}>Temgoua</span>
      </h1>
      <p style={{ fontSize: mobile ? "0.9rem" : "1.55rem", color: C.textSoft, fontWeight: 500, marginBottom: "0.6rem" }}>
        Data Analyst · Consultante BI &amp; Machine Learning
      </p>
      <div style={{
        display: "flex", alignItems: "center", gap: "0.3rem",
        color: C.textMuted, fontSize: "0.93rem", marginBottom: "2.10rem",
        justifyContent: mobile ? "center" : "flex-start",
      }}>

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      <span>Basée en France </span>
      </div>

      {/* CTA buttons */}
      <div style={{
        display: "flex", gap: "0.75rem", flexWrap: "wrap",
        marginBottom: mobile ? "2rem" : "2.5rem",
        justifyContent: mobile ? "center" : "flex-start",
      }}>
        <Btn
          onClick={() => setPage("projets")}
          style={{
            background: C.pink, color: "#fff", border: "none",
            padding: "0.75rem 1.75rem", borderRadius: "12px",
            fontSize: "0.88rem", fontWeight: 700,
            display: "flex", alignItems: "center", gap: "0.5rem",
            boxShadow: `0 4px 20px rgba(${C.pinkRgb},0.4)`,
          }}
        >
          <span style={{ width: "7px", height: "7px", background: "#fff", borderRadius: "50%", display: "inline-block" }} />
          Voir mes projets
        </Btn>
        <Btn
          onClick={() => setPage("contact")}
          style={{
            background: "transparent", color: C.text,
            border: `1px solid rgba(${C.textRgb},0.15)`,
            padding: "0.75rem 1.75rem", borderRadius: "12px", fontSize: "0.88rem",
          }}
        >
          Me contacter
        </Btn>
      </div>

      {/* Stats */}
      <div style={{
        display: "flex", gap: mobile ? "2rem" : "2.5rem",
        paddingTop: "1.75rem", borderTop: `1px solid rgba(${C.borderRgb},0.8)`,
        justifyContent: mobile ? "center" : "flex-start",
      }}>
        {(mobile
          ? [["2+", "Ans exp."], ["5+", "Projets"], ["95%", "Fiabilité"]]
          : [["2+", "Ans d'expérience"], ["5+", "Projets réalisés"], ["95%", "Fiabilité données"]]
        ).map(([val, lbl]) => (
          <div key={lbl} style={{ textAlign: mobile ? "center" : "left" }}>
            <div style={{ fontSize: mobile ? "1.7rem" : "1.9rem", fontWeight: 800, color: C.pink, lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "0.62rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.25rem" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* HERO */}
      <div style={{
        minHeight: mob ? "auto" : "90vh",
        display: "flex", flexDirection: mob ? "column" : "row",
        alignItems: "stretch", overflow: "hidden", position: "relative",
      }}>
        <div style={{ position: "absolute", top: "13%", left: "52%", width: "8px", height: "8px", borderRadius: "50%", background: C.pink, opacity: 0.65, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "9%", right: "2%", width: "12px", height: "12px", borderRadius: "50%", background: C.pink, opacity: 0.4, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "320px", height: "320px", borderRadius: "50%", background: C.pink, opacity: 0.05, zIndex: 0, pointerEvents: "none" }} />
        <svg style={{ position: "absolute", bottom: "55px", left: mob ? "30%" : "40%", zIndex: 2, pointerEvents: "none" }} width="160" height="55" viewBox="0 0 160 55">
          <path d="M0,45 Q80,-15 160,45" stroke={C.pink} strokeWidth="1.5" fill="none" opacity="0.4" />
        </svg>
        <svg style={{ position: "absolute", bottom: "50px", left: mob ? "calc(30% + 75px)" : "calc(40% + 75px)", zIndex: 3, pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14">
          <path d="M7,0 L8,5.5 L14,7 L8,8.5 L7,14 L6,8.5 L0,7 L6,5.5 Z" fill={C.pink} />
        </svg>

        {mob ? (
          <>
            <div style={{ width: "100%", height: "60vw", overflow: "hidden", flexShrink: 0, position: "relative" }}>
              <img src={photo} alt="Vanessa Kenfack" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: `linear-gradient(transparent, ${C.bg})`, pointerEvents: "none" }} />
            </div>
            <HeroText mobile />
          </>
        ) : (
          <>
            <HeroText mobile={false} />
            <div style={{ flex: "0 0 50%", position: "relative", overflow: "hidden" }}>
              <img
                src={photo} alt="Vanessa Kenfack"
                style={{ width: "80%", height: "88%", objectFit: "cover", objectPosition: "center 8%", display: "block", marginTop: "6%" }}
                onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML += '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:5rem;font-weight:800;color:#FE4BC1">VK</div>'; }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "140px", background: `linear-gradient(transparent, ${C.bg})`, pointerEvents: "none" }} />
            </div>
          </>
        )}
      </div>

      {/* PROFIL */}
      <div style={{ padding: mob ? "3.5rem 1.5rem" : "5rem 2.5rem", background: C.bg2, borderTop: `1px solid rgba(${C.borderRgb},0.6)` }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <SectionLabel>À propos</SectionLabel>
          <h2 style={{ fontSize: "1.9rem", fontWeight: 700, marginBottom: "2.5rem" }}>Profil</h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? "2.5rem" : "4rem", alignItems: "start" }}>
            <div>
              <p style={{ color: C.textSoft, lineHeight: 1.9, marginBottom: "1.25rem", fontSize: "0.94rem" }}>
                Data Analyst avec 2 ans d'expérience en environnements industriels et médicaux, je transforme des données brutes en décisions concrètes via SQL, Snowflake, Power BI et Machine Learning. Chaque pipeline que je construis, chaque modèle que j'entraîne, chaque dashboard que je livre a un seul objectif : créer de la valeur métier mesurable.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: "6px", height: "6px", background: C.pink, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 8px ${C.pink}` }} />
                <p style={{ color: C.pink, fontSize: "0.87rem", fontWeight: 600 }}>Disponible dès maintenant · Mobilité France entière</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
              {skills.map(s => (
                <SkillPill key={s} label={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillPill({ label }) {
  const C = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: `rgba(${C.bg3Rgb},0.7)`,
        border: `1px solid rgba(${C.pinkRgb},0.08)`,
        padding: "0.65rem 0.9rem", borderRadius: "10px",
        transition: "all 0.15s", cursor: "default",
        boxShadow: hov ? C.skillHoverShadow : "none",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ fontSize: "0.79rem", color: C.textSoft, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function CVPage() {
  const C = useTheme();
  const mob = useW() < 768;
  const exps = [
    { role: "Data Analyst · Snowflake", company: "Takenco IT", period: "Mai 2025 – Mars 2026 · 11 mois", lieu: "Distanciel", secteur: "Industrie / Manufacturing", bullets: ["SQL avancé sur Snowflake pour analyses métier", "Tableaux de bord Power BI connectés à Snowflake | fiabilité 95%, -40% temps d'analyse", "Définition des KPIs et restitution des résultats aux équipes", "Qualité et cohérence des données tout au long du cycle d'analyse"] },
    { role: "Data Analyst & IA", company: "CELEOS", period: "Juillet – Décembre 2024 · 6 mois", lieu: "Lille", secteur: "Industrie / Médical", bullets: ["+50 000 lignes de données spectrométriques structurées via Python", "Fiabilité des données à 98% (ANOVA, tests de distribution)", "3 modèles ML comparés | +15% performances prédictives", "2 dashboards interactifs Python | -40% temps d'analyse"] },
    { role: "Data Analyst", company: "McCain Foods", period: "Juin – Décembre 2023 · 7 mois", lieu: "Lille", secteur: "Agroalimentaire / Industrie", bullets: ["+100 000 lignes de données de production traitées via Python & SQL", "Contrôles qualité automatisés | 90% de taux de conformité", "2 pipelines ETL avec feature engineering | +25% accélération du traitement", "Analyse prédictive des pannes machines | -12% temps d'arrêt"] },
  ];
  const techGroups = [
    { label: "BI & Reporting", items: ["Power BI", "DAX", "Power Query", "Tableau Software", "Excel"] },
    { label: "SQL & Bases de données", items: ["SQL","NoSQL", "PostgreSQL", "Snowflake", "MongoDB", "MySQL"] },
    { label: "Python", items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Plotly", "TensorFlow"] },
    { label: "Data Engineering", items: ["Talend", "Airflow", "BigQuery", "GCP"] },
    { label: "Machine Learning", items: ["Random Forest", "Régression", "ACP", "Clustering", "Séries Temporelles"] },
  ];

  return (
    <div style={{ padding: mob ? "2.5rem 1.5rem" : "3.5rem 2.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <SectionLabel>Curriculum Vitae</SectionLabel>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: mob ? "flex-start" : "center", flexDirection: mob ? "column" : "row", gap: "1rem", marginBottom: "3.5rem" }}>
        <h2 style={{ fontSize: "1.9rem", fontWeight: 700 }}>Parcours & Compétences</h2>
        <a href="/CV_Vanessa_Kenfack.pdf" download="CV_Vanessa_Kenfack.pdf" style={{
          background: C.pink, color: "#fff", padding: "0.55rem 1.3rem",
          borderRadius: "10px", fontSize: "0.83rem", textDecoration: "none",
          fontWeight: 700, boxShadow: `0 4px 16px rgba(${C.pinkRgb},0.35)`,
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
        }}>
          ↓ Télécharger CV
        </a>
      </div>

      {/* Experiences */}
      <section style={{ marginBottom: "3.5rem" }}>
        <SectionLabel>Expériences</SectionLabel>
        <div style={{ paddingLeft: "1.75rem", borderLeft: `2px solid ${C.pinkBorder}`, marginTop: "1.75rem" }}>
          {exps.map((exp, i) => (
            <div key={i} style={{ marginBottom: "2.5rem", position: "relative" }}>
              <div style={{
                position: "absolute", left: "-2.1rem", top: "0.25rem",
                width: "10px", height: "10px", background: C.pink, borderRadius: "50%",
                boxShadow: `0 0 0 3px rgba(${C.pinkRgb},0.15), 0 0 0 6px rgba(${C.pinkRgb},0.05)`,
              }} />
              <div style={{ fontSize: "0.71rem", color: C.pink, marginBottom: "0.3rem", fontWeight: 600 }}>{exp.period} · {exp.lieu}</div>
              <div style={{ fontWeight: 700, fontSize: "0.98rem", marginBottom: "0.15rem" }}>{exp.role}</div>
              <div style={{ fontSize: "0.83rem", color: C.textSoft, marginBottom: "0.35rem" }}>{exp.company}</div>
              <span style={{
                display: "inline-block", fontSize: "0.68rem", color: C.textMuted,
                background: `rgba(${C.textMutedRgb},0.1)`, padding: "0.12rem 0.55rem",
                borderRadius: "5px", border: `1px solid rgba(${C.textMutedRgb},0.15)`, marginBottom: "0.8rem",
              }}>{exp.secteur}</span>
              <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ color: C.textSoft, fontSize: "0.83rem", lineHeight: 1.8, marginBottom: "0.2rem" }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tech */}
      <section style={{ marginBottom: "3.5rem" }}>
        <SectionLabel>Outils & Technologies</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1.5rem" }}>
          {techGroups.map(({ label, items }) => (
            <div key={label} style={{
              background: `rgba(${C.bg2Rgb},0.5)`, border: `1px solid ${C.border}`,
              borderRadius: "12px", padding: "0.85rem 1.1rem",
              display: "grid", gridTemplateColumns: mob ? "1fr" : "140px 1fr",
              gap: mob ? "0.5rem" : "1rem", alignItems: "center",
            }}>
              <span style={{ fontSize: "0.78rem", color: C.pink, fontWeight: 600 }}>{label}</span>
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                {items.map(item => <Tag key={item}>{item}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formation */}
      <section>
        <SectionLabel>Formation</SectionLabel>
        <div style={{ marginTop: "1.25rem" }}>
          {[
            ["Master Data & Intelligence Artificielle", "Université Catholique de Lille", "2025"],
            ["Master 1 Data Science","", "2022"],
            ["Licence Réseaux & Systèmes d'Information", "", "2021"],
          ].map(([diploma, school, year]) => (
            <div key={diploma} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "1rem 0", borderBottom: `1px solid ${C.border}`, gap: "1rem" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{diploma}</div>
                {school && <div style={{ fontSize: "0.78rem", color: C.textMuted, marginTop: "0.2rem" }}>{school}</div>}
              </div>
              <span style={{
                fontSize: "0.73rem", color: C.pink, fontWeight: 700, flexShrink: 0,
                background: C.pinkDim, padding: "0.2rem 0.6rem",
                borderRadius: "6px", border: `1px solid ${C.pinkBorder}`,
              }}>{year}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ p }) {
  const C = useTheme();
  const [hov, setHov] = useState(false);
  const hasCapLink = Boolean(p.cap_link && p.cap_link.trim());
  return (
    <div
      style={{
        background: C.bg2, border: `1px solid ${C.border}`,
        borderRadius: "16px", overflow: "hidden",
        transition: "all 0.22s ease",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? C.cardShadowHover : C.cardShadow,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Video thumbnail or icon header */}
      {hasCapLink ? (
        <a
          href={p.cap_link}
          target="_blank"
          rel="noreferrer noopener"
          style={{ display: "block", textDecoration: "none", position: "relative" }}
        >
          <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: C.bg3, borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
            <img
              src={`https://cap.so/api/video/og?videoId=${p.cap_link.split("/").pop()}`}
              alt={p.title}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Dark overlay on hover */}
            <div style={{
              position: "absolute", inset: 0,
              background: hov ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.25)",
              transition: "background 0.22s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* Play button */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: hov ? C.pink : "rgba(255,255,255,0.92)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.22s",
                boxShadow: hov ? `0 0 20px rgba(${C.pinkRgb},0.6)` : "0 2px 12px rgba(0,0,0,0.4)",
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <polygon points="6,3 15,9 6,15" fill={hov ? "#fff" : C.pink} />
                </svg>
              </div>
            </div>
          </div>
        </a>
      ) : p.image ? (
        <a
          href={p.live_link || "#"}
          target={p.live_link ? "_blank" : undefined}
          rel={p.live_link ? "noreferrer noopener" : undefined}
          onClick={e => { if (!p.live_link) e.preventDefault(); }}
          style={{ display: "block", textDecoration: "none", cursor: p.live_link ? "pointer" : "default" }}
        >
          <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: C.bg3, borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
            <img
              src={p.image}
              alt={p.title}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: hov ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)",
              transition: "background 0.22s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {p.live_link && (
                <span style={{
                  fontSize: "0.75rem", fontWeight: 700,
                  color: hov ? "#fff" : C.pink,
                  background: hov ? C.pink : "rgba(255,255,255,0.92)",
                  padding: "0.45rem 1rem", borderRadius: "100px",
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  boxShadow: hov ? `0 0 20px rgba(${C.pinkRgb},0.6)` : "0 2px 12px rgba(0,0,0,0.35)",
                  transition: "all 0.22s", opacity: hov ? 1 : 0.92,
                }}>
                  Voir l'application ↗
                </span>
              )}
            </div>
          </div>
        </a>
      ) : p.live_link ? (
        <a
          href={p.live_link}
          target="_blank"
          rel="noreferrer noopener"
          style={{ display: "block", textDecoration: "none" }}
        >
          <div style={{
            height: "86px", display: "flex", alignItems: "center", justifyContent: "center",
            background: `linear-gradient(145deg, ${C.bg3} 0%, rgba(${C.bg3Rgb},0.4) 100%)`,
            borderBottom: `1px solid ${C.border}`, fontSize: "2rem", color: C.pink,
            position: "relative", overflow: "hidden", cursor: "pointer",
          }}>
            <div style={{ position: "absolute", inset: 0, background: hov ? `rgba(${C.textRgb},0.03)` : "transparent", transition: "all 0.22s" }} />
            <span style={{ position: "relative", zIndex: 1 }}>{p.icon}</span>
            <span style={{
              position: "absolute", top: "0.6rem", right: "0.7rem", zIndex: 1,
              fontSize: "0.63rem", fontWeight: 700, color: C.pink,
              background: C.pinkDim, border: `1px solid ${C.pinkBorder}`,
              padding: "0.15rem 0.55rem", borderRadius: "100px",
              opacity: hov ? 1 : 0.9, transition: "opacity 0.22s",
            }}>
              App live ↗
            </span>
          </div>
        </a>
      ) : (
        <div style={{
          height: "86px", display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(145deg, ${C.bg3} 0%, rgba(${C.bg3Rgb},0.4) 100%)`,
          borderBottom: `1px solid ${C.border}`, fontSize: "2rem", color: C.pink,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: hov ? `rgba(${C.textRgb},0.03)` : "transparent", transition: "all 0.22s" }} />
          <span style={{ position: "relative", zIndex: 1 }}>{p.icon}</span>
        </div>
      )}
      {/* Body */}
      <div style={{ padding: "1.1rem" }}>
        <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
          {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.45rem", lineHeight: 1.4 }}>{p.title}</div>
        <div style={{ fontSize: "0.78rem", color: C.textSoft, lineHeight: 1.75, marginBottom: "0.85rem" }}>{p.desc}</div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.9rem", paddingTop: "0.65rem", borderTop: `1px solid ${C.border}` }}>
          {p.metrics.map(m => (
            <span key={m} style={{
              color: C.pink, fontSize: "0.67rem", fontWeight: 600,
              background: C.pinkDim, padding: "0.15rem 0.5rem",
              borderRadius: "4px", border: `1px solid ${C.pinkBorder}`,
            }}>{m}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
          {p.live_link && (
            <a href={p.live_link} target="_blank" rel="noreferrer"
              style={{ color: C.pink, fontSize: "0.78rem", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              Application live <span>→</span>
            </a>
          )}
          <a href="https://github.com/vanessatemgoua/Data-portfolio" target="_blank" rel="noreferrer"
            style={{ color: C.pink, fontSize: "0.78rem", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
            Voir sur GitHub <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjetsPage() {
  const C = useTheme();
  const mob = useW() < 768;
  const [filter, setFilter] = useState("Tous");
  const categories = ["Tous", "Power BI", "Python", "Excel"];
  const projects = [
    { title: "Rossmann Store Sales · Prévision de la Demande", tags: ["Python", "Machine Learning", "Streamlit"], cat: "Python", desc: "Pipeline de prévision des ventes journalières pour 1 115 magasins Rossmann (1M+ lignes, Kaggle) : EDA, feature engineering, comparaison LightGBM / SARIMA / Prophet, puis déploiement d'un dashboard interactif sur Streamlit Cloud pour anticiper la demande à 6 semaines.", metrics: ["1 115 modèles Prophet", "RMSPE 9,4%", "App en ligne"], icon: "◈", image: "/rossmann.png", cap_link:"", live_link: "https://rossmanndemandforecast.streamlit.app/" },
    { title: "Health Snowflake Pipeline", tags: ["Power BI", "SQL", "Snowflake", "Python"], cat: "Power BI, Snowflake", desc: "Pipeline end-to-end sur données cardiaques : ingestion Python → Snowflake (RAW/STAGING/GOLD) → Dashboard Power BI 3 pages. Score de risque patient, segmentation par âge et analyse cholestérol.", metrics: ["1 025 patients", "6 tables GOLD", "3 pages Power BI"], icon: "↗", cap_link:"https://cap.link/4zhn27487qssp5k" },
    { title: "Global Superstore · Sales Performance", tags: ["Power BI", "DAX", "Power Query"], cat: "Power BI", desc: "Dashboard 3 pages : Vue d'ensemble, Analyse Produit, Analyse Géographique. KPIs N/N-1, scatter plot Remise vs Profit.", metrics: ["+51,5% CA", "3 pages", "DAX avancé"], icon: "↗", cap_link:"https://cap.link/vxse8f0a11wzfrh" },
    { title: "Atlas Labs · HR Analytics", tags: ["Power BI", "DAX", "RH"], cat: "Power BI", desc: "Analyse RH : attrition (16,1%), démographie des effectifs, suivi individuel des performances.", metrics: ["4 pages", "1 470 employés", "16,1% attrition"], icon: "◎", cap_link:"https://cap.link/q36npy574znk453" },
    { title: "Churn Rate · Databel", tags: ["Power BI", "DAX", "CRM"], cat: "Power BI", desc: "Identification des facteurs de désabonnement. Segmentation par profil, type de contrat et usage.", metrics: ["Segmentation", "Power Query", "DAX"], icon: "△", image: "/churn_rate.png" , cap_link:"" },
    { title: "Analyse Financière · Apple AAPL", tags: ["Python", "ML", "Finance"], cat: "Python", desc: "Feature engineering (SMA, EMA, RSI, MACD), backtesting stratégie trading, Random Forest vs XGBoost.", metrics: ["RMSE/MAE/R²", "Backtesting", "XGBoost"], icon: "∿", image: "/financial_analysis.png", cap_link:"" },
    { title: "HR Analytics · Performances Employés", tags: ["Python", "Pandas", "Stats"], cat: "Python", desc: "Exploration des données RH, détection d'outliers, analyse des corrélations.", metrics: ["50K+ lignes", "ANOVA", "Clustering"], icon: "⬡", image: "/hr_analysis.png", cap_link:"" },
    { title: "Analyse des Ventes · Excel", tags: ["Excel", "Power Query", "TCD"], cat: "Excel", desc: "Suivi des performances commerciales par région et catégorie avec tableaux croisés dynamiques.", metrics: ["TCD", "Power Query", "Dashboard"], icon: "▦",image: "/superstore.png", cap_link:"" },
  ];
  const filtered = filter === "Tous" ? projects : projects.filter(p => p.cat === filter);

  return (
    <div style={{ padding: mob ? "2.5rem 1.5rem" : "3.5rem 2.5rem", maxWidth: "1050px", margin: "0 auto" }}>
      <SectionLabel>Portfolio</SectionLabel>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: mob ? "flex-start" : "center", flexDirection: mob ? "column" : "row", gap: "1.25rem", marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.9rem", fontWeight: 700 }}>Projets</h2>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <Btn key={cat} onClick={() => setFilter(cat)} style={{
              background: filter === cat ? C.pink : "transparent",
              color: filter === cat ? "#fff" : C.textSoft,
              border: `1px solid ${filter === cat ? C.pink : C.border}`,
              padding: "0.38rem 1rem", borderRadius: "100px",
              fontSize: "0.78rem", fontWeight: filter === cat ? 600 : 400,
            }}>{cat}</Btn>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.1rem" }}>
        {filtered.map(p => <ProjectCard key={p.title} p={p} />)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function CertCard({ c }) {
  const C = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: C.bg2, border: `1px solid ${C.border}`,
        borderRadius: "16px", padding: "1.4rem",
        transition: "all 0.22s ease",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? C.certShadowHover : C.certShadow,
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: hov ? `rgba(${C.textRgb},0.06)` : "transparent",
        transition: "all 0.22s",
      }} />
      <div style={{
        width: "44px", height: "44px", borderRadius: "10px",
        background: "#fff", padding: "6px",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "0.9rem", overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        margin: "0 auto 0.9rem",
      }}>
        <img src={c.logo} alt={c.org} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.3rem", lineHeight: 1.3 }}>{c.title}</div>
      <div style={{ fontSize: "0.78rem", color: C.textMuted, marginBottom: "1.1rem" }}>{c.org}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontSize: "0.72rem", color: C.pink, fontWeight: 700,
          background: C.pinkDim, padding: "0.2rem 0.6rem",
          borderRadius: "6px", border: `1px solid ${C.pinkBorder}`,
        }}>{c.year}</span>
      {c.status === "en_cours" ? (
      <span style={{
        color: "#a1a1a1", fontSize: "0.66rem", fontWeight: 600,
        background: "rgba(221, 225, 222, 0.1)", padding: "0.18rem 0.55rem",
        borderRadius: "5px", border: "1px solid rgba(120, 120, 118, 0.25)",
      }}>En cours...</span>
      ) : (
      <span style={{
        color: "#16722d", fontSize: "0.66rem", fontWeight: 600,
        background: "rgba(16, 124, 43, 0.1)", padding: "0.18rem 0.55rem",
        borderRadius: "5px", border: "1px solid rgba(120, 120, 118, 0.25)",
      }}>Obtenu ✓</span>
    )}
      </div>
    </div>
  );
}

function CertificationsPage() {
  const C = useTheme();
  const mob = useW() < 768;
  const certs = [
    { title: "Data Analyst Associate", org: "Datacamp", year: "2025", logo: "datacamp.png", status: "obtenu" },
    { title: "Data Analytics Job Simulation", org: "Forage", year: "2025", logo: "forage.png", status: "obtenu" },
    { title: "L'essentiel de Google Cloud Platform", org: "LinkedIn Learning", year: "2025", logo: "linkedin.png", status: "obtenu" },
    { title: "Python pour la finance", org: "LinkedIn Learning", year: "2025", logo: "linkedin.png", status: "obtenu" },
    { title: "Data Engineer Associate in SQL", org: "Datacamp", year: "2026", logo: "datacamp.png", status: "obtenu" },
    { title: "Power BI Data Analyst Associate", org: "Microsoft", year: "2026", logo: "microsoft.png", status: "en_cours" },
    { title: "Snowflake Data Warehouse", org: "Snowflake", year: "2026", logo: "snowflake.png", status: "en_cours" },
  ];
  return (
    <div style={{ padding: mob ? "2.5rem 1.5rem" : "3.5rem 2.5rem", maxWidth: "960px", margin: "0 auto" }}>
      <SectionLabel>Formations</SectionLabel>
      <h2 style={{ fontSize: "1.9rem", fontWeight: 700, marginBottom: "0.6rem" }}>Certifications</h2>
      <p style={{ color: C.textSoft, marginBottom: "2.5rem", fontSize: "0.94rem" }}>Certifications professionnelles obtenues pour valider mes compétences data.</p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.1rem" }}>
        {certs.map(c => <CertCard key={c.title} c={c} />)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function ContactPage() {
  const C = useTheme();
  const mob = useW() < 768;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const fieldStyle = {
    width: "100%", background: `rgba(${C.bg2Rgb},0.8)`,
    border: `1px solid ${C.border}`, borderRadius: "10px",
    padding: "0.72rem 1rem", color: C.text, fontSize: "0.87rem",
    outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", letterSpacing: "-0.02em",
    transition: "border-color 0.15s",
  };

  return (
    <div style={{ padding: mob ? "2.5rem 1.5rem" : "3.5rem 2.5rem", maxWidth: "820px", margin: "0 auto" }}>
      <SectionLabel>Contact</SectionLabel>
      <h2 style={{ fontSize: "1.9rem", fontWeight: 700, marginBottom: "0.6rem" }}>Travaillons ensemble</h2>
      <p style={{ color: C.textSoft, marginBottom: "3rem", fontSize: "0.94rem" }}>Data Analyst disponible pour missions, CDI ou freelance. Mobile sur Paris et régions.</p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1.15fr", gap: mob ? "2.5rem" : "3.5rem" }}>

        {/* Contact info */}
        <div>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "1.5rem" }}>Coordonnées</h3>
          {[
            { label: "Email", val: "vanessa.kenfack@outlook.fr", href: "mailto:vanessa.kenfack@outlook.fr" },
            { label: "Téléphone", val: "+33 7 45 68 30 36", href: "tel:+33745683036" },
            { label: "Localisation", val: "France Entière", href: null },
          ].map(({ label, val, href }) => (
            <div key={label} style={{ display: "flex", gap: "0.85rem", padding: "0.9rem 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "8px",
                background: C.pinkDim, border: `1px solid ${C.pinkBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: "0.05rem",
              }}>
                <span style={{ color: C.pink, fontSize: "0.8rem" }}>→</span>
              </div>
              <div>
                <div style={{ fontSize: "0.67rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.2rem" }}>{label}</div>
                {href
                  ? <a href={href} style={{ color: C.pink, fontSize: "0.84rem", textDecoration: "none", fontWeight: 500 }}>{val}</a>
                  : <div style={{ color: C.textSoft, fontSize: "0.84rem" }}>{val}</div>}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem" }}>
            {[{ label: "LinkedIn", href: "http://www.linkedin.com/in/vanessa-kenfack-temgoua-028937248" }, { label: "GitHub", href: "https://github.com/vanessatemgoua" }].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ color: C.textSoft, border: `1px solid ${C.border}`, padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.8rem", textDecoration: "none", fontWeight: 500, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = `rgba(${C.textRgb},0.2)`; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textSoft; e.currentTarget.style.borderColor = C.border; }}
              >{label}</a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div style={{ background: C.pinkDim, border: `1px solid ${C.pinkBorder}`, borderRadius: "16px", padding: "2.5rem", textAlign: "center" }}>
              <div style={{ color: C.pink, fontSize: "2rem", marginBottom: "0.75rem" }}>✓</div>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>Message envoyé !</div>
              <div style={{ color: C.textSoft, fontSize: "0.84rem", lineHeight: 1.7 }}>Je vous répondrai dans les plus brefs délais.</div>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                style={{ marginTop: "1.25rem", background: "transparent", color: C.pink, border: `1px solid ${C.pinkBorder}`, padding: "0.5rem 1.1rem", borderRadius: "8px", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>
                Nouveau message
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { key: "name", label: "Nom complet", placeholder: "Votre nom", type: "text" },
                { key: "email", label: "Email", placeholder: "votre@email.com", type: "email" },
                { key: "subject", label: "Sujet", placeholder: "Objet du message", type: "text" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <Label htmlFor={key} style={{ fontSize: "0.68rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: "0.4rem", fontWeight: 500 }}>
                    {label}
                  </Label>
                  <Input id={key} type={type} placeholder={placeholder} value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={fieldStyle}
                    onFocus={e => e.target.style.borderColor = C.pinkBorder}
                    onBlur={e => e.target.style.borderColor = C.border}
                  />
                </div>
              ))}
              <div>
                <Label htmlFor="message" style={{ fontSize: "0.68rem", color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: "0.4rem", fontWeight: 500 }}>
                  Message
                </Label>
                <Textarea id="message" placeholder="Décrivez votre projet ou opportunité..." rows={4}
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...fieldStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = C.pinkBorder}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>
              <button
                onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                style={{
                  background: C.pink, color: "#fff", border: "none", padding: "0.8rem",
                  borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
                  width: "100%", boxShadow: `0 4px 16px rgba(${C.pinkRgb},0.35)`,
                  fontFamily: "inherit", letterSpacing: "-0.02em", transition: "all 0.18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 24px rgba(${C.pinkRgb},0.5)`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 16px rgba(${C.pinkRgb},0.35)`; e.currentTarget.style.transform = "none"; }}
              >
                Envoyer le message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function PortfolioShell() {
  const { mode, C, toggle } = useContext(ThemeContext);
  const [page, setPage] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const mob = useW() < 768;

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [page]);

  const navItems = [
    { key: "about", label: "À propos" }, { key: "cv", label: "CV" },
    { key: "projets", label: "Projets" }, { key: "certifications", label: "Certifications" },
    { key: "contact", label: "Contact" },
  ];

  const pages = {
    about: <AboutPage setPage={setPage} />, cv: <CVPage />,
    projets: <ProjetsPage />, certifications: <CertificationsPage />, contact: <ContactPage />,
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: "-0.03em", transition: "background 0.2s, color 0.2s" }}>

      {/* NAV */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: mob ? "0.85rem 1.5rem" : "0.9rem 2.5rem",
        borderBottom: `1px solid rgba(${C.borderRgb},0.7)`,
        background: `rgba(${C.bgRgb},0.88)`,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ fontSize: "1.35rem", fontWeight: 800, cursor: "pointer", letterSpacing: "-0.04em" }} onClick={() => setPage("about")}>
          VK<span style={{ color: C.pink }}>.</span>
        </div>

        {!mob && (
          <div style={{ display: "flex", gap: "0.15rem", alignItems: "center" }}>
            {navItems.map(({ key, label }) => (
              <button key={key} onClick={() => setPage(key)}
                style={{
                  background: "transparent",
                  color: page === key ? C.pink : C.textSoft,
                  border: "none",
                  padding: "0.4rem 0.9rem", borderRadius: "8px",
                  fontSize: "0.82rem", cursor: "pointer",
                  fontWeight: page === key ? 700 : 400,
                  transition: "all 0.15s", fontFamily: "inherit", letterSpacing: "-0.02em",
                }}
                onMouseEnter={e => { if (page !== key) e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { if (page !== key) e.currentTarget.style.color = C.textSoft; }}
              >{label}</button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <ThemeToggle mode={mode} onToggle={toggle} />
          {!mob && (
            <button onClick={() => setPage("contact")}
              style={{
                background: C.pink, color: "#fff", border: "none",
                padding: "0.45rem 1.2rem", borderRadius: "8px",
                fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                boxShadow: `0 2px 12px rgba(${C.pinkRgb},0.35)`,
                fontFamily: "inherit", letterSpacing: "-0.02em", transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 20px rgba(${C.pinkRgb},0.5)`; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 2px 12px rgba(${C.pinkRgb},0.35)`; e.currentTarget.style.transform = "none"; }}
            >Me contacter</button>
          )}
          {mob && (
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
              aria-label="Menu"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: "22px", height: "1.5px", background: C.text, display: "block", transition: "all 0.2s",
                  transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none",
                }} />
              ))}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mob && menuOpen && (
        <div style={{
          background: `rgba(${C.bg2Rgb},0.97)`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}`, padding: "0.75rem 1.5rem 1.1rem",
          display: "flex", flexDirection: "column", gap: "0.15rem",
          position: "sticky", top: "57px", zIndex: 99,
        }}>
          {navItems.map(({ key, label }) => (
            <button key={key} onClick={() => setPage(key)}
              style={{
                background: "transparent",
                color: page === key ? C.pink : C.textSoft,
                border: "none", padding: "0.7rem 0.85rem",
                fontSize: "0.9rem", cursor: "pointer",
                fontWeight: page === key ? 700 : 400,
                textAlign: "left", borderRadius: "8px",
                fontFamily: "inherit", letterSpacing: "-0.02em",
              }}
            >{label}</button>
          ))}
          <button onClick={() => setPage("contact")}
            style={{
              background: C.pink, color: "#fff", border: "none",
              padding: "0.75rem", borderRadius: "10px",
              fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
              marginTop: "0.5rem", boxShadow: `0 4px 16px rgba(${C.pinkRgb},0.35)`,
              fontFamily: "inherit", letterSpacing: "-0.02em",
            }}
          >Me contacter</button>
        </div>
      )}

      <main>{pages[page]}</main>

      <footer style={{
        padding: mob ? "1.5rem" : "1.5rem 2.5rem",
        borderTop: `1px solid rgba(${C.borderRgb},0.6)`,
        display: "flex", flexDirection: mob ? "column" : "row",
        justifyContent: "space-between", alignItems: mob ? "flex-start" : "center",
        gap: "0.75rem", background: `rgba(${C.bgRgb},0.4)`,
      }}>
        <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.04em" }}>VK<span style={{ color: C.pink }}>.</span></span>
        <span style={{ fontSize: "0.75rem", color: C.textMuted }}>© 2026 Vanessa Kenfack Temgoua · Data Analyst</span>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {[{ label: "LinkedIn", href: "http://www.linkedin.com/in/vanessa-kenfack-temgoua-028937248" }, { label: "GitHub", href: "https://github.com/vanessatemgoua" }].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ color: C.textMuted, fontSize: "0.75rem", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.text}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
            >{label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    window.localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggle = () => setMode(m => (m === "dark" ? "light" : "dark"));
  const value = useMemo(() => ({ mode, C: palettes[mode], toggle }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <PortfolioShell />
    </ThemeContext.Provider>
  );
}
