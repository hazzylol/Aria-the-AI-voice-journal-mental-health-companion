// journal-ui.jsx — theme tokens, icons, and shared primitives for the Voice Journal app.
// Exports to window: hexA, makeTheme, moodWord, moodColor, ICON, Sprout,
//   MoodRing, Chip, SectionLabel, BottomNav, Waveform, MoodChart

function hexA(hex, a) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const r = parseInt(n.slice(0, 2), 16), g = parseInt(n.slice(2, 4), 16), b = parseInt(n.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const ACCENTS = {
  sage:     { light: '#5E8472', dark: '#8FB6A4' },
  clay:     { light: '#C08763', dark: '#D6A07C' },
  lavender: { light: '#8278B0', dark: '#A99FD6' },
  dusk:     { light: '#5E7C96', dark: '#8FB0CC' },
};

function makeTheme(accentKey = 'sage', dark = false) {
  const accent = (ACCENTS[accentKey] || ACCENTS.sage)[dark ? 'dark' : 'light'];
  if (dark) {
    return {
      dark: true, accent,
      bg: '#141B18', panel: '#1A231F', card: '#1F2A25', cardAlt: '#243029',
      ink: '#EAEFEA', sub: '#B4BDB6', muted: '#8B948D', faint: '#67706A',
      line: 'rgba(255,255,255,0.09)', hair: 'rgba(255,255,255,0.06)',
      accentSoft: hexA(accent, 0.16), accentEdge: hexA(accent, 0.32),
      shadow: '0 18px 50px rgba(0,0,0,0.5)',
    };
  }
  return {
    dark: false, accent,
    bg: '#F2EDE4', panel: '#FBF8F2', card: '#FFFFFF', cardAlt: '#FAF6EF',
    ink: '#2A332E', sub: '#5A635D', muted: '#8A938C', faint: '#AEB5AE',
    line: 'rgba(42,51,46,0.10)', hair: 'rgba(42,51,46,0.06)',
    accentSoft: hexA(accent, 0.12), accentEdge: hexA(accent, 0.22),
    shadow: '0 16px 40px rgba(42,51,46,0.10)',
  };
}

function moodWord(s) {
  if (s < 38) return 'Low';
  if (s < 52) return 'Tender';
  if (s < 66) return 'Settled';
  if (s < 80) return 'Balanced';
  if (s < 90) return 'Bright';
  return 'Radiant';
}
function moodColor(s, dark) {
  if (s < 45) return dark ? '#7E97B4' : '#6E89A6';
  if (s < 62) return dark ? '#C7A988' : '#BD9B73';
  if (s < 78) return dark ? '#9DBE9C' : '#7FA07F';
  return dark ? '#8FB6A4' : '#5E8472';
}

const ICON = {
  mic: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21"/></svg>,
  back: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>,
  play: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><path d="M7 4.5v15l13-7.5z"/></svg>,
  pause: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><rect x="6" y="4.5" width="4" height="15" rx="1.4"/><rect x="14" y="4.5" width="4" height="15" rx="1.4"/></svg>,
  home: (s, c, f) => <svg width={s} height={s} viewBox="0 0 24 24" fill={f ? c : 'none'} stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11.5L12 5l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/></svg>,
  chart: (s, c, f) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16c3-1 4-7 7-7s4 4 9 1"/></svg>,
  user: (s, c, f) => <svg width={s} height={s} viewBox="0 0 24 24" fill={f ? c : 'none'} stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5"/></svg>,
  stop: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><rect x="7" y="7" width="10" height="10" rx="2.4"/></svg>,
  check: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>,
  spark: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M6 6l2.4 2.4M15.6 15.6L18 18M18 6l-2.4 2.4M8.4 15.6L6 18"/></svg>,
  arrow: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  heart: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.5-7-9.5A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7 2.5C19 15.5 12 20 12 20z"/></svg>,
  bookmark: (s, c) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h10v16l-5-3.5L7 20z"/></svg>,
};

function Sprout({ size = 18, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.2-2.4-5-5.4-5.2C6.4 11 8.6 13 12 13z" />
      <path d="M12 12c0-3 2.2-5.2 5.4-5.4C17.6 9.8 15.4 12 12 12z" />
    </svg>
  );
}

function MoodRing({ score, theme, size = 84, stroke = 7 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const col = moodColor(score, theme.dark);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={theme.line} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 21, fontWeight: 500, color: theme.ink, lineHeight: 1 }}>{moodWord(score)}</div>
      </div>
    </div>
  );
}

