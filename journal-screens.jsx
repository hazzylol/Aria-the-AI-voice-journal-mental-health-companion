// journal-screens.jsx — the three screens + recording flow.
// Depends on window globals from journal-ui.jsx and android-frame.jsx.
// Exports to window: JournalApp

const { useState, useEffect, useRef } = React;

const DATA = {
  user: 'Maya',
  todayMood: 74,
  streak: 12,
  week: [54, 61, 47, 58, 82, 71, 74],
  weekLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  duration: '2:14',
  time: 'Today · 9:24 PM',
  transcript: "Honestly, today felt like a lot. Work kept piling up and I kept promising myself I'd go to the gym, and then I just… didn't. I'm trying not to be hard on myself about it, but it's sitting there. I think I just need to slow down a little and stop running at the same speed all the time.",
  ai: "It sounds like you carried a full, heavy day — and still you noticed it gently, without turning it into something to punish yourself with. That's its own quiet kind of strength. Rest was never something you had to earn first. Maybe slowing down isn't falling behind; maybe it's the way you stay close to yourself. You showed up here tonight, and that matters more than the gym did.",
  themes: ['Self-compassion', 'Work stress', 'Needing rest'],
  entries: [
    { day: 'Yesterday', time: '8:40 PM', mood: 66, dur: '1:48', text: 'A quieter evening. I felt more like myself again after the walk by the river.' },
    { day: 'Sunday', time: '9:12 PM', mood: 49, dur: '3:05', text: 'Missing home a little tonight. Called Mum, which helped more than I expected.' },
    { day: 'Saturday', time: '10:02 PM', mood: 84, dur: '2:21', text: 'Good long catch-up with Sam. Laughed until my cheeks hurt — needed that.' },
    { day: 'Friday', time: '7:30 PM', mood: 58, dur: '1:12', text: 'Tense before the review, but it went fine. Letting myself off the hook now.' },
  ],
};

// ── device frame with custom background ──────────────────────
function Phone({ theme, children }) {
  return (
    <div style={{
      width: 412, height: 892, borderRadius: 40, overflow: 'hidden',
      background: theme.bg, border: '9px solid #2c2c2e',
      boxShadow: theme.shadow, display: 'flex', flexDirection: 'column',
      boxSizing: 'border-box', position: 'relative',
      fontFamily: 'Hanken Grotesque, system-ui, sans-serif',
    }}>
      <AndroidStatusBar dark={theme.dark} />
      <div style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <AndroidNavBar dark={theme.dark} />
    </div>
  );
}

