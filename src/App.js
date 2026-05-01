import { useState, useEffect } from "react";
import photo from './Profil_Vanessa-bg.png';

const C = {
  bg: "#080d1a", bg2: "#0d1220", bg3: "#111827",
  pink: "#FE4BC1", pinkDim: "rgba(254,75,193,0.1)", pinkBorder: "rgba(254,75,193,0.22)",
  white: "#f1f5f9", gray: "#475569", gray2: "#94a3b8", border: "#1a2035", radius: "14px",
};

function useW() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

const Badge = ({ children }) => <span style={{ color: C.gray2, fontSize: "0.78rem", fontWeight: 400 }}>{children}</span>;
const Tag = ({ children }) => <span style={{ color: C.gray2, fontSize: "0.75rem", fontWeight: 400 }}>{children}</span>;
const SectionLabel = ({ children }) => <p style={{ fontSize: "0.72rem", color: C.pink, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem", fontWeight: 600 }}>{children}</p>;

function AboutPage({ setPage }) {
  const w = useW();
  const mob = w < 768;
  const skills = ["Power BI · DAX", "Python · Pandas", "SQL · PL/SQL", "Snowflake", "Machine Learning", "Talend · ETL", "BigQuery · GCP", "Scikit-learn"];

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{
        minHeight: mob ? "auto" : "88vh",
        display: "flex",
        flexDirection: mob ? "column" : "row",
        alignItems: "stretch",
        overflow: "hidden",
        position: "relative",
      }}>

        {/* Décorations */}
        <div style={{ position: "absolute", top: "15%", left: "52%", width: "10px", height: "10px", borderRadius: "50%", background: C.pink, opacity: 0.7, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "8%", right: "1%", width: "14px", height: "14px", borderRadius: "50%", background: C.pink, opacity: 0.45, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "200px", height: "200px", borderRadius: "50%", background: C.pink, opacity: 0.08, zIndex: 0, pointerEvents: "none" }} />
        <svg style={{ position: "absolute", bottom: "55px", left: mob ? "30%" : "40%", zIndex: 2, pointerEvents: "none" }} width="160" height="55" viewBox="0 0 160 55">
          <path d="M0,45 Q80,-15 160,45" stroke="#FE4BC1" strokeWidth="1.5" fill="none" opacity="0.45" />
        </svg>
        <svg style={{ position: "absolute", bottom: "50px", left: mob ? "calc(30% + 75px)" : "calc(40% + 75px)", zIndex: 3, pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14">
          <path d="M7,0 L8,5.5 L14,7 L8,8.5 L7,14 L6,8.5 L0,7 L6,5.5 Z" fill="#FE4BC1" />
        </svg>

        {/* ── TEXTE ── */}
        {mob ? (
          /* Mobile : photo d'abord (en haut), puis texte */
          <>
            {/* Photo mobile */}
            <div style={{ width: "100%", height: "56vw", overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <img src={photo} alt="Vanessa Kenfack" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%" }} />
            </div>
            {/* Texte mobile */}
            <div style={{ padding: "2rem 1.5rem 3rem", textAlign: "center", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "0", flexWrap: "wrap", marginBottom: "1rem", color: C.gray, fontSize: "0.78rem" }}>
                {["Data Analyst", "Power BI", "Python · SQL", "Machine Learning"].map((b, i, arr) => (
                  <span key={b}>{b}{i < arr.length - 1 && <span style={{ margin: "0 0.5rem", color: C.border }}>·</span>}</span>
                ))}
              </div>
              <h1 style={{ fontSize: "2.6rem", fontWeight: 800, lineHeight: 1.0, marginBottom: "1rem" }}>
                Vanessa<br /><span style={{ color: C.pink }}>Kenfack</span><br />
                <span style={{ color: C.gray2, fontWeight: 300 }}>Temgoua</span>
              </h1>
              <p style={{ color: C.gray2, fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                Je transforme des données brutes en décisions concrètes. Chaque pipeline que je construis, chaque modèle que j'entraîne, chaque dashboard que je livre a un seul objectif : créer de la valeur métier mesurable.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
                <button onClick={() => setPage("projets")} style={{ background: C.pink, color: "#fff", border: "none", padding: "0.8rem 1.75rem", borderRadius: "20px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "7px", height: "7px", background: "#fff", borderRadius: "50%", display: "inline-block" }} />Voir mes projets
                </button>
                <button onClick={() => setPage("contact")} style={{ background: "transparent", color: C.white, border: `0.5px solid ${C.border}`, padding: "0.8rem 1.75rem", borderRadius: "20px", fontSize: "0.88rem", cursor: "pointer" }}>Me contacter</button>
              </div>
              <div style={{ display: "flex", gap: "2rem", justifyContent: "center", paddingTop: "1.5rem", borderTop: `0.5px solid ${C.border}` }}>
                {[["2+", "Ans exp."], ["5+", "Projets"], ["95%", "Fiabilité"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: C.pink }}>{val}</div>
                    <div style={{ fontSize: "0.65rem", color: C.gray, textTransform: "uppercase", letterSpacing: "0.06em" }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Desktop : texte gauche | photo droite */
          <>
            {/* Texte desktop */}
            <div style={{ flex: "0 0 50%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 0 4rem 3.5rem", zIndex: 1 }}>
              <div style={{ display: "flex", gap: "0", flexWrap: "wrap", marginBottom: "1.2rem", color: C.gray, fontSize: "0.8rem" }}>
                {["Data Analyst", "Power BI", "Python · SQL", "Machine Learning"].map((b, i, arr) => (
                  <span key={b}>{b}{i < arr.length - 1 && <span style={{ margin: "0 0.5rem", color: C.border }}>·</span>}</span>
                ))}
              </div>
              <h1 style={{ fontSize: "clamp(3.2rem, 5.5vw, 5.2rem)", fontWeight: 800, lineHeight: 1.0, marginBottom: "1rem" }}>
                Vanessa<br /><span style={{ color: C.pink }}>Kenfack</span><br />
                <span style={{ color: C.gray2, fontWeight: 300 }}>Temgoua</span>
              </h1>
              <p style={{ color: C.gray2, fontSize: "1rem", lineHeight: 1.8, maxWidth: "380px", marginBottom: "2rem" }}>
                Je transforme des données brutes en décisions concrètes. Chaque pipeline que je construis, chaque modèle que j'entraîne, chaque dashboard que je livre a un seul objectif : créer de la valeur métier mesurable.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                <button onClick={() => setPage("projets")} style={{ background: C.pink, color: "#fff", border: "none", padding: "0.8rem 2rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "7px", height: "7px", background: "#fff", borderRadius: "50%", display: "inline-block" }} />Voir mes projets
                </button>
                <button onClick={() => setPage("contact")} style={{ background: "transparent", color: C.white, border: `0.5px solid ${C.border}`, padding: "0.8rem 2rem", borderRadius: "20px", fontSize: "0.9rem", cursor: "pointer" }}>Me contacter</button>
              </div>
              <div style={{ display: "flex", gap: "2.5rem", paddingTop: "2rem", borderTop: `0.5px solid ${C.border}` }}>
                {[["2+", "Ans d'expérience"], ["5+", "Projets réalisés"], ["95%", "Fiabilité données"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div style={{ fontSize: "1.8rem", fontWeight: 800, color: C.pink }}>{val}</div>
                    <div style={{ fontSize: "0.7rem", color: C.gray, textTransform: "uppercase", letterSpacing: "0.06em" }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo desktop — collée au texte, alignée en haut */}
            <div style={{ flex: "0 0 50%", position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", overflow: "hidden" }}>
              <img src={photo} alt="Vanessa Kenfack"
                style={{ width: "80%", height: "80%", objectFit: "cover", objectPosition: "center 10%", display: "block" }}
                onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML += '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:4rem;font-weight:800;color:#FE4BC1">VK</div>'; }}
              />
            </div>
          </>
        )}
      </div>

      {/* ── PROFIL ── */}
      <div style={{ padding: mob ? "3rem 1.5rem" : "4rem 2.5rem", background: C.bg2, borderTop: `0.5px solid ${C.border}` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <SectionLabel>À propos</SectionLabel>
          <h2 style={{ fontSize: "1.9rem", fontWeight: 700, marginBottom: "2rem" }}>Profil</h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? "2rem" : "3rem", alignItems: "start" }}>
            <div>
              <p style={{ color: C.gray2, lineHeight: 1.85, marginBottom: "1rem" }}>Data Analyst avec 2 ans d'expérience en environnements industriels et médicaux, je produis des analyses avancées, des tableaux de bord décisionnels et des modèles Machine Learning.</p>
              <p style={{ color: C.gray2, lineHeight: 1.85, marginBottom: "1rem" }}>Maîtrisant Python et SQL, je traduis des besoins métiers complexes en solutions data concrètes et opérationnelles.</p>
              <p style={{ color: C.pink, fontSize: "0.85rem", fontWeight: 500 }}>Disponible · Mobile sur Paris et régions</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {skills.map(s => (
                <div key={s} style={{ background: C.bg3, border: `0.5px solid ${C.border}`, padding: "0.6rem 0.85rem", borderRadius: "20px" }}>
                  <span style={{ fontSize: "0.8rem", color: C.gray2 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CVPage() {
  const mob = useW() < 768;
  const exps = [
    { role: "Data Analyst · Snowflake", company: "Takenco IT", period: "Mai 2025 – Mars 2026 · 11 mois", lieu: "Distanciel", secteur: "Industrie / Manufacturing", bullets: ["SQL avancé sur Snowflake pour analyses métier", "Tableaux de bord Power BI connectés à Snowflake | fiabilité 95%, -40% temps d'analyse", "Définition des KPIs et restitution des résultats aux équipes", "Qualité et cohérence des données tout au long du cycle d'analyse"] },
    { role: "Data Analyst & IA", company: "CELEOS", period: "Juillet – Décembre 2024 · 6 mois", lieu: "Lille", secteur: "Industrie / Médical", bullets: ["+50 000 lignes de données spectrométriques structurées via Python", "Fiabilité des données à 98% (ANOVA, tests de distribution)", "3 modèles ML comparés | +15% performances prédictives", "2 dashboards interactifs Python | -40% temps d'analyse"] },
    { role: "Data Analyst", company: "McCain Foods", period: "Juin – Décembre 2023 · 7 mois", lieu: "Lille", secteur: "Agroalimentaire / Industrie", bullets: ["+100 000 lignes de données de production traitées via Python & SQL", "Contrôles qualité automatisés | 90% de taux de conformité", "2 pipelines ETL avec feature engineering | +25% accélération du traitement", "Analyse prédictive des pannes machines | -12% temps d'arrêt"] },
  ];
  const techGroups = [
    { label: "BI & Reporting", items: ["Power BI", "DAX", "Power Query", "Tableau", "Excel"] },
    { label: "SQL & Bases de données", items: ["SQL", "PL/SQL", "PostgreSQL", "Snowflake", "MongoDB"] },
    { label: "Python", items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Plotly"] },
    { label: "Data Engineering", items: ["Talend", "Airflow", "dbt", "BigQuery", "GCP"] },
    { label: "Machine Learning", items: ["Random Forest", "Régression", "ACP", "Clustering", "TensorFlow"] },
  ];
  return (
    <div style={{ padding: mob ? "2rem 1.5rem" : "3rem 2.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <SectionLabel>Curriculum Vitae</SectionLabel>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: mob ? "flex-start" : "center", flexDirection: mob ? "column" : "row", gap: "1rem", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.9rem", fontWeight: 700 }}>Parcours & Compétences</h2>
        <a href="/CV_Vanessa_Kenfack.pdf"
            download="CV_Vanessa_Kenfack.pdf"
            style={{ background: C.pink, color: "#fff", padding: "0.6rem 1.25rem", borderRadius: "20px", fontSize: "0.83rem", textDecoration: "none", fontWeight: 700 }}
        >
  Télécharger CV
        </a>
      </div>
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Expériences</SectionLabel>
        <div style={{ paddingLeft: "1.5rem", borderLeft: `0.5px solid ${C.border}`, marginTop: "1.5rem" }}>
          {exps.map((exp, i) => (
            <div key={i} style={{ marginBottom: "2.5rem", position: "relative" }}>
              <div style={{ position: "absolute", left: "-1.85rem", top: "0.3rem", width: "9px", height: "9px", background: C.pink, borderRadius: "50%" }} />
              <div style={{ fontSize: "0.72rem", color: C.pink, marginBottom: "0.2rem", fontWeight: 500 }}>{exp.period} · {exp.lieu}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.1rem" }}>{exp.role}</div>
              <div style={{ fontSize: "0.82rem", color: C.gray2, marginBottom: "0.1rem" }}>{exp.company}</div>
              <div style={{ fontSize: "0.72rem", color: C.gray, marginBottom: "0.7rem", fontStyle: "italic" }}>Secteur : {exp.secteur}</div>
              <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                {exp.bullets.map((b, j) => <li key={j} style={{ color: C.gray2, fontSize: "0.82rem", lineHeight: 1.75, marginBottom: "0.2rem" }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Outils & Technologies</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.5rem" }}>
          {techGroups.map(({ label, items }) => (
            <div key={label} style={{ background: C.bg2, border: `0.5px solid ${C.border}`, borderRadius: "16px", padding: "0.85rem 1rem", display: "grid", gridTemplateColumns: mob ? "1fr" : "150px 1fr", gap: mob ? "0.4rem" : "1rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", color: C.pink, fontWeight: 600 }}>{label}</span>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>{items.map(item => <Tag key={item}>{item}</Tag>)}</div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <SectionLabel>Formation</SectionLabel>
        <div style={{ marginTop: "1.25rem" }}>
          {[["Master Data & Intelligence Artificielle", "Université Catholique de Lille", "2025"], ["Master 1 Data Science", "Université Catholique de Lille", "2022"], ["Licence Réseaux & Systèmes d'Information", "", "2021"]].map(([diploma, school, year]) => (
            <div key={diploma} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.85rem 0", borderBottom: `0.5px solid ${C.border}`, gap: "1rem" }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: "0.88rem" }}>{diploma}</div>
                {school && <div style={{ fontSize: "0.78rem", color: C.gray, marginTop: "0.1rem" }}>{school}</div>}
              </div>
              <span style={{ fontSize: "0.78rem", color: C.pink, fontWeight: 700, flexShrink: 0 }}>{year}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjetsPage() {
  const mob = useW() < 768;
  const [filter, setFilter] = useState("Tous");
  const categories = ["Tous", "Power BI", "Python", "Excel"];
  const projects = [
    { title: "Global Superstore · Sales Performance", tags: ["Power BI", "DAX", "Power Query"], cat: "Power BI", desc: "Dashboard 3 pages : Vue d'ensemble, Analyse Produit, Analyse Géographique. KPIs N/N-1, scatter plot Remise vs Profit.", metrics: ["+51,5% CA", "3 pages", "DAX avancé"], icon: "↗" },
    { title: "Atlas Labs · HR Analytics", tags: ["Power BI", "DAX", "RH"], cat: "Power BI", desc: "Analyse RH : attrition (16,1%), démographie des effectifs, suivi individuel des performances.", metrics: ["4 pages", "1 470 employés", "16,1% attrition"], icon: "◎" },
    { title: "Churn Rate · Databel", tags: ["Power BI", "DAX", "CRM"], cat: "Power BI", desc: "Identification des facteurs de désabonnement. Segmentation par profil, type de contrat et usage.", metrics: ["Segmentation", "Power Query", "DAX"], icon: "△" },
    { title: "Analyse Financière · Apple AAPL", tags: ["Python", "ML", "Finance"], cat: "Python", desc: "Feature engineering (SMA, EMA, RSI, MACD), backtesting stratégie trading, Random Forest vs XGBoost.", metrics: ["RMSE/MAE/R²", "Backtesting", "XGBoost"], icon: "∿" },
    { title: "HR Analytics · Performances Employés", tags: ["Python", "Pandas", "Stats"], cat: "Python", desc: "Exploration des données RH, détection d'outliers, analyse des corrélations.", metrics: ["50K+ lignes", "ANOVA", "Clustering"], icon: "⬡" },
    { title: "Analyse des Ventes · Excel", tags: ["Excel", "Power Query", "TCD"], cat: "Excel", desc: "Suivi des performances commerciales par région et catégorie avec tableaux croisés dynamiques.", metrics: ["TCD", "Power Query", "Dashboard"], icon: "▦" },
  ];
  const filtered = filter === "Tous" ? projects : projects.filter(p => p.cat === filter);
  return (
    <div style={{ padding: mob ? "2rem 1.5rem" : "3rem 2.5rem", maxWidth: "1000px", margin: "0 auto" }}>
      <SectionLabel>Portfolio</SectionLabel>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: mob ? "flex-start" : "center", flexDirection: mob ? "column" : "row", gap: "1rem", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.9rem", fontWeight: 700 }}>Projets</h2>
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? C.pink : "transparent", color: filter === cat ? "#fff" : C.gray2, border: `0.5px solid ${filter === cat ? C.pink : C.border}`, padding: "0.38rem 0.85rem", borderRadius: "20px", fontSize: "0.78rem", cursor: "pointer", fontWeight: filter === cat ? 700 : 400 }}>{cat}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {filtered.map(p => (
          <div key={p.title} style={{ background: C.bg2, border: `0.5px solid ${C.border}`, borderRadius: "18px", overflow: "hidden" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.pinkBorder}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
          >
            <div style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg3, borderBottom: `0.5px solid ${C.border}`, fontSize: "2rem", color: C.pink, fontWeight: 300 }}>{p.icon}</div>
            <div style={{ padding: "1rem" }}>
              <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>{p.title}</div>
              <div style={{ fontSize: "0.78rem", color: C.gray2, lineHeight: 1.7, marginBottom: "0.7rem" }}>{p.desc}</div>
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.7rem" }}>{p.metrics.map(m => <span key={m} style={{ color: C.gray, fontSize: "0.66rem" }}>{m}</span>)}</div>
              <a href="https://github.com/vanessatemgoua/Data-portfolio" target="_blank" rel="noreferrer" style={{ color: C.pink, fontSize: "0.78rem", textDecoration: "none", fontWeight: 500 }}>Voir sur GitHub →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsPage() {
  const mob = useW() < 768;
  const certs = [
    { title: "Power BI Data Analyst Associate", org: "Microsoft", year: "2024", icon: "▲" },
    { title: "Google Data Analytics", org: "Google / Coursera", year: "2023", icon: "◆" },
    { title: "Python for Data Science", org: "IBM / Coursera", year: "2023", icon: "●" },
    { title: "SQL for Data Science", org: "UC Davis / Coursera", year: "2023", icon: "■" },
    { title: "Machine Learning Specialization", org: "Stanford / Coursera", year: "2024", icon: "◈" },
    { title: "Snowflake Data Warehouse", org: "Snowflake", year: "2025", icon: "❄" },
  ];
  return (
    <div style={{ padding: mob ? "2rem 1.5rem" : "3rem 2.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <SectionLabel>Formations</SectionLabel>
      <h2 style={{ fontSize: "1.9rem", fontWeight: 700, marginBottom: "0.75rem" }}>Certifications</h2>
      <p style={{ color: C.gray2, marginBottom: "2.5rem" }}>Certifications professionnelles obtenues pour valider mes compétences data.</p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
        {certs.map(c => (
          <div key={c.title} style={{ background: C.bg2, border: `0.5px solid ${C.border}`, borderRadius: "18px", padding: "1.25rem" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.pinkBorder}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
          >
            <div style={{ fontSize: "1.5rem", color: C.pink, marginBottom: "0.75rem" }}>{c.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{c.title}</div>
            <div style={{ fontSize: "0.78rem", color: C.gray, marginBottom: "0.75rem" }}>{c.org}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: C.pink, fontWeight: 700 }}>{c.year}</span>
              <span style={{ color: C.gray2, fontSize: "0.65rem" }}>Obtenu</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  const mob = useW() < 768;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <div style={{ padding: mob ? "2rem 1.5rem" : "3rem 2.5rem", maxWidth: "800px", margin: "0 auto" }}>
      <SectionLabel>Contact</SectionLabel>
      <h2 style={{ fontSize: "1.9rem", fontWeight: 700, marginBottom: "0.75rem" }}>Travaillons ensemble</h2>
      <p style={{ color: C.gray2, marginBottom: "3rem" }}>Data Analyst disponible pour missions, CDI ou freelance. Mobile sur Paris et régions.</p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: "2.5rem" }}>
        <div>
          <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "1.5rem" }}>Coordonnées</h3>
          {[{ label: "Email", val: "vanessa.kenfack@outlook.fr", href: "mailto:vanessa.kenfack@outlook.fr" }, { label: "Téléphone", val: "+33 7 45 68 30 36", href: "tel:+33745683036" }, { label: "Localisation", val: "France · Mobile Paris", href: null }].map(({ label, val, href }) => (
            <div key={label} style={{ display: "flex", gap: "0.75rem", padding: "0.85rem 0", borderBottom: `0.5px solid ${C.border}` }}>
              <span style={{ color: C.pink, fontSize: "0.85rem", marginTop: "0.05rem" }}>→</span>
              <div>
                <div style={{ fontSize: "0.7rem", color: C.gray, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.1rem" }}>{label}</div>
                {href ? <a href={href} style={{ color: C.pink, fontSize: "0.83rem", textDecoration: "none" }}>{val}</a> : <div style={{ color: C.gray2, fontSize: "0.83rem" }}>{val}</div>}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
            {[{ label: "LinkedIn", href: "http://www.linkedin.com/in/vanessa-kenfack-temgoua-028937248" }, { label: "GitHub", href: "https://github.com/vanessatemgoua" }].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ color: C.gray2, border: `0.5px solid ${C.border}`, padding: "0.45rem 0.9rem", borderRadius: "20px", fontSize: "0.8rem", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.pinkBorder; e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.gray2; }}
              >{label}</a>
            ))}
          </div>
        </div>
        <div>
          {sent ? (
            <div style={{ background: C.pinkDim, border: `0.5px solid ${C.pinkBorder}`, borderRadius: "18px", padding: "2rem", textAlign: "center" }}>
              <div style={{ color: C.pink, fontSize: "1.5rem", marginBottom: "0.75rem" }}>✓</div>
              <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Message envoyé !</div>
              <div style={{ color: C.gray2, fontSize: "0.83rem" }}>Je vous répondrai dans les plus brefs délais.</div>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} style={{ marginTop: "1rem", background: "transparent", color: C.pink, border: `0.5px solid ${C.pinkBorder}`, padding: "0.45rem 0.9rem", borderRadius: "20px", fontSize: "0.8rem", cursor: "pointer" }}>Nouveau message</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {[{ key: "name", label: "Nom complet", placeholder: "Votre nom", type: "text" }, { key: "email", label: "Email", placeholder: "votre@email.com", type: "email" }, { key: "subject", label: "Sujet", placeholder: "Objet du message", type: "text" }].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label style={{ fontSize: "0.7rem", color: C.gray, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.3rem" }}>{label}</label>
                  <input type={type} placeholder={placeholder} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ width: "100%", background: C.bg2, border: `0.5px solid ${C.border}`, borderRadius: "20px", padding: "0.6rem 0.85rem", color: C.white, fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.7rem", color: C.gray, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.3rem" }}>Message</label>
                <textarea placeholder="Décrivez votre projet ou opportunité..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ width: "100%", background: C.bg2, border: `0.5px solid ${C.border}`, borderRadius: "20px", padding: "0.6rem 0.85rem", color: C.white, fontSize: "0.85rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }} style={{ background: C.pink, color: "#fff", border: "none", padding: "0.75rem", borderRadius: "20px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>Envoyer</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
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

  const pages = { about: <AboutPage setPage={setPage} />, cv: <CVPage />, projets: <ProjetsPage />, certifications: <CertificationsPage />, contact: <ContactPage /> };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.white, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: "-0.03em" }}>
      {/* ── NAV ── */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: mob ? "1rem 1.5rem" : "1rem 2.5rem", borderBottom: `0.5px solid ${C.border}`, background: "rgba(8,13,26,0.98)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontSize: "1.3rem", fontWeight: 800, cursor: "pointer" }} onClick={() => setPage("about")}>VK<span style={{ color: C.pink }}>.</span></div>

        {!mob && (
          <div style={{ display: "flex", gap: "0.2rem" }}>
            {navItems.map(({ key, label }) => (
              <button key={key} onClick={() => setPage(key)} style={{ background: "transparent", color: page === key ? C.pink : C.gray, border: "none", padding: "0.4rem 0.85rem", borderRadius: "20px", fontSize: "0.8rem", cursor: "pointer", fontWeight: page === key ? 700 : 400 }}>{label}</button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {!mob && <button onClick={() => setPage("contact")} style={{ background: C.pink, color: "#fff", border: "none", padding: "0.5rem 1.25rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>Me contacter</button>}
          {mob && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px" }}>
              <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ width: "100%", height: "1.5px", background: C.white, display: "block", transition: "all 0.2s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none" }} />
                ))}
              </div>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mob && menuOpen && (
        <div style={{ background: C.bg2, borderBottom: `0.5px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem", position: "sticky", top: "57px", zIndex: 99 }}>
          {navItems.map(({ key, label }) => (
            <button key={key} onClick={() => setPage(key)} style={{ background: "transparent", color: page === key ? C.pink : C.gray2, border: "none", padding: "0.65rem 0", fontSize: "0.9rem", cursor: "pointer", fontWeight: page === key ? 700 : 400, textAlign: "left" }}>{label}</button>
          ))}
          <button onClick={() => setPage("contact")} style={{ background: C.pink, color: "#fff", border: "none", padding: "0.7rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", marginTop: "0.5rem" }}>Me contacter</button>
        </div>
      )}

      <main>{pages[page]}</main>

      <footer style={{ padding: mob ? "1.5rem" : "1.5rem 2.5rem", borderTop: `0.5px solid ${C.border}`, display: "flex", flexDirection: mob ? "column" : "row", justifyContent: "space-between", alignItems: mob ? "flex-start" : "center", gap: "0.75rem" }}>
        <span style={{ fontWeight: 800 }}>VK<span style={{ color: C.pink }}>.</span></span>
        <span style={{ fontSize: "0.75rem", color: C.gray }}>© 2026 Vanessa Kenfack Temgoua · Data Analyst</span>
        <div style={{ display: "flex", gap: "1rem" }}>
          {[{ label: "LinkedIn", href: "http://www.linkedin.com/in/vanessa-kenfack-temgoua-028937248" }, { label: "GitHub", href: "https://github.com/vanessatemgoua" }].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ color: C.gray, fontSize: "0.75rem", textDecoration: "none" }}>{label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}