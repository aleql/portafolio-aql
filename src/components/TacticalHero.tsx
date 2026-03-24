/**
 * TacticalHero — Sonar-reveal radar display
 *
 * 3 fixed sector positions. Each sector independently cycles through all
 * featured projects. When the sweep arm exits a sector's angular range,
 * that sector advances to its next project — so every rotation reveals
 * different footage in each zone.
 */

import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Code2, Gamepad2, ChevronDown,
  User, Briefcase, Cpu, Mail, FileDown, Radio
} from 'lucide-react';
import { personalInfo, projects } from '../data/portfolio';

// ─── Constants ─────────────────────────────────────────────────────────────────

const SWEEP_DEG_PER_SEC = 22;  // → full revolution ≈ 16 s
const TRAIL_DEG         = 52;  // width of the reveal wedge behind the arm

// ─── Module-level statics (never change) ───────────────────────────────────────

const SECTOR_ANGLES = [
  { startDeg: 15,  endDeg: 75,  color: '#00f0ff' },  // top-right
  { startDeg: 135, endDeg: 195, color: '#ff00ff' },  // bottom-left
  { startDeg: 255, endDeg: 315, color: '#00ff88' },  // bottom (near left)
] as const;

/** Precomputed CSS clip-path polygons for each sector (% coords, square elements) */
function makeSectorPolygon(startDeg: number, endDeg: number, steps = 40): string {
  const pts = ['50% 50%'];
  for (let i = 0; i <= steps; i++) {
    const deg = startDeg + ((endDeg - startDeg) * i) / steps;
    const rad = ((deg - 90) * Math.PI) / 180;
    pts.push(`${(50 + 50 * Math.cos(rad)).toFixed(3)}% ${(50 + 50 * Math.sin(rad)).toFixed(3)}%`);
  }
  return `polygon(${pts.join(', ')})`;
}

const SECTOR_CLIPS = SECTOR_ANGLES.map((s) => makeSectorPolygon(s.startDeg, s.endDeg));

// ─── Component ─────────────────────────────────────────────────────────────────