function Avatar({ theme, size = 42 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: theme.accentSoft, border: `1px solid ${theme.accentEdge}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: theme.accent, fontFamily: 'Newsreader, serif', fontStyle: 'italic',
      fontSize: size * 0.42, fontWeight: 500,
    }}>{DATA.user[0]}</div>
  );
}

// ════════════════════ HOME / TODAY ════════════════════
function HomeScreen({ theme, onRecord }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: theme.muted }}>Tuesday · June 9</div>
            <div style={{ fontSize: 25, fontWeight: 600, color: theme.ink, marginTop: 6, letterSpacing: -0.3 }}>Good evening, {DATA.user}</div>
          </div>
          <Avatar theme={theme} />
        </div>
      </div>

      {/* stat row */}
      <div style={{ display: 'flex', gap: 12, padding: '20px 22px 0' }}>
        <div style={{ flex: 1, background: theme.card, border: `1px solid ${theme.hair}`, borderRadius: 22, padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <MoodRing score={DATA.todayMood} theme={theme} size={78} stroke={6.5} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: theme.muted }}>Today's mood</div>
          </div>
        </div>
        <div style={{ flex: 1, background: theme.card, border: `1px solid ${theme.hair}`, borderRadius: 22, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: theme.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={22} color={theme.accent} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ fontSize: 34, fontWeight: 700, color: theme.ink, letterSpacing: -1, lineHeight: 1 }}>{DATA.streak}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: theme.sub }}>days</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: theme.muted, marginTop: 4 }}>Reflecting in a row</div>
          </div>
        </div>
      </div>

      {/* hero mic */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 24px 4px', minHeight: 300 }}>
        <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 26, fontWeight: 500, color: theme.ink, textAlign: 'center', letterSpacing: -0.2, whiteSpace: 'nowrap', lineHeight: 1.2 }}>How are you, really?</div>
        <div style={{ fontSize: 14.5, lineHeight: 1.5, color: theme.muted, textAlign: 'center', marginTop: 12, maxWidth: 268, textWrap: 'pretty' }}>Take a breath. Speak freely — nothing here leaves this space.</div>

        <button onClick={onRecord} className="mic-btn" style={{
          position: 'relative', marginTop: 34, width: 132, height: 132, borderRadius: '50%',
          border: 'none', cursor: 'pointer', background: theme.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 18px 38px ${hexA(theme.accent, 0.4)}`,
        }}>
          <span className="mic-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px solid ${hexA(theme.accent, 0.5)}` }} />
          <span className="mic-ring mic-ring-2" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px solid ${hexA(theme.accent, 0.5)}` }} />
          {ICON.mic(46, '#fff')}
        </button>
        <div style={{ fontSize: 13, fontWeight: 500, color: theme.faint, marginTop: 26, letterSpacing: 0.2 }}>Tap to start · about 2 minutes</div>
      </div>

      {/* gentle prompt */}
      <div style={{ padding: '4px 22px 22px' }}>
        <div style={{ background: theme.accentSoft, borderRadius: 20, padding: '16px 18px', border: `1px solid ${theme.accentEdge}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            {ICON.spark(15, theme.accent)}
            <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: theme.accent }}>A prompt, if you'd like</span>
          </div>
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 18, lineHeight: 1.4, color: theme.ink, fontStyle: 'italic' }}>What's one thing you could set down tonight?</div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════ RECORDING ════════════════════
function RecordingOverlay({ theme, onStop, onCancel }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(secs / 60)), ss = String(secs % 60).padStart(2, '0');
  const bars = Array.from({ length: 34 });
  return (
    <div style={{ position: 'absolute', inset: 0, background: theme.bg, zIndex: 30, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'flex-start' }}>
        <button onClick={onCancel} style={{ border: 'none', background: theme.card, width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: theme.shadow }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.sub} strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', gap: 4 }}>
        <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 30, color: theme.ink }}>Listening…</div>
        <div style={{ fontSize: 14.5, color: theme.muted, marginTop: 6 }}>I'm here. Say whatever you need to.</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 92, marginTop: 46 }}>
          {bars.map((_, i) => (
            <span key={i} className="rec-bar" style={{
              width: 4, borderRadius: 4, background: theme.accent,
              animationDelay: `${(i % 7) * 0.13 + (i * 0.02)}s`,
            }} />
          ))}
        </div>
        <div style={{ fontFamily: 'Hanken Grotesque', fontSize: 40, fontWeight: 600, color: theme.ink, marginTop: 40, fontVariantNumeric: 'tabular-nums', letterSpacing: 1 }}>{mm}:{ss}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '0 0 40px' }}>
        <button onClick={onStop} style={{
          width: 78, height: 78, borderRadius: '50%', border: `2px solid ${theme.accentEdge}`,
          background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: theme.shadow,
        }}>{ICON.stop(30, theme.accent)}</button>
        <div style={{ fontSize: 13, fontWeight: 500, color: theme.faint }}>Tap to finish</div>
      </div>
    </div>
  );
}

