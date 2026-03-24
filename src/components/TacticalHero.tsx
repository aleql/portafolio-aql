/**
 * TacticalHero — Sonar-reveal radar display
 *
 * The radar sweep is NOT decorative. It is the reveal mask.
 * Project clips are hidden underneath; the rotating sweep arm
 * temporarily exposes them through a moving angular wedge.
 * Once the sweep passes, the clip disappears back into darkness.
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Code2, Gamepad2, ChevronDown,
  User, Briefcase, Cpu, Mail, FileDown, Radio
} from 'lucide-react';
import { personalInfo, projects } from '../data/portfolio';

// ─── Constants ─────────────────────────────────────────────────────────────────

/** How many degrees the sweep travels per second (full revolution ≈ 15 s) */
const SWEEP_DEG_PER_SEC = 24;

/** Angular width of the reveal wedge (trailing behind the sweep arm) */
const TRAIL_DEG = 48;

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Sector {
  id: number;
  startDeg: number; // 0 = top (12-o'clock), clockwise
  endDeg: number;
  color: string;
  label: string;
  tech: string;
  poster: string;
  videoUrl?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Converts a sector [startDeg, endDeg] into a CSS clip-path polygon using
 * percentage coordinates so it works for any square element.
 * 0° = top, values increase clockwise.
 */
function sectorPolygon(startDeg: number, endDeg: number, steps = 36): string {
  const pts = ['50% 50%'];
  for (let i = 0; i <= steps; i++) {
    const deg = startDeg + ((endDeg - startDeg) * i) / steps;
    // -90 shifts 0° from east (canvas default) to north (our 0°)
    const rad = ((deg - 90) * Math.PI) / 180;
    const x = (50 + 50 * Math.cos(rad)).toFixed(3);
    const y = (50 + 50 * Math.sin(rad)).toFixed(3);
    pts.push(`${x}% ${y}%`);
  }
  return `polygon(${pts.join(', ')})`;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function TacticalHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const sweepRef = useRef(0);
  const lastTimeRef = useRef(0);
  const activeSectorIdxRef = useRef(-1);

  const [titleIndex, setTitleIndex] = useState(0);
  const [activeSectorIdx, setActiveSectorIdx] = useState(-1);

  // Build sector list from featured projects
  const SECTOR_PRESETS: Pick<Sector, 'startDeg' | 'endDeg' | 'color'>[] = [
    { startDeg: 20,  endDeg: 80,  color: '#00f0ff' }, // top-right
    { startDeg: 155, endDeg: 215, color: '#ff00ff' }, // bottom-left
    { startDeg: 265, endDeg: 320, color: '#00ff88' }, // bottom-right (near bottom)
  ];

  const sectors: Sector[] = projects
    .filter((p) => p.featured)
    .slice(0, 3)
    .map((p, i) => ({
      id: i,
      ...SECTOR_PRESETS[i],
      label: p.title,
      tech: p.technologies.slice(0, 2).join(' / '),
      poster: p.images[0] ?? '',
      videoUrl: (p as Record<string, unknown>).videoUrl as string | undefined,
    }));

  // ── Rotating title ───────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(
      () => setTitleIndex((v) => (v + 1) % personalInfo.titles.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  // ── Canvas draw ───────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) / 2 - 1;

    // Convert current sweep to radians; our 0° is top, clockwise
    const sweepDeg = sweepRef.current;
    const sweepRad = ((sweepDeg - 90) * Math.PI) / 180;
    const trailRad = (TRAIL_DEG * Math.PI) / 180;

    ctx.clearRect(0, 0, W, H);

    // ── 1. Dark overlay (fill entire canvas) ──────────────────────────────────
    ctx.fillStyle = 'rgba(5, 8, 20, 0.96)';
    ctx.fillRect(0, 0, W, H);

    // ── 2. Punch the sweep wedge using destination-out ─────────────────────────
    // The wedge trails behind the sweep arm: from (sweepRad - trailRad) to sweepRad.
    // We draw it in slices so we can apply a gradient opacity (dark at trailing
    // edge → transparent at leading edge) for a sonar "glow" feel.
    ctx.globalCompositeOperation = 'destination-out';

    const STEPS = 30;
    for (let i = 0; i < STEPS; i++) {
      const t = i / STEPS; // 0 = trailing edge, 1 = leading edge (arm)
      const a0 = sweepRad - trailRad + trailRad * t;
      const a1 = sweepRad - trailRad + trailRad * ((i + 1) / STEPS);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a0, a1);
      ctx.closePath();

      // Leading edge (near the arm) → strongly transparent (reveals video well)
      // Trailing edge → nearly opaque (fades back to dark quickly)
      const alpha = Math.pow(t, 0.5) * 0.9;
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';

    // ── 3. Radar grid — drawn on top, visible everywhere ─────────────────────
    ctx.lineWidth = 0.8;

    // Concentric circles
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (R * ring) / 4, 0, Math.PI * 2);
      ctx.strokeStyle = ring === 4 ? 'rgba(0,240,255,0.20)' : 'rgba(0,240,255,0.08)';
      ctx.stroke();
    }

    // Radial tick lines every 30°
    for (let deg = 0; deg < 360; deg += 30) {
      const a = ((deg - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx + (R * 0.92) * Math.cos(a), cy + (R * 0.92) * Math.sin(a));
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = 'rgba(0,240,255,0.25)';
      ctx.stroke();
    }

    // Main cross at 0/90/180/270
    ctx.lineWidth = 0.5;
    for (const deg of [0, 90, 180, 270]) {
      const a = ((deg - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = 'rgba(0,240,255,0.10)';
      ctx.stroke();
    }

    // ── 4. Sector arc outlines (subtle boundary markers) ──────────────────────
    for (const s of sectors) {
      const a0 = ((s.startDeg - 90) * Math.PI) / 180;
      const a1 = ((s.endDeg - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R * 0.97, a0, a1);
      ctx.closePath();
      ctx.strokeStyle = `${s.color}1A`; // ~10% opacity outline
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // ── 5. Sector labels (dim markers, always visible on the radar) ───────────
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const s of sectors) {
      const midDeg = (s.startDeg + s.endDeg) / 2;
      const midRad = ((midDeg - 90) * Math.PI) / 180;
      const lR = R * 0.62;
      const lx = cx + lR * Math.cos(midRad);
      const ly = cy + lR * Math.sin(midRad);

      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillStyle = `${s.color}55`;
      ctx.fillText(s.label.toUpperCase().slice(0, 12), lx, ly - 6);
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillStyle = `${s.color}33`;
      ctx.fillText(s.tech, lx, ly + 6);
    }

    // ── 6. Sweep arm ──────────────────────────────────────────────────────────
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + (R + 1) * Math.cos(sweepRad),
      cy + (R + 1) * Math.sin(sweepRad)
    );
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ── 7. Center dot ─────────────────────────────────────────────────────────
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;

    // ── 8. Degree markers (N/S/E/W) ───────────────────────────────────────────
    const cardinal: [string, number][] = [['N', 0], ['E', 90], ['S', 180], ['W', 270]];
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(0,240,255,0.35)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const [label, deg] of cardinal) {
      const a = ((deg - 90) * Math.PI) / 180;
      ctx.fillText(label, cx + (R - 12) * Math.cos(a), cy + (R - 12) * Math.sin(a));
    }
  }, [sectors]);

  // ── Animation loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTimeRef.current !== 0) {
        const delta = (ts - lastTimeRef.current) / 1000;
        sweepRef.current = (sweepRef.current + SWEEP_DEG_PER_SEC * delta) % 360;
      }
      lastTimeRef.current = ts;

      draw();

      // Detect which sector the sweep arm is currently inside (for right-panel highlight)
      const cur = sectors.findIndex((s) => {
        const deg = sweepRef.current;
        return deg >= s.startDeg && deg <= s.endDeg;
      });
      if (cur !== activeSectorIdxRef.current) {
        activeSectorIdxRef.current = cur;
        setActiveSectorIdx(cur);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [draw, sectors]);

  // ── Sync canvas size to container ─────────────────────────────────────────────
  useEffect(() => {
    const container = radarRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const sync = () => {
      const size = container.offsetWidth;
      if (canvas.width !== size || canvas.height !== size) {
        canvas.width = size;
        canvas.height = size;
      }
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // ── Scroll helper ─────────────────────────────────────────────────────────────
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'summary',    label: 'About',      icon: User      },
    { id: 'projects',   label: 'Projects',   icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Zap       },
    { id: 'skills',     label: 'Tech Stack', icon: Cpu       },
    { id: 'education',  label: 'Contact',    icon: Mail      },
  ];

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col lg:flex-row bg-game-darker overflow-hidden"
    >
      {/* Full-section scanlines */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-50" />

      {/* ═══════════════════════════════════════════════════════════════════════
          LEFT — Radar / sonar display
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 pt-24 lg:pt-10 lg:px-10">
        {/* Outer glow ring (CSS, not canvas) */}
        <div className="relative flex items-center justify-center w-full">
          {/* Pulse rings behind the radar */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary-500/15"
              style={{ width: '100%', maxWidth: 540, aspectRatio: '1' }}
              animate={{ scale: [1, 1.04 + i * 0.04], opacity: [0.35, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'easeOut' }}
            />
          ))}

          {/* Radar circle container */}
          <div
            ref={radarRef}
            className="relative w-full aspect-square overflow-hidden rounded-full"
            style={{ maxWidth: 'min(90vw, 500px, 80vh)' }}
          >
            {/* ── Project images / videos (sector-clipped, always playing) ── */}
            {sectors.map((s) => (
              s.videoUrl ? (
                <video
                  key={s.id}
                  src={s.videoUrl}
                  poster={s.poster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: sectorPolygon(s.startDeg, s.endDeg) }}
                />
              ) : (
                <img
                  key={s.id}
                  src={s.poster}
                  alt={s.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: sectorPolygon(s.startDeg, s.endDeg) }}
                />
              )
            ))}

            {/* ── Canvas: dark overlay + sweep punch + grid + arm ── */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Outer border ring (on top of everything) */}
          <div
            className="absolute rounded-full border-2 border-primary-500/50 pointer-events-none"
            style={{
              width: 'min(90vw, 500px, 80vh)',
              aspectRatio: '1',
              boxShadow: '0 0 24px rgba(0,240,255,0.12), inset 0 0 24px rgba(0,240,255,0.05)',
            }}
          />

          {/* SCANNING label */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
            <motion.div
              animate={{ opacity: [1, 0.15, 1] }}
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
      <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-primary-500/25 to-transparent shrink-0" />

      {/* ═══════════════════════════════════════════════════════════════════════
          RIGHT — Command panel
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col border-t lg:border-t-0 border-primary-500/20 bg-gradient-to-b from-game-card/40 to-game-darker/80">
        {/* Navbar spacer */}
        <div className="h-20 shrink-0 border-b border-primary-500/10 flex items-end px-6 pb-2">
          <div className="flex items-center gap-2">
            <Radio size={11} className="text-neon-green" />
            <span className="font-mono text-[10px] text-neon-green uppercase tracking-widest">
              Command Panel
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-6 py-5 overflow-y-auto flex-1">

          {/* ── Operator profile ── */}
          <div>
            <span className="font-mono text-[10px] text-primary-500/50 uppercase tracking-widest">
              Operator Profile
            </span>

            <h1 className="mt-2 text-3xl font-bold font-game text-white leading-tight relative inline-block">
              <span className="relative z-10">
                {personalInfo.name.split(' ').slice(0, 2).join(' ')}
              </span>
              {/* Glitch layers */}
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

            <div className="mt-2 h-5 overflow-hidden">
              <motion.div
                key={titleIndex}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5"
              >
                <span className="text-primary-500">▸</span>
                {personalInfo.titles[titleIndex]}
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-primary-500/20 to-transparent" />

          {/* ── Navigation ── */}
          <div>
            <span className="font-mono text-[10px] text-primary-500/50 uppercase tracking-widest mb-2 block">
              Navigation
            </span>
            <nav className="flex flex-col gap-0.5">
              {navItems.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollTo(id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 px-3 py-2.5 border border-transparent hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-150 text-left"
                >
                  <Icon
                    size={13}
                    className="text-primary-500/40 group-hover:text-primary-400 transition-colors shrink-0"
                  />
                  <span className="font-mono text-sm text-gray-500 group-hover:text-gray-200 uppercase tracking-widest transition-colors flex-1">
                    {label}
                  </span>
                  <span className="font-mono text-xs text-primary-500/0 group-hover:text-primary-500/50 transition-colors">
                    ▶
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-primary-500/20 to-transparent" />

          {/* ── Active feeds ── */}
          <div>
            <span className="font-mono text-[10px] text-primary-500/50 uppercase tracking-widest mb-2 block">
              Active Feeds
            </span>
            <div className="flex flex-col gap-1.5">
              {sectors.map((s, i) => {
                const isActive = activeSectorIdx === i;
                return (
                  <motion.div
                    key={s.id}
                    animate={isActive ? { opacity: 1 } : { opacity: 0.45 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 px-3 py-2 border transition-colors duration-300"
                    style={{
                      borderColor: isActive ? `${s.color}55` : `${s.color}18`,
                      backgroundColor: isActive ? `${s.color}08` : 'transparent',
                    }}
                  >
                    <span className="font-mono text-[10px] text-gray-600 w-5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <motion.div
                      animate={isActive
                        ? { opacity: [1, 0.3, 1], boxShadow: [`0 0 4px ${s.color}`, `0 0 10px ${s.color}`, `0 0 4px ${s.color}`] }
                        : { opacity: 0.4 }}
                      transition={{ duration: 0.8, repeat: isActive ? Infinity : 0 }}
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-mono text-xs font-semibold uppercase tracking-wider truncate"
                        style={{ color: isActive ? s.color : `${s.color}88` }}
                      >
                        {s.label}
                      </div>
                      <div className="font-mono text-[10px] text-gray-600 truncate">
                        {s.tech} · {s.startDeg}°–{s.endDeg}°
                      </div>
                    </div>
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="font-mono text-[10px] shrink-0"
                        style={{ color: s.color }}
                      >
                        LIVE
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-primary-500/20 to-transparent" />

          {/* ── CTAs ── */}
          <div className="flex flex-col gap-2">
            <motion.a
              href="https://raw.githubusercontent.com/aleql/portafolio-aql/main/public/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 font-mono font-semibold text-sm uppercase tracking-wider text-white corner-cut"
            >
              <FileDown size={15} />
              Download CV
            </motion.a>

            <motion.a
              href="#/aleql-gamedev"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-accent-500/50 hover:border-accent-400 font-mono font-semibold text-sm uppercase tracking-wider text-accent-400 transition-colors corner-cut"
            >
              <Gamepad2 size={15} />
              Game CV
            </motion.a>

            <motion.button
              onClick={() => scrollTo('projects')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-primary-500/30 hover:border-primary-500/60 font-mono text-sm uppercase tracking-wider text-primary-500 hover:text-primary-400 transition-colors corner-cut"
            >
              <Code2 size={14} />
              View Projects
            </motion.button>
          </div>

          {/* Bottom stats */}
          <div className="flex gap-4 mt-auto pt-2 border-t border-primary-500/10">
            {[
              { value: '50+', label: 'Projects' },
              { value: '10Y+', label: 'Experience' },
              { value: '25+', label: 'Technologies' },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center">
                <div className="font-mono text-lg font-bold text-primary-400 text-glow leading-none">
                  {s.value}
                </div>
                <div className="font-mono text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
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
        <ChevronDown
          size={26}
          className="drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
        />
      </motion.button>
    </section>
  );
}
