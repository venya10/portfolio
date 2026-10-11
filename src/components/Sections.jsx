// Output blocks shared by the scrolling page and the interactive prompt.
import { certifications, education, experience, profile, projects, skills } from "../data.js";

export function Links() {
  return (
    <div className="links">
      <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
        [ resume.pdf ]
      </a>
      <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
        [ github ]
      </a>
      <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
        [ linkedin ]
      </a>
      <a className="btn" href={`mailto:${profile.email}`}>
        [ email ]
      </a>
    </div>
  );
}

export function Whoami({ heading = false }) {
  const Name = heading ? "h1" : "div";
  return (
    <div className="whoami">
      <Name className="name">{profile.name}</Name>
      <div className="role">
        <span className="accent">{profile.role}</span> <span className="dim">·</span> {profile.location}
      </div>
      <p className="tagline">{profile.tagline}</p>
      <div className="status-line">
        <span className="live-dot" /> {profile.status}
      </div>
      <Links />
    </div>
  );
}

export function Experience() {
  return (
    <ol className="gitlog">
      {experience.map((job, i) => (
        <li key={job.hash} className={i === experience.length - 1 ? "last" : undefined}>
          <div className="commit">
            <span className="accent node">*</span>
            <span className="hash">{job.hash}</span>
            {job.head && (
              <span className="refs">
                (<span className="accent">HEAD → now</span>)
              </span>
            )}
            <h3>
              {job.role} <span className="dim">@</span> <span className="accent">{job.company}</span>
            </h3>
          </div>
          <div className="commit-body">
            <div className="dim">Date: {job.period}</div>
            <ul>
              {job.points.map((pt) => (
                <li key={pt.slice(0, 30)}>{pt}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ProjectList() {
  return (
    <div className="ls">
      {projects.map((p) => (
        <a key={p.slug} href={`#project-${p.slug}`} className="dir">
          {p.slug}/
        </a>
      ))}
    </div>
  );
}

export function Project({ p, last, anchor }) {
  return (
    <article className={`project${last ? " last" : ""}`} id={anchor ? `project-${p.slug}` : undefined}>
      <div className="tree-head">
        <span className="dim">{last ? "└── " : "├── "}</span>
        <h3 className="accent">{p.slug}/</h3>
        <span className="dim title-hint"> # {p.title}</span>
      </div>
      <div className="tree-body">
        <p>{p.description}</p>
        {p.metrics && (
          <div className="metrics">
            {p.metrics.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
        <div className="stack">
          <span className="dim">stack:</span> {p.stack.join(" · ")}
        </div>
        {p.links && (
          <div className="proj-links">
            {p.links.map(([label, url]) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                [ {label} ↗ ]
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects({ anchor = false }) {
  return (
    <div className="tree">
      <div className="accent">projects/</div>
      {projects.map((p, i) => (
        <Project key={p.slug} p={p} last={i === projects.length - 1} anchor={anchor} />
      ))}
      <div className="dim more">
        # more on{" "}
        <a href={profile.github} target="_blank" rel="noreferrer" className="accent">
          github.com/venya10 ↗
        </a>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <dl className="skills">
      {Object.entries(skills).map(([group, items]) => (
        <div key={group}>
          <dt className="accent">--{group}</dt>
          <dd>
            {items.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Education() {
  return (
    <div className="edu">
      {education.map((e) => (
        <div key={e.school} className="edu-item">
          <div>
            <span className="accent">{e.school}</span> <span className="dim">· {e.period}</span>
          </div>
          <div>{e.degree}</div>
          <div className="dim">{e.detail}</div>
        </div>
      ))}
      <div className="edu-item">
        <div className="accent">certifications</div>
        {certifications.map((c) => (
          <div key={c}>
            <span className="dim">- </span>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const rows = [
    ["email", `mailto:${profile.email}`, profile.email],
    ["linkedin", profile.linkedin, "in/venya-chowdhery"],
    ["github", profile.github, "github.com/venya10"],
    ["resume", profile.resume, "resume.pdf"],
  ];
  return (
    <div className="contact">
      <p>
        Open to AI / ML engineering roles and interesting problems. The fastest way to reach me is email.
      </p>
      <dl>
        {rows.map(([k, href, label]) => (
          <div key={k}>
            <dt className="dim">{k}</dt>
            <dd>
              <a href={href} target={k === "email" ? undefined : "_blank"} rel="noreferrer">
                {label}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
