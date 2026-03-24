import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0F1117",
  surface: "#1A1D27",
  surfaceHover: "#222638",
  border: "#2A2D3E",
  accent: "#6C63FF",
  accentSoft: "#3D3870",
  accentGlow: "rgba(108,99,255,0.15)",
  green: "#22D3A5",
  greenSoft: "#0D3D30",
  orange: "#FF8C42",
  orangeSoft: "#3D2510",
  yellow: "#FFD166",
  red: "#FF5A5F",
  textPrimary: "#F0F2FF",
  textSecondary: "#8B90A7",
  textMuted: "#4A4E6A",
};

const screens = ["overview", "child", "parent", "tutor", "monetization", "roadmap"];
const screenLabels = ["Product Overview", "Child View", "Parent Dashboard", "Tutor Brief", "Monetization", "Roadmap"];

// ─── DATA ───────────────────────────────────────────────────────────────────

const practiceData = {
  child: {
    name: "Emma",
    grade: 4,
    tutor: "Sarah",
    streak: 7,
    stars: 142,
    level: 12,
    todayDone: false,
    challenges: [
      { id: 1, topic: "Fractions", difficulty: "Medium", stars: 3, question: "Which fraction is larger: 3/4 or 2/3?", options: ["3/4", "2/3", "They are equal", "Cannot tell"], correct: 0, hint: "Try converting both to the same denominator" },
      { id: 2, topic: "Mixed Numbers", difficulty: "Hard", stars: 5, question: "Convert 7/3 into a mixed number.", options: ["2⅓", "1⅔", "3⅓", "2⅔"], correct: 0, hint: "How many times does 3 go into 7?" },
      { id: 3, topic: "Word Problems", difficulty: "Medium", stars: 4, question: "Emma has 3/4 of a pizza. She eats 1/4. How much is left?", options: ["1/4", "2/4", "1/2", "Both B and C are correct"], correct: 3, hint: "3/4 minus 1/4 — and remember 2/4 equals 1/2" },
    ]
  },
  parent: {
    childName: "Emma",
    weekAccuracy: 78,
    weekSessions: 5,
    totalTime: 42,
    streakDays: 7,
    trend: [62, 65, 70, 72, 71, 76, 78],
    topics: [
      { name: "Fractions", accuracy: 82, trend: "up", sessions: 8 },
      { name: "Mixed Numbers", accuracy: 61, trend: "watch", sessions: 5 },
      { name: "Word Problems", accuracy: 74, trend: "up", sessions: 6 },
      { name: "Multiplication", accuracy: 91, trend: "strong", sessions: 4 },
    ],
    recentActivity: [
      { day: "Today", completed: true, score: "2/3", topic: "Fractions", time: "9 min" },
      { day: "Yesterday", completed: true, score: "3/3", topic: "Multiplication", time: "7 min" },
      { day: "Monday", completed: true, score: "2/3", topic: "Mixed Numbers", time: "11 min" },
      { day: "Sunday", completed: false, score: null, topic: null, time: null },
    ]
  },
  tutor: {
    tutorName: "Sarah",
    studentName: "Emma",
    nextSession: "Wednesday 4:00 PM",
    practiceData: {
      sessionsSinceTutor: 4,
      avgAccuracy: 74,
      timeSpent: 38,
    },
    focusAreas: [
      { topic: "Mixed Numbers", accuracy: 61, recommendation: "Spend first 10 min here — accuracy below threshold", priority: "high" },
      { topic: "Word Problems", accuracy: 74, recommendation: "Good progress but inconsistent. Quick review recommended.", priority: "medium" },
      { topic: "Fractions", accuracy: 82, recommendation: "Strong. Can advance to comparing unlike denominators.", priority: "low" },
    ],
    suggestedPlan: "Open with a 2-minute mixed numbers review using visual models. Emma responds better to diagrams than abstract notation — she used the diagram hint 3 times this week. Then advance fractions to unlike denominators. Close with one word problem to reinforce application."
  }
};

