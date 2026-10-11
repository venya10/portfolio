// Command registry for the interactive prompt.
// Each command gets (args, ctx) and returns JSX/text to print (or nothing).
import Neofetch from "./components/Neofetch.jsx";
import SensorChart from "./components/SensorChart.jsx";
import {
  Contact,
  Education,
  Experience,
  Project,
  ProjectList,
  Projects,
  Skills,
  Whoami,
} from "./components/Sections.jsx";
import { profile, projects, themes } from "./data.js";

const open = (url) => window.open(url, "_blank", "noopener");

export const commands = {
  help: {
    desc: "list available commands",
    run: () => (
      <dl className="help">
        {Object.entries(commands)
          .filter(([, c]) => c.desc)
          .map(([name, c]) => (
            <div key={name}>
              <dt className="accent">{name}</dt>
              <dd>{c.desc}</dd>
            </div>
          ))}
        <div className="dim help-tip">
          tip: <kbd>tab</kbd> completes, <kbd>↑</kbd>/<kbd>↓</kbd> walk history. there may be a few
          hidden commands.
        </div>
      </dl>
    ),
  },
  whoami: { desc: "who is this person?", run: () => <Whoami /> },
  neofetch: { desc: "system info, but it's me", run: () => <Neofetch /> },
  experience: { desc: "git log of where I've worked", run: () => <Experience /> },
  projects: { desc: "things I've built", run: () => <Projects /> },
  ls: { run: () => <ProjectList /> },
  open: {
    desc: "open <project> — details for one project",
    args: () => projects.map((p) => p.slug),
    run: ([slug]) => {
      const p = projects.find((x) => x.slug === slug);
      if (!slug) return <span>usage: open &lt;project&gt;. try <span className="accent">ls</span></span>;
      if (!p) return <span className="err">open: {slug}: no such project</span>;
      return <Project p={p} last />;
    },
  },
  skills: { desc: "languages, tools, and ML toolkit", run: () => <Skills /> },
  education: { desc: "degrees and certifications", run: () => <Education /> },
  anomaly: { desc: "live anomaly-detection demo", run: () => <SensorChart /> },
  contact: { desc: "how to reach me", run: () => <Contact /> },
  resume: {
    desc: "open my resume (pdf)",
    run: () => {
      open(profile.resume);
      return <span>opening resume.pdf …</span>;
    },
  },
  theme: {
    desc: `theme <name> — ${themes.join(" | ")}`,
    args: () => themes,
    run: ([name], ctx) => {
      if (!name) return <span>current theme: <span className="accent">{ctx.theme}</span>. available: {themes.join(", ")}</span>;
      if (!themes.includes(name)) return <span className="err">theme: unknown theme '{name}'</span>;
      ctx.setTheme(name);
      return <span>theme set to <span className="accent">{name}</span></span>;
    },
  },
  history: {
    desc: "commands you've run",
    run: (_, ctx) =>
      ctx.history.length ? (
        <pre>{ctx.history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n")}</pre>
      ) : (
        <span className="dim">no history yet</span>
      ),
  },
  clear: { desc: "clear the terminal", run: (_, ctx) => ctx.clear() },

  // ---- not listed in help ----
  date: { run: () => new Date().toString() },
  pwd: { run: () => "/home/venya/portfolio" },
  echo: { run: (args) => args.join(" ") },
  github: { run: () => (open(profile.github), "opening github …") },
  linkedin: { run: () => (open(profile.linkedin), "opening linkedin …") },
  email: { run: () => ((window.location.href = `mailto:${profile.email}`), "opening mail client …") },
  sudo: {
    run: (args) => {
      if (args.join(" ") === "hire venya") {
        setTimeout(() => (window.location.href = `mailto:${profile.email}?subject=Let's%20talk`), 1400);
        return (
          <pre>
            {"[sudo] password for recruiter: ********\n"}
            <span className="ok">permission granted ✓</span>
            {"\nexcellent decision. opening mail client …"}
          </pre>
        );
      }
      return "visitor is not in the sudoers file. this incident will be reported. (try: sudo hire venya)";
    },
  },
  rm: {
    run: (args) =>
      args.includes("-rf") ? "nice try. this portfolio is mounted read-only." : "rm: permission denied",
  },
  exit: { run: () => "you can't leave yet — the build is still running." },
  vim: { run: () => "you are now trapped in vim. just kidding. (:q! works everywhere else)" },
  coffee: { run: () => "error 418: I'm a teapot" },
  hello: { run: () => "hey! type 'help' to look around." },
  hi: { run: () => commands.hello.run() },
  cat: {
    run: ([file]) =>
      file === "resume.pdf" ? commands.resume.run() : <span className="err">cat: {file || "?"}: try 'help' instead</span>,
  },
  cd: { run: () => "there's only one directory here, and you're in it." },
};

export function complete(input) {
  const parts = input.trimStart().split(/\s+/);
  if (parts.length <= 1) {
    const matches = Object.keys(commands).filter((c) => commands[c].desc && c.startsWith(parts[0]));
    return matches.length === 1 ? `${matches[0]} ` : null;
  }
  const cmd = commands[parts[0]];
  if (!cmd?.args) return null;
  const matches = cmd.args().filter((a) => a.startsWith(parts[1]));
  return matches.length === 1 ? `${parts[0]} ${matches[0]}` : null;
}

export function run(input, ctx) {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) return null;
  const cmd = commands[name.toLowerCase()];
  if (!cmd) {
    return (
      <span>
        <span className="err">command not found: {name}</span>. type <span className="accent">help</span> to see
        what's available.
      </span>
    );
  }
  return cmd.run(args, ctx);
}
