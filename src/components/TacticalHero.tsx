import { useEffect, useState, useCallback } from 'react';
import { personalInfo, stats, projects } from '../data/portfolio';
import { useDarkMode } from '../hooks/useDarkMode';
import Radar, { SECTORS, PROJECT_BLIPS, type RadarBlip } from './hero/Radar';
import Rivet from './hero/Rivet';

interface TacticalHeroProps {
  onNav?: (id: string) => void;
}

export default function TacticalHero({ onNav }: TacticalHeroProps) {
  const [titleIdx, setTitleIdx] = useState(0);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [sysTime, setSysTime] = useState(new Date());
  const [feedLog, setFeedLog] = useState<Array<RadarBlip & { ts: Date }>>([]);
  const [isDark, setIsDark] = useDarkMode();

  const titles = personalInfo.titles || [personalInfo.title];

  useEffect(() => {
    const id = setInterval(() => setTitleIdx(v => (v + 1) % titles.length), 2800);
    return () => clearInterval(id);
  }, [titles.length]);

  useEffect(() => {
    const id = setInterval(() => setSysTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handlePing = useCallback((blip: RadarBlip) => {
    setActiveSector(blip.sector);
    setFeedLog(prev => [{ ts: new Date(), ...blip }, ...prev].slice(0, 6));
  }, []);

  const scrollTo = (id: string) => {
    if (onNav) { onNav(id); return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 12, behavior: 'smooth' });
  };

  const menu = [
    { id: 'projects',   label: 'Projects',   kbd: 'F1' },
    { id: 'experience', label: 'Experience', kbd: 'F2' },
    { id: 'skills',     label: 'Skills',     kbd: 'F3' },
    { id: 'education',  label: 'Education',  kbd: 'F4' },
    { id: 'contact',    label: 'Contact',    kbd: 'F5' },
  ];

  const timeStr = sysTime.toISOString().slice(11, 19) + ' UTC';
  const dateStr = sysTime.toISOString().slice(0, 10);

  const heroStats = stats ?? [
    { value: '10+', label: 'Years Active' },
    { value: '25+', label: 'Shipped Projects' },
    { value: '5',   label: 'Live Therapies' },
    { value: '3',   label: 'Research Roles' },
  ];

  return (
    <section id="hero" className="hero">
      {/* TOP STRIP */}
      <div className="topstrip chassis">
        <Rivet pos={{ top: 8, left: 8 }} />
        <Rivet pos={{ top: 8, right: 8 }} />
        <Rivet pos={{ bottom: 8, left: 8 }} />
        <Rivet pos={{ bottom: 8, right: 8 }} />

        <div className="topstrip-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="nameplate">ALEJANDRO QUIJADA</div>
            <div style={{ color: 'var(--bone-dim)', fontSize: 11, letterSpacing: '0.14em' }}>
              <span className="led teal blink" /> LINK {'{ACTIVE}'}
            </div>
          </div>

          <div className="ticker-wrap">
            <div className="ticker">
              <span>◤ {titles.join('   ◆   ')}</span>
              <span>   ◆   {titles.join('   ◆   ')}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div className="mono" style={{ color: 'var(--amber)', fontSize: 12, letterSpacing: '0.18em' }}>
              {dateStr}
            </div>
            <div className="mono" style={{ color: 'var(--phosphor)', fontSize: 13, letterSpacing: '0.2em', textShadow: '0 0 8px rgba(68,212,194,0.5)' }}>
              {timeStr}
            </div>
            <button className="theme-btn" onClick={() => setIsDark(!isDark)} title="Toggle theme">⏻</button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="main chassis">
        <Rivet pos={{ top: 12, left: 12 }} />
        <Rivet pos={{ top: 12, right: 12 }} />
        <Rivet pos={{ bottom: 12, left: 12 }} />
        <Rivet pos={{ bottom: 12, right: 12 }} />
        <Rivet pos={{ top: 12, left: '50%' }} style={{ transform: 'translateX(-50%)' }} />
        <Rivet pos={{ bottom: 12, left: '50%' }} style={{ transform: 'translateX(-50%)' }} />

        <div className="main-grid">
          {/* LEFT — radar + operator */}
          <div className="left-col">
            <div className="radar-wrap panel-inset">
              <div className="radar-chrome-label top">
                <span className="label-strip">TACTICAL SCAN · 360°</span>
              </div>
              <div className="radar-stage">
                <Radar onActivePing={handlePing} activeSectorKey={activeSector} projects={projects} />
              </div>

              <div className="radar-chrome-label bottom left-align">
                <span className="mono" style={{ color: 'var(--phosphor)', fontSize: 11, letterSpacing: '0.18em' }}>
                  <span className="led teal blink-fast" /> SWEEP 32°/s · TRAIL 70°
                </span>
              </div>
              <div className="radar-chrome-label bottom right-align">
                <span className="mono" style={{ color: 'var(--amber)', fontSize: 11, letterSpacing: '0.18em' }}>
                  {PROJECT_BLIPS.length} TARGETS
                </span>
              </div>
            </div>

            <div className="operator panel-inset">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="label-strip">OPERATOR</div>
                <div className="mono" style={{ color: 'var(--bone-dim)', fontSize: 10 }}>CLR-5 · RA2</div>
              </div>
              <h1 className="stencil" style={{ fontSize: 'clamp(24px, 2.2vw, 34px)', color: 'var(--bone)', margin: '10px 0 4px' }}>
                {personalInfo.name.toUpperCase()}
              </h1>
              <div style={{ height: 22, overflow: 'hidden' }}>
                <div key={titleIdx} className="rotating-title mono" style={{ color: 'var(--phosphor)', fontSize: 13, letterSpacing: '0.2em' }}>
                  ▸ {titles[titleIdx].toUpperCase()}
                </div>
              </div>
              <div className="mono" style={{ color: 'var(--bone-dim)', fontSize: 11, marginTop: 10, letterSpacing: '0.12em' }}>
                Toronto, CA · London, UK · Santiago, CL
              </div>

              <div className="stats-row">
                {heroStats.map((s, i) => (
                  <div key={i} className="stat">
                    <div className="stat-val mono">{s.value}</div>
                    <div className="stat-lbl mono">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — command menu */}
          <div className="right-col">
            <div className="cmd-panel panel-inset">
              <div className="cmd-panel-head">
                <span className="label-strip">COMMAND MENU</span>
                <span className="mono" style={{ color: 'var(--bone-dim)', fontSize: 10 }}>v1.0</span>
              </div>

              <div className="btn-stack">
                {menu.map(m => (
                  <button key={m.id} className="bevel-btn" onClick={() => scrollTo(m.id)}>
                    <span>{m.label}</span>
                    <span className="kbd">{m.kbd}</span>
                  </button>
                ))}
                <div className="divider" />
                <a className="bevel-btn primary" href="/cv.pdf" download>
                  <span>Download CV</span>
                  <span className="kbd">↓</span>
                </a>
                {/* <a className="bevel-btn danger" href={`mailto:${personalInfo.email}`}>
                  <span>Transmit Message</span>
                  <span className="kbd">✉</span>
                </a> */}
              </div>

              {/* <div className="cmd-feed">
                <div className="label-strip" style={{ marginBottom: 8 }}>ACTIVE FEED</div>
                <div className="feed-list">
                  {feedLog.length === 0 && (
                    <div className="mono" style={{ color: 'var(--bone-dim)', fontSize: 11, opacity: 0.7 }}>
                      — awaiting scan —
                    </div>
                  )}
                  {feedLog.map((f, i) => {
                    const s = SECTORS.find(x => x.key === f.sector);
                    return (
                      <div key={i} className="feed-row" style={{ opacity: 1 - i * 0.14 }}>
                        <span className="led" style={{
                          background: `radial-gradient(circle at 30% 30%, #fff 0%, ${s?.color || '#44d4c2'} 50%, #000 100%)`,
                          color: s?.color,
                        }} />
                        <span className="mono feed-time">{f.ts.toTimeString().slice(0, 8)}</span>
                        <span className="mono feed-title">{f.title}</span>
                        <span className="mono feed-sector" style={{ color: s?.color }}>{s?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="botstrip chassis">
        <Rivet pos={{ top: 8, left: 8 }} />
        <Rivet pos={{ top: 8, right: 8 }} />
        <Rivet pos={{ bottom: 8, left: 8 }} />
        <Rivet pos={{ bottom: 8, right: 8 }} />
        <div className="botstrip-inner">
          <div className="status-group"><span className="led green blink" /> <span className="mono">SYS NOMINAL</span></div>
          <div className="status-group"><span className="led amber" /> <span className="mono">STATUS ACTIVE</span></div>
          <div className="status-group"><span className="led teal blink-fast" /> <span className="mono">COMMS OPEN</span></div>
          <div className="status-spacer" />
          <div className="mono" style={{ color: 'var(--bone-dim)', fontSize: 10, letterSpacing: '0.2em' }}>
            AQL.CMD // build 26.04 // ©{new Date().getFullYear()} ALEJANDRO QUIJADA LEYTON
          </div>
        </div>
      </div>
    </section>
  );
}