const roadmapData = [
  {
    month: "Month 1",
    theme: "Core Loop",
    color: COLORS.accent,
    goal: "Does the loop work?",
    items: ["AI exercise generation pipeline", "Rules-based difficulty adjustment", "Tutor post-session notes input", "Tutor pre-session brief", "Parent email digest", "10% soft launch"],
    metric: "60% complete 3+ sessions in 2 weeks",
    stop: "Tutor brief adoption < 40% → stop, fix"
  },
  {
    month: "Month 2",
    theme: "Retention",
    color: COLORS.green,
    goal: "Do users come back?",
    items: ["Streak + star mechanics", "Parent dashboard V1", "Exercise variety expansion", "A/B test communication framing", "100% subscriber rollout"],
    metric: "D30 retention: Practice vs non-Practice",
    stop: "D30 retention < 20% → redesign before freemium"
  },
  {
    month: "Month 3",
    theme: "Acquisition",
    color: COLORS.orange,
    goal: "Can we grow without tutors?",
    items: ["Freemium standalone tier", "Paid standalone $9.99/mo", "Onboarding for non-tutor users", "SEO landing pages", "Small paid acquisition test $5K"],
    metric: "Freemium-to-paid conversion ≥ 5%",
    stop: "Conversion < 3% → fix product, pause acquisition spend"
  },
  {
    month: "Month 4",
    theme: "Personalization",
    color: COLORS.yellow,
    goal: "Does ML beat rules?",
    items: ["ML difficulty model (trained on 3mo data)", "Concept knowledge graph", "Reading comprehension exercises", "Parent dashboard V2 with concept map"],
    metric: "ML accuracy improvement > rules-based baseline",
    stop: "Reading engagement < 50% of math → hold reading content"
  },
  {
    month: "Month 5–6",
    theme: "Scale",
    color: "#FF6B9D",
    goal: "Hit 30% WAU target",
    items: ["Weekly challenge mode", "SAT/ACT prep (grades 7–9)", "Advanced parent analytics", "Referral mechanism", "Monetization optimization"],
    metric: "30% WAU of active subscribers",
    stop: "WAU < 20% at month 5 → immediate qualitative study"
  }
];

const monetizationOptions = [
  {
    id: "A",
    name: "Included in Subscription",
    tag: "Recommended for Launch",
    tagColor: COLORS.green,
    price: "Free for subscribers",
    description: "Practice included at no extra cost for all active tutoring subscribers.",
    pros: ["Zero friction adoption", "Pure retention play", "2% churn reduction = ~$77K saved MRR per point"],
    cons: ["No direct revenue from feature", "Requires strong tutoring product"],
    timing: "Launch — Month 1",
    revenue: "Indirect via churn reduction"
  },
  {
    id: "B",
    name: "Freemium Standalone",
    tag: "New Acquisition Channel",
    tagColor: COLORS.accent,
    price: "$9.99/mo standalone",
    description: "Free tier (3 exercises/day) opens Brighterly to non-tutoring families. Premium unlocks full engine + dashboard.",
    pros: ["New acquisition channel", "~100 new tutor subscribers/mo at 10% conversion", "No tutor supply needed"],
    cons: ["Cannibalization risk if standalone too good", "Different onboarding path needed"],
    timing: "Month 3 launch",
    revenue: "$9.99/mo × conversion rate"
  },
  {
    id: "C",
    name: "Premium Upsell",
    tag: "H2 2026",
    tagColor: COLORS.orange,
    price: "+$19.99/mo add-on",
    description: "AI writing coach, advanced analytics, SAT/ACT prep exercises as optional upgrade for engaged subscribers.",
    pros: ["Monetizes power users", "Natural upgrade path", "High-value segment (SAT prep parents)"],
    cons: ["Requires strong base product first", "Pricing sensitivity unknown"],
    timing: "Month 5–6",
    revenue: "$19.99/mo × power user segment"
  }
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const Tag = ({ children, color = COLORS.accent }) => (
  <span style={{
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    background: `${color}22`,
    color: color,
    border: `1px solid ${color}44`,
  }}>{children}</span>
);

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: 24,
    cursor: onClick ? "pointer" : "default",
    transition: "all 0.2s",
    ...style
  }}
    onMouseEnter={e => onClick && (e.currentTarget.style.borderColor = COLORS.accent)}
    onMouseLeave={e => onClick && (e.currentTarget.style.borderColor = COLORS.border)}
  >{children}</div>
);

