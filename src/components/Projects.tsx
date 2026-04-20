import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolio';
import SectionHead from './common/SectionHead';
import Rivet from './hero/Rivet';
import BriefingModal from './BriefingModal';

// Hook: true if viewport is desktop (>= 900px). Updates on resize.
function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    typeof window === 'undefined' ? true : window.innerWidth >= 900
  );
  useEffect(() => {
    const onR = () => setDesktop(window.innerWidth >= 900);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  return desktop;
}

export default function Projects() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const list = (projects as any[]).filter(p => p.featured && !p.hidden);
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [active, setActive] = useState<any | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openBriefing = (p: any) => {
    if (isDesktop) {
      setActive(p);
    } else {
      navigate(`/project/${p.slug}`);
    }
  };

  return (
    <section id="projects" className="section">
      {/* <SectionHead tag="02 / TARGETS" title={<>NOTABLE <span className="amberpart">PROJECTS</span></>} subtitle="Selected missions · therapy, games, data pipelines" /> */}
      <div className="projects-grid">
        {list.map((p, i) => <ProjectCard key={i} p={p} onOpen={() => openBriefing(p)} />)}
      </div>

      {/* Desktop modal overlay. On mobile, nav goes to the route. */}
      <BriefingModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

// Project type is loose to tolerate whatever portfolio.ts ships.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProjectCard({ p, onOpen }: { p: any; onOpen: () => void }) {
  // Support every image-field name we've seen in the wild.
  const image =
    p.images?.[0] ||
    p.image ||
    p.thumbnail ||
    p.cover ||
    p.heroImage ||
    (p.slug ? `/portafolio-aql/projects/${p.slug}/gallery-1.png` : '');

  const tag = p.tag || (p.technologies?.slice(0, 2).join(' / ') ?? '').toUpperCase();
  const year = p.year || p.duration || '';
  const coord = p.coordinates || '—';

  const photoStyle: React.CSSProperties = image
    ? { backgroundImage: `url(${image})` }
    : { background: 'linear-gradient(135deg, rgba(68,212,194,0.12), rgba(255,179,71,0.08))' };

  return (
    <article className="metal-card">
      <Rivet pos={{ top: 8, left: 8 }} className="sm" />
      <Rivet pos={{ top: 8, right: 8 }} className="sm" />
      <div className="photo" style={photoStyle}>
        {!image && <div className="photo-placeholder mono">NO IMAGE</div>}
        <span className="proj-tag stamp">{tag}</span>
        {year && (
          <div style={{ position: 'absolute', bottom: 10, right: 12, zIndex: 2 }}>
            <span className="label-strip">{year}</span>
          </div>
        )}
      </div>
      <div className="body">
        <h3 className="proj-title">{p.title}</h3>
        <div className="proj-sub">{p.subtitle}</div>
        <p className="proj-desc">{p.description}</p>
        <div>
          {(p.technologies || []).slice(0, 6).map((t: string, i: number) => <span key={i} className="tech-pill">{t}</span>)}
        </div>
        <div className="proj-meta">
          <span className="k">ROLE</span><span>{(p.role || []).join(' · ')}</span>
        </div>
        <div className="proj-actions">
          {p.liveUrl && <a className="btn-sm primary" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Live ↗</a>}
          <button type="button" className="btn-sm" onClick={onOpen}>Details</button>
        </div>
      </div>
    </article>
  );
}
