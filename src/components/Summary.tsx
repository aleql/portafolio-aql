import { professionalSummary, coreStrengths } from '../data/portfolio';
import SectionHead from './common/SectionHead';

export default function Summary() {
  return (
    <section id="summary" className="section">
      <SectionHead tag="01 / Resume" title={<>ABOUT <span className="amberpart">ME</span></>} subtitle="Background briefing" />
      <div className="about-grid">
        <div className="panel-inset about-card">
          <p>{professionalSummary}</p>
        </div>
        <div className="panel-inset about-card">
          <div className="label-strip" style={{ marginBottom: 12 }}>CORE STRENGTHS</div>
          <ul className="strengths-list">
            {coreStrengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