// ════════════════════ REFLECTION ════════════════════
function ReflectionScreen({ theme, entry, onBack }) {
  const e = entry || { time: DATA.time, dur: DATA.duration, transcript: DATA.transcript, mood: DATA.todayMood };
  const transcript = e.transcript || DATA.transcript;
  const [playing, setPlaying] = useState(false);
  const wf = [40, 62, 30, 78, 52, 90, 44, 66, 38, 84, 56, 72, 34, 60, 48, 80, 42, 70, 36, 58, 88, 50, 64, 46, 76, 40, 68, 54];
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px 10px' }}>
        <button onClick={onBack} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 6, marginLeft: -6 }}>{ICON.back(24, theme.ink)}</button>
        <span style={{ fontSize: 15, fontWeight: 600, color: theme.ink }}>Reflection</span>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 6 }}>{ICON.bookmark(21, theme.muted)}</button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '6px 22px 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: theme.sub }}>{e.time || DATA.time}</span>
          <span style={{ width: 3, height: 3, borderRadius: 3, background: theme.faint }} />
          <span style={{ fontSize: 13.5, color: theme.muted }}>{e.dur || DATA.duration}</span>
        </div>

        {/* playback */}
        <div style={{ marginTop: 16, background: theme.card, border: `1px solid ${theme.hair}`, borderRadius: 20, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => setPlaying(p => !p)} style={{ width: 46, height: 46, flexShrink: 0, borderRadius: '50%', border: 'none', cursor: 'pointer', background: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {playing ? ICON.pause(20, '#fff') : ICON.play(20, '#fff')}
          </button>
          <Waveform theme={theme} bars={wf} progress={0.42} height={34} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: theme.muted, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>0:54</span>
        </div>

        {/* transcript */}
        <div style={{ marginTop: 26 }}>
          <SectionLabel theme={theme}>In your words</SectionLabel>
          <p style={{ margin: '12px 0 0', fontSize: 16.5, lineHeight: 1.62, color: theme.ink, textWrap: 'pretty' }}>{transcript}</p>
        </div>

        {/* AI reflection */}
        <div style={{ marginTop: 28, background: theme.accentSoft, border: `1px solid ${theme.accentEdge}`, borderRadius: 24, padding: '20px 20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: theme.card, border: `1px solid ${theme.accentEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ICON.spark(16, theme.accent)}</div>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.4, color: theme.accent }}>Aria reflects</span>
          </div>
          <p style={{ margin: 0, fontFamily: 'Newsreader, serif', fontSize: 19.5, lineHeight: 1.55, color: theme.ink, textWrap: 'pretty' }}>{DATA.ai}</p>
        </div>

        {/* noticed */}
        <div style={{ marginTop: 26 }}>
          <SectionLabel theme={theme}>What I noticed</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            <Chip theme={theme} tone={moodColor(e.mood || DATA.todayMood, theme.dark)}>
              <span style={{ width: 7, height: 7, borderRadius: 7, background: moodColor(e.mood || DATA.todayMood, theme.dark) }} />
              {moodWord(e.mood || DATA.todayMood)}
            </Chip>
            {DATA.themes.map(t => <Chip key={t} theme={theme}>{t}</Chip>)}
          </div>
        </div>

        {/* feedback / done */}
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 14, color: theme.muted }}>Did this land for you?</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 42, height: 42, borderRadius: '50%', border: `1px solid ${theme.line}`, background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ICON.heart(19, theme.accent)}</button>
          </div>
        </div>

        <button onClick={onBack} style={{ marginTop: 22, width: '100%', padding: '16px', borderRadius: 18, border: 'none', cursor: 'pointer', background: theme.ink, color: theme.bg, fontSize: 15.5, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {ICON.check(19, theme.bg)} Done for today
        </button>
      </div>
    </div>
  );
}

// ════════════════════ INSIGHTS / MOOD CHART ════════════════════
function InsightsScreen({ theme, onOpen }) {
  const avg = Math.round(DATA.week.reduce((a, b) => a + b, 0) / DATA.week.length);
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{ fontSize: 25, fontWeight: 600, color: theme.ink, letterSpacing: -0.3 }}>Insights</div>
        <div style={{ fontSize: 14.5, color: theme.muted, marginTop: 3 }}>How your week has felt</div>
      </div>

      {/* chart card */}
      <div style={{ margin: '18px 22px 0', background: theme.card, border: `1px solid ${theme.hair}`, borderRadius: 24, padding: '18px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px 6px' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.ink }}>This week</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 600, color: theme.accent, background: theme.accentSoft, padding: '5px 10px', borderRadius: 999 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-6 4 4 6-7"/><path d="M16 8h4v4"/></svg>
            Trending up
          </span>
        </div>
        <MoodChart data={DATA.week} labels={DATA.weekLabels} theme={theme} width={332} height={170} />
      </div>

      {/* summary stats */}
      <div style={{ display: 'flex', gap: 10, padding: '14px 22px 0' }}>
        {[
          { k: 'Average', v: moodWord(avg), c: moodColor(avg, theme.dark) },
          { k: 'Best day', v: 'Friday', c: theme.accent },
          { k: 'Entries', v: '7', c: theme.sub },
        ].map(s => (
          <div key={s.k} style={{ flex: 1, background: theme.card, border: `1px solid ${theme.hair}`, borderRadius: 18, padding: '13px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.7, textTransform: 'uppercase', color: theme.muted }}>{s.k}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.c, marginTop: 5, letterSpacing: -0.2 }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* past entries */}
      <div style={{ padding: '26px 22px 8px' }}>
        <SectionLabel theme={theme}>Past reflections</SectionLabel>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 22px 24px' }}>
        {DATA.entries.map((e, i) => (
          <button key={i} onClick={() => onOpen(e)} style={{
            textAlign: 'left', border: `1px solid ${theme.hair}`, background: theme.card,
            borderRadius: 20, padding: '15px 16px', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center',
            fontFamily: 'inherit',
          }}>
            <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 14, background: hexA(moodColor(e.mood, theme.dark), theme.dark ? 0.18 : 0.13), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 9, height: 9, borderRadius: 9, background: moodColor(e.mood, theme.dark) }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: theme.ink }}>{e.day}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: moodColor(e.mood, theme.dark) }}>{moodWord(e.mood)}</span>
              </div>
              <div style={{ fontSize: 13.5, color: theme.muted, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.text}</div>
            </div>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <span style={{ fontSize: 12, color: theme.faint, fontWeight: 500 }}>{e.dur}</span>
              {ICON.arrow(16, theme.faint)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════ PROFILE (light) ════════════════════
function ProfileScreen({ theme }) {
  const rows = [
    ['Reflections', '142'],
    ['Longest streak', '21 days'],
    ['Member since', 'March 2025'],
  ];
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 22px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 12 }}>
        <Avatar theme={theme} size={84} />
        <div style={{ fontSize: 22, fontWeight: 600, color: theme.ink }}>{DATA.user} Ellis</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: theme.accent, background: theme.accentSoft, padding: '6px 12px', borderRadius: 999 }}>
          <Sprout size={15} color={theme.accent} /> {DATA.streak}-day streak
        </div>
      </div>
      <div style={{ marginTop: 26, background: theme.card, border: `1px solid ${theme.hair}`, borderRadius: 22, overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 18px', borderTop: i ? `1px solid ${theme.hair}` : 'none' }}>
            <span style={{ fontSize: 15, color: theme.sub }}>{r[0]}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: theme.ink }}>{r[1]}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, background: theme.accentSoft, border: `1px solid ${theme.accentEdge}`, borderRadius: 22, padding: '18px 20px' }}>
        <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 18, lineHeight: 1.45, color: theme.ink }}>“You've shown up for yourself {DATA.streak} evenings in a row. That's not nothing.”</div>
      </div>
    </div>
  );
}

