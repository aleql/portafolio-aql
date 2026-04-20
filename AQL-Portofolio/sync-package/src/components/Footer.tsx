import { personalInfo } from '../data/portfolio';
import Rivet from './hero/Rivet';

export default function Footer() {
  return (
    <>
      <section id="contact" className="section">
        <div className="panel-inset contact">
          <Rivet pos={{ top: 10, left: 10 }} />
          <Rivet pos={{ top: 10, right: 10 }} />
          <Rivet pos={{ bottom: 10, left: 10 }} />
          <Rivet pos={{ bottom: 10, right: 10 }} />
          <div className="label-strip" style={{ marginBottom: 12 }}>TRANSMIT</div>
          <h3>ESTABLISH CONTACT</h3>
          <p style={{ color: 'var(--bone-dim)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '4px 0 0' }}>
            Open to gameplay, backend, and HCI roles · freelance considered
          </p>
          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`} className="primary">✉ Email</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
            )}
          </div>
        </div>
        <div className="site-footer">
          // END OF TRANSMISSION // AQL.CMD // BUILD 26.04 // {new Date().getFullYear()}
        </div>
      </section>
    </>
  );
}