const Stat = ({ label, value, sub, color = COLORS.textPrimary }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: "Georgia, serif", lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: COLORS.green, marginTop: 2 }}>{sub}</div>}
    <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>{label}</div>
  </div>
);

const MiniBar = ({ value, max = 100, color = COLORS.accent }) => (
  <div style={{ background: COLORS.border, borderRadius: 4, height: 6, width: "100%", overflow: "hidden" }}>
    <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.8s ease" }} />
  </div>
);

const SparkLine = ({ data, color = COLORS.accent }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 40, w = 120;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.split(" ").pop().split(",")[0]} cy={pts.split(" ").pop().split(",")[1]} r={3} fill={color} />
    </svg>
  );
};

// ─── SCREEN COMPONENTS ───────────────────────────────────────────────────────

function OverviewScreen({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "48px 0 32px" }}>
        <div style={{ display: "inline-block", background: COLORS.accentGlow, border: `1px solid ${COLORS.accentSoft}`, borderRadius: 32, padding: "6px 20px", fontSize: 12, color: COLORS.accent, marginBottom: 20, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Brighterly Practice — Product Case
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: COLORS.textPrimary, margin: "0 0 12px", fontFamily: "Georgia, serif", lineHeight: 1.1 }}>
          From Tutoring<br />
          <span style={{ color: COLORS.accent }}>to Learning Platform</span>
        </h1>
        <p style={{ fontSize: 18, color: COLORS.textSecondary, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.6 }}>
          A self-learning layer that extends the tutor's reach to every day of the week — without replacing the relationship that makes Brighterly work.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Tag color={COLORS.green}>Goal: 30% WAU by Q3 2026</Tag>
          <Tag color={COLORS.accent}>AI-Powered Practice</Tag>
          <Tag color={COLORS.orange}>3 Monetization Paths</Tag>
        </div>
      </div>

      {/* The problem in numbers */}
      <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.accentGlow})` }}>
        <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>The Value Gap</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <Stat value="97%" label="of waking hours platform is invisible" color={COLORS.red} sub="critical gap" />
          <Stat value="48h" label="until retention decay begins after lesson" color={COLORS.orange} sub="cognitive science" />
          <Stat value="3×" label="YoY growth cap without self-learning layer" color={COLORS.yellow} sub="scaling ceiling" />
        </div>
      </Card>

      {/* The three-sided loop */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { icon: "👧", label: "Child", color: COLORS.accent, desc: "10-min daily challenge seeded from last session. Feels like a game, not homework." },
          { icon: "👩‍👧", label: "Parent", color: COLORS.green, desc: "Daily signal: your child practiced today. Weekly trend: are they improving?" },
          { icon: "👩‍🏫", label: "Tutor", color: COLORS.orange, desc: "Pre-session brief: what the child struggled with since last time. Show up prepared." }
        ].map(p => (
          <Card key={p.label} onClick={() => onNavigate(p.label === "Child" ? "child" : p.label === "Parent" ? "parent" : "tutor")} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{p.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: p.color, marginBottom: 8 }}>{p.label} View</div>
            <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}>{p.desc}</div>
            <div style={{ marginTop: 12, fontSize: 12, color: COLORS.accent }}>View prototype →</div>
          </Card>
        ))}
      </div>

      {/* Competitive moat */}
      <Card>
        <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>The Moat Nobody Can Copy</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { name: "Synthesis", has: "Adaptive AI practice", lacks: "Human tutor; wrong customer", color: COLORS.orange },
            { name: "Khan Academy", has: "Free AI tutor (1.4M users)", lacks: "No live session data to seed from", color: COLORS.yellow },
            { name: "Brighterly Practice", has: "Both — session-seeded AI practice", lacks: "Needs to be built", color: COLORS.green }
          ].map(c => (
            <div key={c.name} style={{ background: COLORS.bg, borderRadius: 12, padding: 16, border: `1px solid ${c.color}33` }}>
              <div style={{ fontWeight: 700, color: c.color, marginBottom: 8, fontSize: 14 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: COLORS.green, marginBottom: 4 }}>✓ {c.has}</div>
              <div style={{ fontSize: 12, color: COLORS.red }}>✗ {c.lacks}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ChildScreen() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState([]);
  const { child } = practiceData;
  const q = child.challenges[currentQ];

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQ < child.challenges.length - 1) {
      setCompleted([...completed, currentQ]);
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const isCorrect = selected === q.correct;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, color: COLORS.textPrimary, fontSize: 22, fontWeight: 800 }}>Hey {child.name}! 👋</h2>
          <p style={{ margin: "4px 0 0", color: COLORS.textSecondary, fontSize: 14 }}>
            {child.tutor} left you {child.challenges.length} challenges from Tuesday's session
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ textAlign: "center", background: COLORS.orangeSoft, borderRadius: 12, padding: "8px 16px" }}>
            <div style={{ fontSize: 20 }}>🔥</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.orange }}>{child.streak}</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary }}>day streak</div>
          </div>
          <div style={{ textAlign: "center", background: COLORS.accentSoft, borderRadius: 12, padding: "8px 16px" }}>
            <div style={{ fontSize: 20 }}>⭐</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.yellow }}>{child.stars}</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary }}>stars</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {child.challenges.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 4,
            background: i < currentQ || completed.includes(i) ? COLORS.green : i === currentQ ? COLORS.accent : COLORS.border,
            transition: "background 0.3s"
          }} />
        ))}
      </div>

      {/* Question Card */}
      <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.bg})` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <Tag color={COLORS.accent}>{q.topic}</Tag>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: q.stars }).map((_, i) => (
              <span key={i} style={{ color: COLORS.yellow, fontSize: 14 }}>⭐</span>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 24, lineHeight: 1.4 }}>
          {q.question}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = COLORS.bg;
            let border = COLORS.border;
            let color = COLORS.textPrimary;
            if (answered) {
              if (i === q.correct) { bg = COLORS.greenSoft; border = COLORS.green; color = COLORS.green; }
              else if (i === selected && !isCorrect) { bg = "#3D1015"; border = COLORS.red; color = COLORS.red; }
            } else if (selected === i) { bg = COLORS.accentGlow; border = COLORS.accent; }
            return (
              <div key={i} onClick={() => handleAnswer(i)} style={{
                padding: "12px 16px", borderRadius: 12, border: `2px solid ${border}`,
                background: bg, color, cursor: "pointer", fontWeight: 600, fontSize: 14,
                transition: "all 0.2s"
              }}>
                {answered && i === q.correct && "✓ "}{opt}
              </div>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: isCorrect ? COLORS.greenSoft : COLORS.orangeSoft, border: `1px solid ${isCorrect ? COLORS.green : COLORS.orange}` }}>
            <div style={{ fontWeight: 700, color: isCorrect ? COLORS.green : COLORS.orange, marginBottom: 4 }}>
              {isCorrect ? "🎉 Correct!" : "💡 Not quite — here's a hint:"}
            </div>
            <div style={{ fontSize: 13, color: COLORS.textSecondary }}>{q.hint}</div>
          </div>
        )}
      </Card>

      {answered && currentQ < child.challenges.length - 1 && (
        <button onClick={handleNext} style={{
          width: "100%", padding: 14, borderRadius: 12, border: "none",
          background: COLORS.accent, color: "white", fontSize: 16, fontWeight: 700,
          cursor: "pointer"
        }}>
          Next Challenge →
        </button>
      )}

      {answered && currentQ === child.challenges.length - 1 && (
        <Card style={{ textAlign: "center", background: `linear-gradient(135deg, ${COLORS.greenSoft}, ${COLORS.bg})`, border: `1px solid ${COLORS.green}` }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.green, marginBottom: 4 }}>All done today!</div>
          <div style={{ color: COLORS.textSecondary, marginBottom: 16 }}>Sarah will see your results before Wednesday's session.</div>
          <Tag color={COLORS.yellow}>+12 stars earned</Tag>
        </Card>
      )}
    </div>
  );
}