// ════════════════════ APP SHELL ════════════════════
function JournalApp({ accent = 'sage', dark = false, initial = 'home' }) {
  const theme = makeTheme(accent, dark);
  const startOverlay = initial === 'reflection' ? 'reflection' : null;
  const startTab = initial === 'insights' ? 'insights' : (initial === 'profile' ? 'profile' : 'home');
  const [tab, setTab] = useState(startTab);
  const [overlay, setOverlay] = useState(startOverlay); // null | 'recording' | 'reflection'
  const [entry, setEntry] = useState(null);

  let body;
  if (tab === 'insights') body = <InsightsScreen theme={theme} onOpen={(e) => { setEntry(e); setOverlay('reflection'); }} />;
  else if (tab === 'profile') body = <ProfileScreen theme={theme} />;
  else body = <HomeScreen theme={theme} onRecord={() => setOverlay('recording')} />;

  return (
    <Phone theme={theme}>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {body}
        <BottomNav active={tab} onChange={(t) => { setTab(t); setEntry(null); }} theme={theme} />
      </div>

      {overlay === 'recording' && (
        <RecordingOverlay theme={theme} onStop={() => setOverlay('reflection')} onCancel={() => setOverlay(null)} />
      )}
      {overlay === 'reflection' && (
        <div style={{ position: 'absolute', inset: 0, background: theme.bg, zIndex: 20, display: 'flex', flexDirection: 'column' }}>
          <ReflectionScreen theme={theme} entry={entry} onBack={() => { setOverlay(null); setEntry(null); }} />
        </div>
      )}
    </Phone>
  );
}

Object.assign(window, { JournalApp, DATA });
