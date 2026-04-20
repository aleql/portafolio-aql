import { skills } from '../data/portfolio';
import SectionHead from './common/SectionHead';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHead tag="04 / LOADOUT" title={<>TECHNICAL <span className="amberpart">SKILLS</span></>} subtitle="Equipped systems · engines, languages, infrastructure" />
      <div className="skills-grid">
        {skills.map((c, i) => (
          <div key={i} className="panel-inset skill-card">
            <div className="skill-head">
              <span className="led amber blink" />
              <h3 className="skill-cat">{c.category}</h3>
            </div>
            <div>
              {c.items.map((s, j) => <span key={j} className="tech-pill">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
