import { fetchInfo, profile } from "../data.js";

const LOGO = String.raw`██╗   ██╗ ██████╗
██║   ██║██╔════╝
██║   ██║██║
╚██╗ ██╔╝██║
 ╚████╔╝ ╚██████╗
  ╚═══╝   ╚═════╝`;

export default function Neofetch() {
  const title = `${profile.handle}@portfolio`;
  return (
    <div className="neofetch">
      <pre className="logo" aria-hidden="true">
        {LOGO}
      </pre>
      <div>
        <div>
          <span className="accent">{profile.handle}</span>@<span className="accent">portfolio</span>
        </div>
        <div className="dim" aria-hidden="true">
          {"-".repeat(title.length)}
        </div>
        <dl className="fetch">
          {fetchInfo.map(([k, v]) => (
            <div key={k}>
              <dt className="accent">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div>
            <dt className="accent">Status</dt>
            <dd>
              <span className="live-dot" /> {profile.status}
            </dd>
          </div>
        </dl>
        <div className="swatches" aria-hidden="true">
          {["--c0", "--c1", "--c2", "--c3", "--c4", "--c5", "--c6", "--c7"].map((c) => (
            <span key={c} style={{ background: `var(${c})` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