export default function TacticalHero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const radarRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>();
  const sweepRef    = useRef(0);
  const lastTimeRef = useRef(0);

  // Which project index is currently shown in each sector — cycles on arm exit
  const [sectorProjIdx, setSectorProjIdx] = useState([0, 1, 2]);

  // Tracks which sectors have already cycled in the current sweep rotation
  const advancedThisRotation = useRef(new Set<number>());

  // DOM refs for "Active Feeds" panel — updated directly to avoid per-frame re-renders
  const feedElemsRef    = useRef<HTMLElement[]>([]);
  const activeSectorRef = useRef(-1);

  // Ref that canvas draw() reads for current project labels (avoids stale closures)
  const sectorLabelsRef = useRef<{ label: string; tech: string }[]>([]);

  const [titleIndex, setTitleIndex] = useState(0);

  // All featured projects — stable reference
  const allFeatured = useMemo(
    () => projects.filter((p) => p.featured),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Update the labels ref whenever sectorProjIdx changes
  useEffect(() => {
    sectorLabelsRef.current = sectorProjIdx.map((pi) => ({
      label: allFeatured[pi % allFeatured.length]?.title ?? '',
      tech:  allFeatured[pi % allFeatured.length]?.technologies.slice(0, 2).join(' / ') ?? '',
    }));
  }, [sectorProjIdx, allFeatured]);

  // Initialize labels ref synchronously
  if (sectorLabelsRef.current.length === 0) {
    sectorLabelsRef.current = sectorProjIdx.map((pi) => ({
      label: allFeatured[pi % allFeatured.length]?.title ?? '',
      tech:  allFeatured[pi % allFeatured.length]?.technologies.slice(0, 2).join(' / ') ?? '',
    }));
  }

  // ── Rotating title ───────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(
      () => setTitleIndex((v) => (v + 1) % personalInfo.titles.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  // ── Canvas draw (reads refs → no stale values) ─────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W  = canvas.width;
    const H  = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R  = Math.min(W, H) / 2 - 1;

    const sweepDeg = sweepRef.current;
    const sweepRad = ((sweepDeg - 90) * Math.PI) / 180;
    const trailRad = (TRAIL_DEG  * Math.PI) / 180;

    ctx.clearRect(0, 0, W, H);

    // ── 1. Fully opaque dark overlay — images completely hidden ───────────────
    ctx.fillStyle = 'rgb(5, 8, 20)';
    ctx.fillRect(0, 0, W, H);

    // ── 2. Punch sweep wedge (destination-out gradient) ───────────────────────
    ctx.globalCompositeOperation = 'destination-out';
    const STEPS = 32;
    for (let i = 0; i < STEPS; i++) {
      const t  = i / STEPS;
      const a0 = sweepRad - trailRad + trailRad * t;
      const a1 = sweepRad - trailRad + trailRad * ((i + 1) / STEPS);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a0, a1);
      ctx.closePath();
      ctx.fillStyle = `rgba(0,0,0,${(Math.pow(t, 0.45) * 0.92).toFixed(3)})`;
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    // ── 3. Radar grid ─────────────────────────────────────────────────────────
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (R * ring) / 4, 0, Math.PI * 2);
      ctx.strokeStyle = ring === 4 ? 'rgba(0,240,255,0.22)' : 'rgba(0,240,255,0.07)';
      ctx.lineWidth   = ring === 4 ? 1.5 : 0.8;
      ctx.stroke();
    }
    for (let deg = 0; deg < 360; deg += 30) {
      const a    = ((deg - 90) * Math.PI) / 180;
      const tick = deg % 90 === 0 ? 0.80 : 0.91;
      ctx.beginPath();
      ctx.moveTo(cx + R * tick * Math.cos(a), cy + R * tick * Math.sin(a));
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = deg % 90 === 0 ? 'rgba(0,240,255,0.28)' : 'rgba(0,240,255,0.12)';
      ctx.lineWidth   = 1;
      ctx.stroke();
    }

    // ── 4. Sector boundary arcs ───────────────────────────────────────────────
    for (const s of SECTOR_ANGLES) {
      const a0 = ((s.startDeg - 90) * Math.PI) / 180;
      const a1 = ((s.endDeg   - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R * 0.96, a0, a1);
      ctx.closePath();
      ctx.strokeStyle = `${s.color}18`;
      ctx.lineWidth   = 1;
      ctx.stroke();
    }

    // ── 5. Sector labels (current project for each sector) ────────────────────
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    SECTOR_ANGLES.forEach((s, i) => {
      const midDeg = (s.startDeg + s.endDeg) / 2;
      const midRad = ((midDeg - 90) * Math.PI) / 180;
      const lR     = R * 0.60;
      const lx     = cx + lR * Math.cos(midRad);
      const ly     = cy + lR * Math.sin(midRad);
      const info   = sectorLabelsRef.current[i];
      if (!info) return;

      ctx.font      = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillStyle = `${s.color}60`;
      ctx.fillText(info.label.toUpperCase().slice(0, 12), lx, ly - 5);
      ctx.font      = '8px "JetBrains Mono", monospace';
      ctx.fillStyle = `${s.color}38`;
      ctx.fillText(info.tech, lx, ly + 6);
    });

    // ── 6. Sweep arm ──────────────────────────────────────────────────────────
    ctx.lineWidth   = 2;
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur  = 14;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + (R + 2) * Math.cos(sweepRad), cy + (R + 2) * Math.sin(sweepRad));
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ── 7. Center dot ─────────────────────────────────────────────────────────
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle   = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur  = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    // ── 8. Cardinal labels ────────────────────────────────────────────────────
    ctx.font         = '9px "JetBrains Mono", monospace';
    ctx.fillStyle    = 'rgba(0,240,255,0.30)';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    for (const [lbl, deg] of [['N', 0], ['E', 90], ['S', 180], ['W', 270]] as const) {
      const a = ((deg - 90) * Math.PI) / 180;
      ctx.fillText(lbl, cx + (R - 12) * Math.cos(a), cy + (R - 12) * Math.sin(a));
    }
  }, []); // no dependencies — reads only refs

  // ── RAF animation loop ─────────────────────────────────────────────────────
  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTimeRef.current !== 0) {
        const delta  = (ts - lastTimeRef.current) / 1000;
        const before = sweepRef.current;
        const after  = (before + SWEEP_DEG_PER_SEC * delta) % 360;
        sweepRef.current = after;

        // If we just wrapped past 360°, allow all sectors to advance again
        if (after < before) {
          advancedThisRotation.current.clear();
        }

        // When arm crosses a sector's endDeg → cycle that sector to next project
        SECTOR_ANGLES.forEach((s, i) => {
          const crossed = before < s.endDeg && after >= s.endDeg;
          if (crossed && !advancedThisRotation.current.has(i)) {
            advancedThisRotation.current.add(i);
            setSectorProjIdx((prev) => {
              const next = [...prev];
              next[i] = (next[i] + 1) % allFeatured.length;
              return next;
            });
          }
        });
      }
      lastTimeRef.current = ts;

      draw();

      // Active sector highlight via direct DOM
      const cur = SECTOR_ANGLES.findIndex((s) => {
        const d = sweepRef.current;
        return d >= s.startDeg && d <= s.endDeg;
      });
      if (cur !== activeSectorRef.current) {
        activeSectorRef.current = cur;
        feedElemsRef.current.forEach((el, i) => {
          if (!el) return;
          cur === i ? el.setAttribute('data-active', 'true') : el.removeAttribute('data-active');
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [draw, allFeatured.length]); // stable — allFeatured.length never changes

  // ── Canvas size synced to container ──────────────────────────────────────────
  useEffect(() => {
    const container = radarRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;
    const sync = () => {
      const size = container.offsetWidth;
      if (canvas.width !== size || canvas.height !== size) {
        canvas.width  = size;
        canvas.height = size;
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'summary',    label: 'About',       icon: User      },
    { id: 'projects',   label: 'Projects',    icon: Briefcase },
    { id: 'experience', label: 'Experience',  icon: Zap       },
    { id: 'skills',     label: 'Tech Stack',  icon: Cpu       },
    { id: 'education',  label: 'Contact',     icon: Mail      },
  ];

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row bg-game-darker overflow-x-hidden lg:overflow-hidden"
    >
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-50" />

      {/* ═══════════════════════════════════════════════════════════════
          LEFT — Radar display
      ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-none h-[min(100vw,80vh)] lg:flex-1 lg:h-auto flex items-center justify-center p-4 pt-20 lg:pt-6 lg:p-10 overflow-hidden">
        <div className="relative flex items-center justify-center w-full h-full">

          {/* Pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary-500/10 pointer-events-none"
              style={{ width: '100%', aspectRatio: '1', maxWidth: '100%', maxHeight: '100%' }}
              animate={{ scale: [1, 1.04 + i * 0.03], opacity: [0.3, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.05, ease: 'easeOut' }}
            />
          ))}

          {/* Radar circle */}
          <div
            ref={radarRef}
            className="relative rounded-full overflow-hidden"
            style={{
              width:       'min(100%, calc(100vh - 140px))',
              aspectRatio: '1 / 1',
            }}
          >
            {/* Sector images — each independently cycles through projects */}
            {SECTOR_ANGLES.map((s, i) => {
              const proj = allFeatured[sectorProjIdx[i] % allFeatured.length];
              if (!proj) return null;
              return proj.videoUrl ? (
                <video
                  key={`${i}-${sectorProjIdx[i]}`}
                  src={proj.videoUrl}
                  poster={proj.images[0]}
                  muted loop playsInline autoPlay preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: SECTOR_CLIPS[i] }}
                />
              ) : (
                <img
                  key={`${i}-${sectorProjIdx[i]}`}
                  src={proj.images[0]}
                  alt={proj.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: SECTOR_CLIPS[i] }}
                />
              );
            })}

            {/* Canvas — dark overlay + sweep punch + grid + arm */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>

          {/* Glowing border ring */}
          <div
            className="absolute rounded-full border-2 border-primary-500/40 pointer-events-none"
            style={{
              width:     'min(100%, calc(100vh - 140px))',
              aspectRatio: '1 / 1',
              boxShadow: '0 0 32px rgba(0,240,255,0.10), inset 0 0 32px rgba(0,240,255,0.04)',
            }}
          />

          {/* SCANNING label */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
            <motion.div
              animate={{ opacity: [1, 0.1, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-neon-green"
            />
            <span className="font-mono text-[10px] text-neon-green uppercase tracking-widest">
              Scanning
            </span>
          </div>
        </div>
      </div>

      {/* Vertical divider */}
      <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-primary-500/20 to-transparent shrink-0" />

      {/* ═══════════════════════════════════════════════════════════════
          RIGHT — Command panel
      ═══════════════════════════════════════════════════════════════ */}
      <div className="lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col border-t lg:border-t-0 border-primary-500/15 bg-gradient-to-b from-game-card/35 to-game-darker/70 overflow-y-auto">

        {/* Navbar spacer */}
        <div className="h-24 shrink-0 border-b border-primary-500/10 flex items-end px-6 pb-2">
          <div className="flex items-center gap-2">
            <Radio size={11} className="text-neon-green" />
            <span className="font-mono text-[10px] text-neon-green uppercase tracking-widest">
              Command Panel
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-6 py-5">

          {/* ── Operator profile ── */}
          <div>
            <span className="font-mono text-[10px] text-primary-500/45 uppercase tracking-widest">
              Operator Profile
            </span>
            <h1 className="mt-2 text-3xl font-bold font-game text-white leading-tight relative inline-block">
              <span className="relative z-10">
                {personalInfo.name.split(' ').slice(0, 2).join(' ')}
              </span>
              <span
                className="absolute inset-0 text-primary-400 opacity-50 animate-glitch"
                aria-hidden
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 42%, 0 42%)' }}
              >
                {personalInfo.name.split(' ').slice(0, 2).join(' ')}
              </span>
              <span
                className="absolute inset-0 text-accent-400 opacity-40 animate-glitch"
                aria-hidden
                style={{ clipPath: 'polygon(0 58%, 100% 58%, 100% 100%, 0 100%)', animationDelay: '0.12s' }}
              >
                {personalInfo.name.split(' ').slice(0, 2).join(' ')}
              </span>
            </h1>
            <div className="text-lg font-bold font-game text-primary-400 text-glow">
              {personalInfo.name.split(' ').slice(2).join(' ')}
            </div>
            <div className="mt-1.5 h-5 overflow-hidden">
              <motion.div
                key={titleIndex}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5"
              >
                <span className="text-primary-500">▸</span>
                {personalInfo.titles[titleIndex]}
              </motion.div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-primary-500/20 to-transparent" />

          {/* ── Navigation ── */}
          <div>
            <span className="font-mono text-[10px] text-primary-500/45 uppercase tracking-widest mb-2 block">
              Navigation
            </span>
            <nav className="flex flex-col gap-0.5">
              {navItems.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollTo(id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 px-3 py-2.5 border border-transparent hover:border-primary-500/25 hover:bg-primary-500/[0.04] transition-all duration-150 text-left"
                >
                  <Icon size={13} className="text-primary-500/35 group-hover:text-primary-400 transition-colors shrink-0" />
                  <span className="font-mono text-sm text-gray-500 group-hover:text-gray-200 uppercase tracking-widest transition-colors flex-1">
                    {label}
                  </span>
                  <span className="font-mono text-xs text-transparent group-hover:text-primary-500/45 transition-colors">▶</span>
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="h-px bg-gradient-to-r from-primary-500/20 to-transparent" />

          {/* ── Active feeds (DOM-updated, no per-frame re-render) ── */}
          <div>
            <span className="font-mono text-[10px] text-primary-500/45 uppercase tracking-widest mb-2 block">
              Active Feeds
            </span>
            <div className="flex flex-col gap-1.5">
              {SECTOR_ANGLES.map((s, i) => (
                <div
                  key={i}
                  ref={(el) => { if (el) feedElemsRef.current[i] = el; }}
                  className="flex items-center gap-3 px-3 py-2 border transition-all duration-300
                    opacity-35
                    data-[active=true]:opacity-100"
                  style={{ borderColor: `${s.color}18` }}
                >
                  <span className="font-mono text-[10px] text-gray-600 w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: `${s.color}55` }}
                  />
                  <div className="flex-1 min-w-0">
                    {/* Label text updated directly by canvas draw via sectorLabelsRef */}
                    <div
                      className="font-mono text-xs font-semibold uppercase tracking-wider truncate"
                      style={{ color: `${s.color}80` }}
                    >
                      {allFeatured[sectorProjIdx[i] % allFeatured.length]?.title ?? '—'}
                    </div>
                    <div className="font-mono text-[10px] text-gray-600 truncate">
                      {SECTOR_ANGLES[i].startDeg}°–{SECTOR_ANGLES[i].endDeg}°
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-primary-500/20 to-transparent" />

          {/* ── CTAs ── */}
          <div className="flex flex-col gap-2">
            <motion.a
              href="https://raw.githubusercontent.com/aleql/portafolio-aql/main/public/cv.pdf"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 font-mono font-semibold text-sm uppercase tracking-wider text-white corner-cut"
            >
              <FileDown size={14} /> Download CV
            </motion.a>
            <motion.a
              href="#/aleql-gamedev"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-accent-500/50 hover:border-accent-400 font-mono font-semibold text-sm uppercase tracking-wider text-accent-400 transition-colors corner-cut"
            >
              <Gamepad2 size={14} /> Game CV
            </motion.a>
            <motion.button
              onClick={() => scrollTo('projects')}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-primary-500/30 hover:border-primary-500/55 font-mono text-sm uppercase tracking-wider text-primary-500 hover:text-primary-400 transition-colors corner-cut"
            >
              <Code2 size={14} /> View Projects
            </motion.button>
          </div>

          {/* ── Stats ── */}
          <div className="flex gap-4 pt-2 border-t border-primary-500/10">
            {[
              { value: '50+',  label: 'Projects'     },
              { value: '10Y+', label: 'Experience'   },
              { value: '25+',  label: 'Technologies' },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center">
                <div className="font-mono text-lg font-bold text-primary-400 text-glow leading-none">{s.value}</div>
                <div className="font-mono text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={() => scrollTo('summary')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 9, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
        }}
        aria-label="Scroll to content"
        className="absolute bottom-5 left-1/2 lg:left-[32%] -translate-x-1/2 text-primary-500 hover:text-primary-400 transition-colors z-10"
      >
        <ChevronDown size={26} className="drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
      </motion.button>
    </section>
  );
}
