import { education, researchRoles } from '../data/portfolio';
import SectionHead from './common/SectionHead';

export default function Education() {
  return (
    <section id="education" className="section">
      <SectionHead tag="05 / CREDENTIALS" title={<>EDUCATION & <span className="amberpart">RESEARCH</span></>} subtitle="Training record · degrees and active research roles" />
      <div className="edu-grid">
        {education.map((e, i) => (
          <div key={i} className="panel-inset edu-card">
            <h3 className="edu-deg">{e.degree}</h3>
            <div className="edu-inst">{e.institution}</div>
            <div className="edu-period">{e.period}</div>
            {e.honors && <span className="edu-honor">★ {e.honors}</span>}
            {e.description && <p className="edu-summary">{e.description}</p>}
            {e.focus && e.focus.length > 0 && (
              <div style={{ marginTop: 12 }}>
                {e.focus.slice(0, 5).map((f, j) => <span key={j} className="tech-pill" style={{ fontSize: 9 }}>{f}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>

      {researchRoles && researchRoles.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <div className="label-strip" style={{ marginBottom: 14 }}>ACTIVE RESEARCH ROLES</div>
          <div className="edu-grid">
            {researchRoles.map((r, i) => (
              <div key={i} className="panel-inset edu-card">
                <h3 className="edu-deg" style={{ fontSize: 14 }}>{r.title}</h3>
                <div className="edu-inst" style={{ fontSize: 11 }}>{r.institution}</div>
                <div className="edu-period">{r.period}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
