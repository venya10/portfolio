import { useEffect } from "react";
import NodeField from "./components/NodeField.jsx";
import { certifications, education, experience, profile, projects, skills } from "./data.js";

const nav = [
  ["about", "About"],
  ["work", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

// Fade sections in as they scroll into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionHead({ index, title }) {
  return (
    <header className="section-head">
      <span className="mono">{index}</span>
      <h2>{title}</h2>
    </header>
  );
}

export default function App() {
  useReveal();

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <nav className="topbar" aria-label="Primary">
        <a href="#top" className="brand">
          vc<span>.</span>
        </a>
        <ul>
          {nav.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <header className="hero" id="top">
        <NodeField />
        <div className="hero-inner">
          <p className="mono eyebrow">
            <span className="dot" /> {profile.role} · {profile.location}
          </p>
          <h1>
            Venya <em>Chowdhery</em>
          </h1>
          <p className="lede">{profile.tagline}</p>
          <div className="actions">
            <a className="btn primary" href="#projects">
              See my work
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
          </div>
        </div>
        <a className="scroll-cue mono" href="#about" aria-label="Scroll to About">
          scroll ↓
        </a>
      </header>

      <main id="main">
        <section id="about" className="section reveal">
          <SectionHead index="01" title="About" />
          <div className="about-grid">
            <div className="prose">
              {profile.about.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <dl className="facts">
              <div>
                <dt className="mono">Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt className="mono">Studied</dt>
                <dd>B.E. Computer Science, BITS Pilani Dubai</dd>
              </div>
              <div>
                <dt className="mono">Focus</dt>
                <dd>Anomaly detection, LLM systems, automation</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="work" className="section reveal">
          <SectionHead index="02" title="Experience" />
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company} className="job">
                <div className="job-meta mono">{job.period}</div>
                <div>
                  <h3>
                    {job.role} <span className="at">@ {job.company}</span>
                  </h3>
                  <ul>
                    {job.points.map((pt) => (
                      <li key={pt.slice(0, 24)}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="section reveal">
          <SectionHead index="03" title="Selected projects" />
          <div className="projects">
            {projects.map((p, i) => (
              <article key={p.title} className="card">
                <div className="card-top">
                  <span className="mono num">{String(i + 1).padStart(2, "0")}</span>
                  {p.stat && (
                    <span className="stat">
                      <strong>{p.stat.value}</strong>
                      <span className="mono">{p.stat.label}</span>
                    </span>
                  )}
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <p className="muted">{p.detail}</p>
                <div className="card-foot">
                  <ul className="tags">
                    {p.tags.map((t) => (
                      <li key={t} className="mono">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {p.link && (
                    <a className="mono card-link" href={p.link} target="_blank" rel="noreferrer">
                      code ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section reveal">
          <SectionHead index="04" title="Skills & education" />
          <div className="skills-grid">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <h3 className="mono group">{group}</h3>
                <ul className="chips">
                  {items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="edu-grid">
            {education.map((e) => (
              <div key={e.school} className="edu">
                <span className="mono">{e.period}</span>
                <h3>{e.school}</h3>
                <p>{e.degree}</p>
                <p className="muted">{e.detail}</p>
              </div>
            ))}
            <div className="edu">
              <span className="mono">Certifications</span>
              <ul className="certs">
                {certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <SectionHead index="05" title="Contact" />
          <p className="big">
            Open to AI / ML roles and interesting problems.{" "}
            <a href={`mailto:${profile.email}`}>Say hello →</a>
          </p>
          <ul className="links">
            <li>
              <a href={`mailto:${profile.email}`}>
                <span className="mono">Email</span>
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <span className="mono">LinkedIn</span>
                venya-chowdhery ↗
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <span className="mono">GitHub</span>
                venya10 ↗
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer mono">
        <span>© {new Date().getFullYear()} Venya Chowdhery</span>
        <a href="#top">back to top ↑</a>
      </footer>
    </>
  );
}
