import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getBriefing } from '../data/briefings';
import BriefingContent from './BriefingContent';

interface BriefingModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any | null;
  onClose: () => void;
}

export default function BriefingModal({ project, onClose }: BriefingModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!project) { setMounted(false); return; }
    const t = requestAnimationFrame(() => setMounted(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(t);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const briefing = getBriefing(project.slug, project);

  const node = (
    <div className={`brief-overlay ${mounted ? 'open' : ''}`} role="dialog" aria-modal="true">
      <div className="brief-scrim" onClick={onClose} />
      <div className="brief-sheet panel-inset">
        <BriefingContent project={project} briefing={briefing} onClose={onClose} variant="modal" />
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
