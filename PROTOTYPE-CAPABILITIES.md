# Prototype Capabilities Reference

> What's actually working in the self-learning platform prototype

**Live Demo:** https://brighterly-app.vercel.app/

---

## At a Glance

| Metric | Value |
|--------|-------|
| **Questions** | 3,668 (CCSS-aligned, Grade 3 Math & ELA) |
| **Lessons** | 160 themed lessons |
| **Lesson Themes** | 8 (treasure hunt, space explorer, animal kingdom, etc.) |
| **Build Time** | ~5 hours |
| **AI Token Cost** | ~$15 |
| **Database Tables** | 18 |

---

## What's Working

### Kid Portal (`/kid`)

| Feature | Implementation | Location |
|---------|---------------|----------|
| **Adaptive Difficulty** | 2 correct → harder, 2 wrong → easier. Three difficulty buckets with fallback selection | `src/app/kid/task/[taskId]/question-flow.tsx` |
| **7-Question Sessions** | Base 7 questions + 0-2 review questions based on skill position | Same file |
| **XP & Leveling** | 50 XP per task. Level formula: `25 × level × (level-1)` | `src/lib/actions/answers.ts:218-222` |
| **Streak Tracking** | 7-day streak with visual calendar, persists across sessions | `src/app/kid/page.tsx` |
| **9 Badge Types** | `streak_7`, `level_1/5/10`, `perfect_score`, `retry_1/3`, `first_task`, `ten_tasks` | `src/app/api/seed-badges/route.ts` |
| **Badge Celebrations** | Modal with confetti animation on badge unlock | `src/components/kid/badge-display.tsx` |
| **Personalized Tutor Messages** | "Ms. Sarah Chen sent you challenges!" shown dynamically | Kid dashboard |
| **Progress Visualization** | Skills mastered, current level, XP progress bar | Kid dashboard |

### Parent Portal (`/parent`)

| Feature | Implementation | Location |
|---------|---------------|----------|
| **Parent PIN Gate** | 4-digit PIN required before viewing analytics (COPPA compliance) | `src/app/parent/parent-pin-gate.tsx` |
| **Multi-Child Support** | Kid switcher with "Current" indicator, ordered by creation date | `src/app/parent/page.tsx:655-680` |
| **Learning Insights** | Strengths/weaknesses extraction, skill-level breakdown | Parent dashboard |
| **Conversation Starters** | "Ask About Fractions", "Celebrate the Streak!" - specific talking points | Parent dashboard |
| **Notification Preferences** | Matrix of channel (Email/SMS/WhatsApp) × event type | Parent dashboard |
| **Weekly Summary** | Tasks completed, accuracy rate, time spent, streak status | Parent dashboard |

### Tutor Portal (`/tutor`)

| Feature | Implementation | Location |
|---------|---------------|----------|
| **Student Performance View** | Per-student accuracy, completion rates, struggling skills | Tutor dashboard |
| **Question Library** | Browse all 3,668 questions by skill, difficulty, lesson | Tutor view |
| **Read-Only Access** | Tutors can view but not modify student data | Current scope |

### Demo/Auth Features

| Feature | Implementation |
|---------|---------------|
| **Dual-Tab Login/SignUp** | Seamless mode switching, reduces friction for new users |
| **Demo Mode** | Pre-seeded accounts for Kid, Parent, Tutor roles |
| **Simulation Mode** | "Next Day" button advances time for streak/progress demos |
| **Session Persistence** | Auth state maintained across browser sessions |

---

## Technical Quality

### Design System
- **50+ CSS variables** for consistent theming
- **Subject-specific colors** (Math blue, ELA orange)
- **Dark mode** via `body.dark-mode` class with full variable override (`src/app/globals.css:58-69`)

### Mobile Responsiveness
| Breakpoint | Target |
|------------|--------|
| `1024px` | Tablet |
| `900px` | Mobile landscape |
| `600px` | Mobile portrait |

All grids collapse to single column, touch-friendly button sizing (44px minimum), readable font scaling.

### COPPA Compliance (Built-In)
- **Parent-only authentication** - kids don't create accounts
- **No child PII collection** - names are parent-provided
- **PIN-gated analytics** - children can't access their own performance data
- **Parent-controlled notifications** - all external comms go to parents

### Database Architecture
- **18 tables** with proper foreign keys and indexes
- **Views** for efficient aggregation queries
- **Cascade deletes** to maintain referential integrity
- **Enum types** for difficulty levels, question types

---

## What's Planned But Not Built

Honest inventory of GTM features not yet implemented:

| Feature | GTM Status | Reality |
|---------|------------|---------|
| Push notifications | Phase 1 | UI preferences only - no OneSignal integration |
| Tutor assignment workflow | Phase 2 | Tutor view is read-only |
| ML-based adaptation | Tier 2 | Current algorithm is rule-based (2 correct/wrong) |
| Collection/pets system | Phase 2 | Not started |
| AI content generation | Phase 2 | All 3,668 questions are pre-seeded |
| Additional grades | Phase 2 | Grade 3 only currently |

---

## How to Demo

### Quick Walkthrough (5 min)

1. **Start at login** → Show dual-tab Login/SignUp UX
2. **Kid portal** → Complete 2-3 questions, show adaptive difficulty adjusting
3. **Earn a badge** → Show celebration modal with confetti
4. **Switch to parent** → Enter PIN (any 4 digits in demo)
5. **Parent dashboard** → Show multi-child switcher, learning insights, conversation starters
6. **Notification preferences** → Show channel × event matrix
7. **Tutor view** → Show question library and student performance
8. **Simulation mode** → Click "Next Day" to advance streak

### Key Talking Points

- **Lean build**: 5 hours, $15 in AI tokens → 3,668 questions
- **Production-ready schema**: Not a wireframe, real database with proper architecture
- **COPPA by design**: Parent PIN gate, parent-only notifications, no child accounts
- **Adaptive from day 1**: Difficulty adjusts in real-time, not just post-session

---

## Code References

For stakeholders wanting to verify implementation:

| Feature | File |
|---------|------|
| Database schema | `supabase/migrations/` |
| Gamification (XP/levels) | `src/lib/actions/answers.ts` |
| Adaptive difficulty | `src/app/kid/task/[taskId]/question-flow.tsx` |
| Parent PIN gate | `src/app/parent/parent-pin-gate.tsx` |
| Badge system | `src/components/kid/badge-display.tsx` |
| CSS variables/dark mode | `src/app/globals.css` |
| Question seed data | `supabase/seeds/prod-full-seed.sql` |

---

## The PM Story This Tells

1. **Research done** → Competitor analysis, COPPA requirements, market sizing
2. **Scoped lean** → Tier 1 vs Tier 2 features, clear MVP boundaries
3. **Built something real** → 3,668 questions, working adaptive difficulty, full gamification
4. **Fast and cheap** → 5 hours, $15, AI-assisted content generation
5. **Knows what's next** → Honest "not built yet" items, clear Phase 2 roadmap

This positions the approach as a PM who ships, not just plans.
