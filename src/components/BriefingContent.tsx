import { X } from 'lucide-react';
import type { Briefing } from '../data/briefings';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
  briefing: Briefing;
  onClose?: () => void;
  variant: 'modal' | 'page';
}

/**
 * Shared body for the briefing dossier — used by BOTH the modal (desktop)
 * and the full-page route (mobile). Keeps the dossier identical between
 * the two; only the outer chrome differs.
 */
export default function BriefingContent({ project, briefing, onClose, variant }: Props) {
  const images: string[] = project.images ?? (project.image ? [project.image] : []);
  const heroShot = images[0];
  const gallery = images.slice(1);

  const statusAccent =
    briefing.status === 'ACTIVE' || briefing.status === 'ONGOING' ? 'accent-phosphor' :
    briefing.status === 'SHIPPED' ? 'accent-amber' : 'accent-alert';

  return (
    <>
      {/* HEAD */}
      <div className="brief-head">
        <div className="brief-head-left">
          <div className="brief-class">{briefing.classification}</div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', color: 'var(--bone-dim)' }}>
            DOSSIER · {project.slug?.toUpperCase()}
          </div>
        </div>
        <div className="brief-head-center">
          <h1 className="stencil brief-codename">{briefing.codename}</h1>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.18em', color: 'var(--bone)' }}>
            {project.title ?? project.slug}
          </div>
        </div>
        <div className="brief-head-right">
          {variant === 'modal' && onClose && (
            <button className="brief-close" onClick={onClose} aria-label="Close briefing">
              <X size={14} /> <span>CLOSE</span> <span className="kbd">ESC</span>
            </button>
          )}
          {variant === 'page' && (
            <a className="brief-close" href="/?section=projects" aria-label="Return">
              <span>RETURN</span>
            </a>
          )}
        </div>
      </div>

      {/* META STRIP */}
      <div className="brief-meta panel-inset">
        <div className="brief-meta-cell">
          <div className="brief-meta-k">Status</div>
          <div className={`brief-meta-v ${statusAccent}`}>{briefing.status}</div>
        </div>
        <div className="brief-meta-cell">
          <div className="brief-meta-k">Duration</div>
          <div className="brief-meta-v">{briefing.duration}</div>
        </div>
        <div className="brief-meta-cell">
          <div className="brief-meta-k">Sector</div>
          <div className="brief-meta-v accent-phosphor">{briefing.sector}</div>
        </div>
        <div className="brief-meta-cell">
          <div className="brief-meta-k">Location</div>
          <div className="brief-meta-v">{briefing.coordinates}</div>
        </div>
        <div className="brief-meta-cell">
          <div className="brief-meta-k">Role</div>
          <div className="brief-meta-v">{briefing.role[0] ?? '—'}</div>
        </div>
      </div>

      {/* BODY */}
      <div className="brief-body">
        <div className="brief-col-main">
          {/* Objective */}
          <section>
            <div className="brief-section-head">
              <h2 className="brief-section-title">§ 01 · OBJECTIVE</h2>
              <div className="brief-section-bar" />
            </div>
            <p className="brief-lede">{briefing.objective}</p>
          </section>

          {/* Narrative sections */}
          {briefing.sections.map((s, i) => (
            <section key={i}>
              <div className="brief-section-head">
                <h2 className="brief-section-title">
                  § {String(i + 2).padStart(2, '0')} · {s.heading.toUpperCase()}
                </h2>
                <div className="brief-section-bar" />
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--bone)', margin: 0 }}>
                {s.body}
              </p>
            </section>
          ))}

          {/* Field imagery */}
          {(heroShot || gallery.length > 0) && (
            <section>
              <div className="brief-section-head">
                <h2 className="brief-section-title">
                  § {String(briefing.sections.length + 2).padStart(2, '0')} · FIELD IMAGERY
                </h2>
                <div className="brief-section-bar" />
              </div>
              <div className="brief-gallery">
                {[heroShot, ...gallery].filter(Boolean).map((src, i) => (
                  <figure key={i} className="brief-shot panel-inset">
                    <img src={src} alt={`${project.title ?? project.slug} ${i + 1}`} loading="lazy" />
                    <figcaption>IMG-{String(i + 1).padStart(2, '0')}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="brief-col-side">
          {briefing.metrics && briefing.metrics.length > 0 && (
            <div className="brief-side-card panel-inset">
              <div className="label-strip">METRICS</div>
              <ul className="brief-intel">
                {briefing.metrics.map((m, i) => (
                  <li key={i}>
                    <span className="bullet">▸</span>
                    <span style={{ flex: 1 }}>{m.label}</span>
                    <span style={{ color: 'var(--phosphor)', fontWeight: 700 }}>{m.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="brief-side-card panel-inset">
            <div className="label-strip">Relevant Technologies</div>
            <div className="brief-stack">
              {briefing.stack.map((t, i) => <span key={i} className="tech-pill">{t}</span>)}
            </div>
          </div>

          <div className="brief-side-card panel-inset">
            <div className="label-strip">ROLE</div>
            <ul className="brief-role-list">
              {briefing.role.map((r, i) => (
                <li key={i}><span style={{ color: 'var(--amber)' }}>▸</span> {r}</li>
              ))}
            </ul>
          </div>

          {project.liveUrl && (
            <div className="brief-side-card panel-inset">
              <div className="label-strip">COMMS</div>
              <div className="brief-links">
                <a className="bevel-btn primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span>Live Deployment</span><span className="kbd">↗</span>
                </a>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* FOOT */}
      <div className="brief-foot">
        <span>// END OF DOSSIER //</span>
        <span>AQL.CMD · BUILD 26.04 · ©{new Date().getFullYear()}</span>
      </div>
    </>
  );
}
