import { experiences } from '../data/portfolio';
import SectionHead from './common/SectionHead';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHead tag="03 / Background LOG" title={<>EXPERIENCE <span className="amberpart"></span></>} subtitle="chronological, newest first" />
      <div className="timeline">
        {experiences.map((e, i) => (
          <div key={i} className="tl-item">
            <div className="tl-node" />
            <div className="panel-inset" style={{ padding: '14px 18px 16px' }}>
              <div className="tl-row">
                <div>
                  <h3 className="tl-role">{e.role}</h3>
                  <div className="tl-company">{e.company}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="tl-period">{e.period}</div>
                  {e.location && <div className="tl-loc">{e.location}</div>}
                </div>
              </div>
              {Array.isArray(e.description) ? (
                <ul style={{ margin: '10px 0', paddingLeft: 18, color: 'var(--bone)', fontSize: 13, lineHeight: 1.6 }}>
                  {e.description.map((d: string, j: number) => <li key={j} style={{ marginBottom: 4 }}>{d}</li>)}
                </ul>
              ) : (
                <p className="tl-summary">{e.description}</p>
              )}
              <div>
                {(e.technologies || []).map((t: string, j: number) => <span key={j} className="tech-pill amber">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