function ParentScreen() {
  const { parent } = practiceData;
  const trendColor = (t) => t === "up" ? COLORS.green : t === "strong" ? COLORS.accent : t === "watch" ? COLORS.orange : COLORS.red;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: COLORS.textPrimary, fontSize: 22, fontWeight: 800 }}>{parent.childName}'s Progress</h2>
        <p style={{ margin: "4px 0 0", color: COLORS.textSecondary, fontSize: 14 }}>This week · Updated today</p>
      </div>

      {/* Top stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
        {[
          { value: `${parent.weekAccuracy}%`, label: "Accuracy", color: COLORS.green, sub: "+6% vs last week" },
          { value: parent.weekSessions, label: "Sessions", color: COLORS.accent, sub: "this week" },
          { value: `${parent.totalTime}m`, label: "Time practiced", color: COLORS.yellow, sub: "since last lesson" },
          { value: `${parent.streakDays}🔥`, label: "Day streak", color: COLORS.orange, sub: "personal best!" }
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center", padding: 16 }}>
            <Stat {...s} />
          </Card>
        ))}
      </div>

      {/* Accuracy trend */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary }}>Accuracy Trend — Last 7 Days</div>
          <Tag color={COLORS.green}>Improving</Tag>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
          {parent.trend.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{v}%</div>
              <div style={{
                width: "100%", borderRadius: "4px 4px 0 0",
                height: `${(v / 100) * 80}px`,
                background: i === parent.trend.length - 1 ? COLORS.green : COLORS.accentSoft,
                transition: "height 0.8s ease"
              }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Today"].map(d => (
            <div key={d} style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center", flex: 1 }}>{d}</div>
          ))}
        </div>
      </Card>

      {/* Topics */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 16 }}>Topics This Week</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {parent.topics.map(t => (
            <div key={t.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontSize: 14, color: COLORS.textPrimary, fontWeight: 600 }}>{t.name}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: trendColor(t.trend) }}>
                    {t.trend === "up" ? "↑" : t.trend === "strong" ? "★" : t.trend === "watch" ? "⚠" : "↓"} {t.accuracy}%
                  </span>
                </div>
              </div>
              <MiniBar value={t.accuracy} color={trendColor(t.trend)} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: COLORS.orangeSoft, border: `1px solid ${COLORS.orange}33` }}>
          <div style={{ fontSize: 13, color: COLORS.orange, fontWeight: 600 }}>⚠ Mixed Numbers needs attention</div>
          <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>Accuracy at 61%. Sarah will focus here Wednesday.</div>
        </div>
      </Card>

      {/* Recent activity */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 16 }}>Recent Activity</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {parent.recentActivity.map(a => (
            <div key={a.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 10, background: COLORS.bg }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: a.completed ? COLORS.greenSoft : COLORS.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  {a.completed ? "✓" : "–"}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>{a.day}</div>
                  {a.topic && <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{a.topic} · {a.time}</div>}
                </div>
              </div>
              {a.score && <Tag color={COLORS.green}>{a.score}</Tag>}
            </div>
          ))}
        </div>
      </Card>

      <button style={{ width: "100%", padding: 14, borderRadius: 12, border: `1px solid ${COLORS.accent}`, background: "transparent", color: COLORS.accent, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Message Sarah about Mixed Numbers →
      </button>
    </div>
  );
}

