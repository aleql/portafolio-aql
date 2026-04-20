import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolio';
import { getBriefing } from '../data/briefings';
import BriefingContent from '../components/BriefingContent';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const project = (projects as any[]).find(p => p.slug === slug);
  if (!project) {
    return (
      <div className="brief-overlay open" style={{ position: 'relative', minHeight: '80vh' }}>
        <div className="brief-sheet panel-inset" style={{ textAlign: 'center', padding: 60 }}>
          <div className="label-strip" style={{ marginBottom: 14 }}>ERR 404</div>
          <h1 className="stencil" style={{ color: 'var(--alert)' }}>DOSSIER NOT ON FILE</h1>
          <p style={{ color: 'var(--bone-dim)', marginTop: 12 }}>No project matches slug "{slug}".</p>
          <button className="bevel-btn primary" onClick={() => navigate('/')} style={{ marginTop: 20 }}>
            <span>Return to Console</span><span className="kbd">⌂</span>
          </button>
        </div>
      </div>
    );
  }

  const briefing = getBriefing(slug!, project);

  return (
    <div className="brief-overlay open" style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="brief-sheet panel-inset">
        <BriefingContent project={project} briefing={briefing} variant="page" />
      </div>
    </div>
  );
}
