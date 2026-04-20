import { useEffect, useRef, useCallback } from 'react';

export interface RadarBlip {
  slug: string;
  sector: string;
  angle: number;
  dist: number;
  title: string;
}

export interface RadarSector {
  key: string;
  label: string;
  startDeg: number;
  endDeg: number;
  color: string;
}

export const SECTORS: RadarSector[] = [
  { key: 'game',      label: 'GAME DEV',       startDeg: 318, endDeg: 42,  color: '#ff4d4d' },
  { key: 'backend',   label: 'BACKEND',        startDeg: 54,  endDeg: 138, color: '#44d4c2' },
  { key: 'research',  label: 'HCI / RESEARCH', startDeg: 150, endDeg: 234, color: '#ffb347' },
  { key: 'fullstack', label: 'FULL-STACK',     startDeg: 246, endDeg: 306, color: '#a3d86a' },
];

export const PROJECT_BLIPS: RadarBlip[] = [
  { slug: 'claws-cue-balls', sector: 'game',      angle: 0,   dist: 0.72, title: 'Claws & Cue Balls' },
  { slug: 'rock-goblin',     sector: 'game',      angle: 30,  dist: 0.55, title: 'Rock & Goblin' },
  { slug: 'sinapp',          sector: 'game',      angle: 340, dist: 0.86, title: 'Sinapp' },
  { slug: 'coaniquem',       sector: 'game',      angle: 15,  dist: 0.65, title: 'COANIQUEM' },
  { slug: 'mdv',             sector: 'backend',   angle: 72,  dist: 0.82, title: 'MDV' },
  { slug: 'alerce',          sector: 'backend',   angle: 110, dist: 0.65, title: 'ALeRCE' },
  { slug: 'education-platform', sector: 'backend', angle: 128, dist: 0.42, title: 'Edu Platform' },
  { slug: 'eye-search',      sector: 'research',  angle: 175, dist: 0.88, title: 'Eye-Search' },
  { slug: 'readright',       sector: 'research',  angle: 205, dist: 0.68, title: 'ReadRight' },
];

const SWEEP_DEG_PER_SEC = 32;
const TRAIL_DEG = 70;
const BLIP_PERSIST_MS = 6500;

function diffDeg(a: number, b: number): number {
  return ((b - a + 540) % 360) - 180;
}

interface RadarProps {
  size?: number;
  onActivePing?: (blip: RadarBlip) => void;
  activeSectorKey?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projects?: any[];
}