function TutorScreen() {
  const { tutor } = practiceData;
  const prioColor = (p) => p === "high" ? COLORS.red : p === "medium" ? COLORS.orange : COLORS.green;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, color: COLORS.textPrimary, fontSize: 22, fontWeight: 800 }}>Pre-Session Brief</h2>
          <p style={{ margin: "4px 0 0", color: COLORS.textSecondary, fontSize: 14 }}>
            {tutor.studentName} · {tutor.nextSession}
          </p>
        </div>
        <Tag color={COLORS.green}>AI Generated</Tag>
      </div>

      {/* Practice summary since last session */}
      <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.accentGlow})` }}>
        <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Since Last Session</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <Stat value={tutor.practiceData.sessionsSinceTutor} label="Practice sessions" color={COLORS.accent} />
          <Stat value={`${tutor.practiceData.avgAccuracy}%`} label="Average accuracy" color={COLORS.yellow} />
          <Stat value={`${tutor.practiceData.timeSpent}m`} label="Total practice time" color={COLORS.green} />
        </div>
      </Card>

      {/* Focus areas */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 16 }}>Recommended Focus Areas</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tutor.focusAreas.map(f => (
            <div key={f.topic} style={{ padding: 14, borderRadius: 12, background: COLORS.bg, border: `1px solid ${prioColor(f.priority)}33` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, color: COLORS.textPrimary, fontSize: 15 }}>{f.topic}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: prioColor(f.priority) }}>{f.accuracy}%</span>
                  <Tag color={prioColor(f.priority)}>{f.priority}</Tag>
                </div>
              </div>
              <MiniBar value={f.accuracy} color={prioColor(f.priority)} />
              <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 8 }}>{f.recommendation}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI suggested plan */}
      <Card style={{ marginBottom: 16, border: `1px solid ${COLORS.accent}44` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary }}>Suggested Session Plan</div>
          <Tag color={COLORS.accent}>AI Draft</Tag>
        </div>
        <p style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.7, margin: 0 }}>{tutor.suggestedPlan}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: COLORS.accent, color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Accept Plan</button>
          <button style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.textSecondary, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Modify</button>
        </div>
      </Card>

      <div style={{ padding: 14, borderRadius: 12, background: COLORS.greenSoft, border: `1px solid ${COLORS.green}33`, fontSize: 13, color: COLORS.textSecondary }}>
        <span style={{ color: COLORS.green, fontWeight: 700 }}>Behavioral note: </span>
        Emma used the diagram hint 3 times this week. She responds better to visual models than abstract notation. Use diagrams when introducing mixed numbers.
      </div>
    </div>
  );
}

function MonetizationScreen() {
  const [active, setActive] = useState("A");
  const opt = monetizationOptions.find(o => o.id === active);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: COLORS.textPrimary, fontSize: 22, fontWeight: 800 }}>Monetization Strategy</h2>
        <p style={{ margin: "4px 0 0", color: COLORS.textSecondary, fontSize: 14 }}>Three paths — recommended sequencing below</p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {monetizationOptions.map(o => (
          <button key={o.id} onClick={() => setActive(o.id)} style={{
            flex: 1, padding: "12px 0", borderRadius: 12,
            border: `2px solid ${active === o.id ? o.tagColor : COLORS.border}`,
            background: active === o.id ? `${o.tagColor}15` : "transparent",
            color: active === o.id ? o.tagColor : COLORS.textSecondary,
            fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
          }}>
            Option {o.id}
          </button>
        ))}
      </div>

      <Card style={{ marginBottom: 16, border: `1px solid ${opt.tagColor}44` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.textPrimary, marginBottom: 6 }}>{opt.name}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: opt.tagColor, fontFamily: "Georgia, serif" }}>{opt.price}</div>
          </div>
          <Tag color={opt.tagColor}>{opt.tag}</Tag>
        </div>
        <p style={{ color: COLORS.textSecondary, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{opt.description}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Advantages</div>
            {opt.pros.map(p => <div key={p} style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 6 }}>✓ {p}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 12, color: COLORS.red, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Watch out</div>
            {opt.cons.map(c => <div key={c} style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 6 }}>⚠ {c}</div>)}
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Recommended Sequence</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {monetizationOptions.map((o, i) => (
            <div key={o.id} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: i < 2 ? 20 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${o.tagColor}22`, border: `2px solid ${o.tagColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: o.tagColor, fontSize: 14 }}>{o.id}</div>
                {i < 2 && <div style={{ width: 2, flex: 1, background: COLORS.border, marginTop: 4 }} />}
              </div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ fontWeight: 700, color: COLORS.textPrimary, fontSize: 14 }}>{o.name}</div>
                <div style={{ fontSize: 12, color: o.tagColor, marginTop: 2 }}>{o.timing}</div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>Revenue: {o.revenue}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function RoadmapScreen() {
  const [expanded, setExpanded] = useState(0);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: COLORS.textPrimary, fontSize: 22, fontWeight: 800 }}>3–6 Month Roadmap</h2>
        <p style={{ margin: "4px 0 0", color: COLORS.textSecondary, fontSize: 14 }}>Progression logic: validate → retain → scale. Never skip ahead.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {roadmapData.map((phase, i) => (
          <div key={phase.month} style={{ borderRadius: 16, border: `1px solid ${expanded === i ? phase.color : COLORS.border}`, overflow: "hidden", transition: "border-color 0.2s" }}>
            <div onClick={() => setExpanded(expanded === i ? -1 : i)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px 20px", cursor: "pointer",
              background: expanded === i ? `${phase.color}10` : COLORS.surface
            }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${phase.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: phase.color }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 800, color: COLORS.textPrimary, fontSize: 15 }}>{phase.month}: {phase.theme}</div>
                  <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 2 }}>Key question: {phase.goal}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Tag color={phase.color}>{phase.items.length} items</Tag>
                <span style={{ color: COLORS.textMuted }}>{expanded === i ? "▲" : "▼"}</span>
              </div>
            </div>

            {expanded === i && (
              <div style={{ padding: "0 20px 20px", background: COLORS.bg }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: COLORS.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Build</div>
                    {phase.items.map(item => (
                      <div key={item} style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 6, display: "flex", gap: 8 }}>
                        <span style={{ color: phase.color }}>→</span> {item}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Success Signal</div>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 16, padding: 12, borderRadius: 10, background: COLORS.greenSoft, border: `1px solid ${COLORS.green}33` }}>
                      {phase.metric}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.red, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Stop / Pivot If</div>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary, padding: 12, borderRadius: 10, background: "#3D1015", border: `1px solid ${COLORS.red}33` }}>
                      {phase.stop}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Card style={{ marginTop: 16, background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.accentGlow})` }}>
        <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>North Star Target</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.green, fontFamily: "Georgia, serif" }}>30%</div>
            <div style={{ fontSize: 14, color: COLORS.textSecondary }}>Weekly Active Practice Rate by Q3 2026</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, color: COLORS.textSecondary }}>Current baseline</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.textMuted }}>0%</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>feature not yet built</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("overview");

  const screenComponents = {
    overview: <OverviewScreen onNavigate={setScreen} />,
    child: <ChildScreen />,
    parent: <ParentScreen />,
    tutor: <TutorScreen />,
    monetization: <MonetizationScreen />,
    roadmap: <RoadmapScreen />
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: COLORS.textPrimary }}>
      {/* Top nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: `${COLORS.bg}EE`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
            <span style={{ fontWeight: 800, fontSize: 16, color: COLORS.textPrimary }}>Brighterly Practice</span>
            <Tag color={COLORS.orange}>Prototype</Tag>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {screens.map((s, i) => (
              <button key={s} onClick={() => setScreen(s)} style={{
                padding: "6px 12px", borderRadius: 8, border: "none",
                background: screen === s ? COLORS.accentSoft : "transparent",
                color: screen === s ? COLORS.accent : COLORS.textMuted,
                fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.2s"
              }}>
                {screenLabels[i]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 24px 80px" }}>
        {screenComponents[screen]}
      </div>
    </div>
  );
}