function Chip({ children, theme, tone }) {
  const col = tone || theme.accent;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 500,
      letterSpacing: 0.1, color: col,
      background: hexA(col, theme.dark ? 0.16 : 0.12),
      border: `1px solid ${hexA(col, theme.dark ? 0.28 : 0.2)}`,
    }}>{children}</span>
  );
}

function SectionLabel({ children, theme }) {
  return (
    <div style={{
      fontSize: 11.5, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase',
      color: theme.muted,
    }}>{children}</div>
  );
}

function Waveform({ theme, bars, color, progress = 1, height = 34 }) {
  const col = color || theme.accent;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2.5, height }}>
      {bars.map((h, i) => {
        const active = i / bars.length <= progress;
        return (
          <div key={i} style={{
            width: 3, borderRadius: 3, height: `${h}%`,
            background: active ? col : hexA(col, theme.dark ? 0.28 : 0.22),
            transition: 'background .2s',
          }} />
        );
      })}
    </div>
  );
}

function MoodChart({ data, labels, theme, width = 348, height = 168 }) {
  const padX = 6, padTop = 18, padBot = 26;
  const W = width, H = height;
  const max = 100, min = 25;
  const xs = data.map((_, i) => padX + (i * (W - padX * 2)) / (data.length - 1));
  const ys = data.map(v => padTop + (1 - (v - min) / (max - min)) * (H - padTop - padBot));
  function smooth(pts) {
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
    }
    return d;
  }
  const pts = xs.map((x, i) => [x, ys[i]]);
  const line = smooth(pts);
  const area = `${line} L ${xs[xs.length - 1]} ${H - padBot} L ${xs[0]} ${H - padBot} Z`;
  const last = data.length - 1;
  const gid = 'mg' + (theme.dark ? 'd' : 'l');
  return (
    <svg width={W} height={H} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hexA(theme.accent, theme.dark ? 0.34 : 0.22)} />
          <stop offset="100%" stopColor={hexA(theme.accent, 0)} />
        </linearGradient>
      </defs>
      <line x1={padX} x2={W - padX} y1={padTop + 0.5 * (H - padTop - padBot)} y2={padTop + 0.5 * (H - padTop - padBot)} stroke={theme.hair} strokeWidth="1" />
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={theme.accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          {i === last ? (
            <>
              <circle cx={x} cy={y} r="9" fill={hexA(theme.accent, 0.16)} />
              <circle cx={x} cy={y} r="4.5" fill={theme.accent} stroke={theme.card} strokeWidth="2" />
            </>
          ) : (
            <circle cx={x} cy={y} r="2.6" fill={theme.accent} opacity="0.55" />
          )}
        </g>
      ))}
      {labels.map((l, i) => (
        <text key={i} x={xs[i]} y={H - 8} textAnchor="middle"
          fontFamily="Hanken Grotesque, sans-serif" fontSize="11" fontWeight={i === last ? 600 : 500}
          fill={i === last ? theme.ink : theme.muted}>{l}</text>
      ))}
    </svg>
  );
}

function BottomNav({ active, onChange, theme }) {
  const items = [
    { id: 'home', label: 'Today', icon: ICON.home },
    { id: 'insights', label: 'Insights', icon: ICON.chart },
    { id: 'profile', label: 'You', icon: ICON.user },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 16px 6px', background: theme.dark ? hexA('#0d120f', 0.5) : hexA('#ffffff', 0.7),
      backdropFilter: 'blur(12px)', borderTop: `1px solid ${theme.hair}`,
    }}>
      {items.map(it => {
        const on = active === it.id;
        const col = on ? theme.accent : theme.muted;
        return (
          <button key={it.id} onClick={() => onChange(it.id)} style={{
            border: 'none', background: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '4px 14px',
          }}>
            {it.icon(23, col, on)}
            <span style={{ fontSize: 11, fontWeight: on ? 600 : 500, color: col, letterSpacing: 0.2 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  hexA, makeTheme, moodWord, moodColor, ICON, Sprout,
  MoodRing, Chip, SectionLabel, Waveform, MoodChart, BottomNav,
});