export default function Radar({ size = 520, onActivePing, activeSectorKey, projects = [] }: RadarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const sweepRef = useRef(0);
  const lastRef = useRef(0);
  const pingRef = useRef<Map<string, number>>(new Map());
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const selectedBlipsRef = useRef<string[]>([]);
  const selectedImagesRef = useRef<Map<string, string>>(new Map()); // slug -> imageUrl
  const lastSelectionTimeRef = useRef(0); // Track last selection time

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canvas.width || !canvas.height) {
      const wrap = canvas.parentElement;
      const s = Math.min(wrap?.offsetWidth || size, wrap?.offsetHeight || size) || size;
      canvas.width = s; canvas.height = s;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) / 2 - 6;

    // Select 2 random blips every 10 seconds
    const sweep = sweepRef.current;
    const now = performance.now();
    const TIME_BETWEEN_SELECTIONS = 10000; // 10 seconds

    // Initialize or update selection every 10 seconds
    if (now - lastSelectionTimeRef.current >= TIME_BETWEEN_SELECTIONS) {
      lastSelectionTimeRef.current = now;
      const shuffled = [...PROJECT_BLIPS].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 2);
      selectedBlipsRef.current = selected.map(b => b.slug);

      console.log('🎯 New selection (10s interval), selected blips:', selected.map(s => s.slug));

      // Select gallery-1.png for each selected blip
      selectedImagesRef.current.clear();
      selected.forEach(blip => {
        const project = projects.find(p => p.slug === blip.slug);
        if (project) {
          let imageUrl = '';
          // Always use gallery-1.png (first image) if available
          if (project.images && project.images.length > 0) {
            imageUrl = project.images[0]; // Always use first image (gallery-1)
          } else {
            // Fallback to default gallery-1.png
            imageUrl = `/portafolio-aql/projects/${blip.slug}/gallery-1.png`;
          }
          selectedImagesRef.current.set(blip.slug, imageUrl);
          console.log('📷 Selected image for', blip.slug, ':', imageUrl);

          // Preload image
          if (!imageCache.current.has(imageUrl)) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              console.log('✅ Image loaded:', imageUrl);
            };
            img.onerror = () => {
              console.error('❌ Image failed to load:', imageUrl);
            };
            imageCache.current.set(imageUrl, img);
          }
        } else {
          console.warn('⚠️ No project found for slug:', blip.slug);
        }
      });
    }

    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R);
    bg.addColorStop(0, 'rgba(68, 212, 194, 0.12)');
    bg.addColorStop(0.7, 'rgba(68, 212, 194, 0.04)');
    bg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = 'rgba(68, 212, 194, 0.22)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (R * i) / 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(68, 212, 194, 0.12)';
    for (let d = 0; d < 360; d += 30) {
      const a = (d - 90) * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(68, 212, 194, 0.55)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const [lbl, d] of [['N', 0], ['E', 90], ['S', 180], ['W', 270]] as const) {
      const a = ((d as number) - 90) * Math.PI / 180;
      ctx.fillText(lbl as string, cx + (R - 14) * Math.cos(a), cy + (R - 14) * Math.sin(a));
    }

    SECTORS.forEach(s => {
      const start = s.startDeg, end = s.endDeg;
      const mid = (start <= end) ? (start + end) / 2 : ((start + end + 360) / 2) % 360;
      const a = (mid - 90) * Math.PI / 180;
      ctx.save();
      ctx.fillStyle = s.color + 'a0';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(s.label, cx + (R * 0.88) * Math.cos(a), cy + (R * 0.88) * Math.sin(a));
      ctx.restore();
    });

    if (activeSectorKey) {
      const s = SECTORS.find(x => x.key === activeSectorKey);
      if (s) {
        const a0 = (s.startDeg - 90) * Math.PI / 180;
        const a1 = (s.endDeg - 90) * Math.PI / 180;
        ctx.strokeStyle = s.color + '66';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (s.startDeg <= s.endDeg) {
          ctx.arc(cx, cy, R * 0.97, a0, a1);
        } else {
          ctx.arc(cx, cy, R * 0.97, a0, a1 + Math.PI * 2);
        }
        ctx.stroke();
      }
    }

    const sweepRad = (sweep - 90) * Math.PI / 180;
    const trailRad = TRAIL_DEG * Math.PI / 180;

    for (let i = 0; i < 24; i++) {
      const t = i / 24;
      const a0 = sweepRad - trailRad + trailRad * t;
      const a1 = sweepRad - trailRad + trailRad * ((i + 1) / 24);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a0, a1);
      ctx.closePath();
      ctx.fillStyle = `rgba(68,212,194,${(Math.pow(t, 1.6) * 0.22).toFixed(3)})`;
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(180, 255, 240, 0.95)';
    ctx.shadowColor = '#44d4c2';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(sweepRad), cy + R * Math.sin(sweepRad));
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#b8f2e9';
    ctx.shadowColor = '#44d4c2';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    PROJECT_BLIPS.forEach(b => {
      const d = diffDeg(b.angle, sweep);
      const prevD = diffDeg(b.angle, (sweep - SWEEP_DEG_PER_SEC * (16 / 1000) + 360) % 360);
      if (prevD < 0 && d >= 0 && d < 4) {
        pingRef.current.set(b.slug, now);
        if (onActivePing) onActivePing(b);
      }

      const last = pingRef.current.get(b.slug);
      if (!last) return;
      const age = now - last;
      if (age > BLIP_PERSIST_MS) return;

      const lifetime = age / BLIP_PERSIST_MS;
      const alpha = Math.max(0, 1 - lifetime);

      const a = (b.angle - 90) * Math.PI / 180;
      const bx = cx + (R * b.dist) * Math.cos(a);
      const by = cy + (R * b.dist) * Math.sin(a);
      const s = SECTORS.find(x => x.key === b.sector);
      const col = s ? s.color : '#44d4c2';

      const ripple = Math.min(1, age / 900);
      ctx.beginPath();
      ctx.arc(bx, by, 4 + ripple * 20, 0, Math.PI * 2);
      ctx.strokeStyle = col + Math.floor((1 - ripple) * 200).toString(16).padStart(2, '0');
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bx, by, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.globalAlpha = alpha;
      ctx.shadowColor = col;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      if (age < 3000) {
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.fillStyle = col;
        ctx.globalAlpha = alpha;
        ctx.textAlign = bx < cx ? 'right' : 'left';
        ctx.fillText(b.title.toUpperCase(), bx + (bx < cx ? -8 : 8), by + 3);
        ctx.globalAlpha = 1;
      }
    });

    // Draw images for selected blips when sweep is near
    selectedBlipsRef.current.forEach(slug => {
      const blip = PROJECT_BLIPS.find(b => b.slug === slug);
      if (!blip) return;

      const d = diffDeg(blip.angle, sweep);
      const SHOW_RANGE = 45; // Show image when sweep is within 45 degrees

      if (Math.abs(d) <= SHOW_RANGE) {
        // Get pre-selected image URL for this blip
        const imageUrl = selectedImagesRef.current.get(slug);
        if (!imageUrl) {
          console.warn('⚠️ No image URL for slug:', slug);
          return;
        }

        const img = imageCache.current.get(imageUrl);
        if (img && img.complete && img.naturalWidth > 0) {
          const a = (blip.angle - 90) * Math.PI / 180;
          const bx = cx + (R * blip.dist) * Math.cos(a);
          const by = cy + (R * blip.dist) * Math.sin(a);

          // Calculate fade based on distance from sweep
          const fadeAlpha = 1 - Math.abs(d) / SHOW_RANGE;

          // Draw image as a circular sector/wedge emanating from radar center
          const sectorAngle = 50 * Math.PI / 180; // 50 degree wedge
          const innerRadius = R * (blip.dist - 0.25); // Start closer to center
          const outerRadius = R * (blip.dist + 0.25); // Extend outward

          ctx.save();
          ctx.globalAlpha = fadeAlpha * 0.85;

          // Create wedge/sector clipping path from radar center
          ctx.beginPath();
          ctx.moveTo(cx, cy); // Start at radar center (apex)
          ctx.arc(cx, cy, outerRadius, a - sectorAngle / 2, a + sectorAngle / 2);
          ctx.lineTo(cx, cy); // Close back to center
          ctx.closePath();
          ctx.clip();

          // Draw image centered at blip position to fill the sector
          const imgSize = outerRadius * 1.2;
          ctx.drawImage(img, bx - imgSize / 2, by - imgSize / 2, imgSize, imgSize);

          ctx.restore();

          // Draw glowing sector border
          ctx.save();
          ctx.globalAlpha = fadeAlpha * 0.9;
          const sectorColor = SECTORS.find(x => x.key === blip.sector)?.color || '#44d4c2';

          // Outer glow on arc
          ctx.strokeStyle = sectorColor;
          ctx.lineWidth = 3;
          ctx.shadowColor = sectorColor;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(cx, cy, outerRadius, a - sectorAngle / 2, a + sectorAngle / 2);
          ctx.stroke();

          // Glow on radial edges from center
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + outerRadius * Math.cos(a - sectorAngle / 2), cy + outerRadius * Math.sin(a - sectorAngle / 2));
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + outerRadius * Math.cos(a + sectorAngle / 2), cy + outerRadius * Math.sin(a + sectorAngle / 2));
          ctx.stroke();

          // Inner arc highlight
          ctx.shadowBlur = 8;
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(cx, cy, innerRadius, a - sectorAngle / 2, a + sectorAngle / 2);
          ctx.stroke();

          ctx.restore();

          // Add radar scan line from center to blip
          ctx.save();
          ctx.globalAlpha = fadeAlpha * 0.4;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = 'rgba(180, 255, 240, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#44d4c2';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.restore();
        }
      }
    });
  }, [onActivePing, activeSectorKey, size, projects]);

  useEffect(() => {
    const loop = (ts: number) => {
      try {
        if (lastRef.current) {
          const dt = (ts - lastRef.current) / 1000;
          sweepRef.current = (sweepRef.current + SWEEP_DEG_PER_SEC * dt) % 360;
        }
        lastRef.current = ts;
        draw();
      } catch (e) { console.error('radar draw error:', e); }
      rafRef.current = requestAnimationFrame(loop);
    };
    try { draw(); } catch { /* noop */ }
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastRef.current = 0; };
  }, [draw]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const resize = () => {
      const wrap = c.parentElement;
      if (!wrap) return;
      const s = Math.min(wrap.offsetWidth, wrap.offsetHeight);
      c.width = s; c.height = s;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (c.parentElement) ro.observe(c.parentElement);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="crt" style={{ width: '100%', height: '100%', maxWidth: size, maxHeight: size, position: 'relative', aspectRatio: '1/1' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </div>
  );
}
