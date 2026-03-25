# CTO-PROJECT

> This file serves as the source of truth for building the Brighterly Self-Learning Platform. Keep it updated as the project evolves.

---

## Product Vision

**What are we building and why?**

A self-learning web app that helps kids (grades 1-9, ages 5-14) practice Math and ELA between their 1:1 tutoring sessions. The platform uses adaptive daily tasks, gamification, and multi-attempt retry logic to reinforce concepts — while giving parents and tutors visibility into progress and learning gaps.

**Strategic goal:** Transform Brighterly from a tutoring product to a learning platform, achieving **30%+ weekly active usage** of self-learning features by Q3 2026.

---

## User Personas

### Persona 1: The Kid (Primary User)
- **Ages:** 5-14 (Grades 1-9)
- **Goals:** Have fun while practicing, earn rewards, maintain streaks
- **Pain Points:** Traditional practice feels like homework, loses momentum between sessions
- **Behavior:** Short attention spans (5-15 min), responds to gamification, needs immediate feedback

### Persona 2: The Parent (Progress Monitor)
- **Background:** Paying $150-200/month for tutoring subscription
- **Goals:** See ROI on subscription, track child's progress, understand learning gaps
- **Pain Points:** Limited visibility between sessions, doesn't know what child is struggling with
- **Behavior:** Checks progress weekly, wants summaries not raw data

### Persona 3: The Tutor (Learning Guide)
- **Background:** 1:1 tutor conducting weekly sessions
- **Goals:** Know what to focus on, see what child practiced, come prepared
- **Pain Points:** No visibility into what happens between sessions, starts each session blind
- **Behavior:** Reviews progress before sessions, assigns practice based on lesson

---

## Core Features

### 1. Authentication (Simplified)
- **Kid Login:** Email + Name + Grade (no password)
- **Auto-create:** If email doesn't exist, create parent + link kid
- **Parent Access:** Protected by 4-digit code (accepts any code for prototype)

### 2. Daily Task System
- Each kid receives: **1 Math task + 1 ELA task** per day
- Each task: **exactly 7 questions** per attempt
- **Question sourcing:**
  - 5 questions from latest learned lesson
  - 1 question from ~1 week ago (spaced repetition)
  - 1 question from ~1 month ago

### 3. Adaptive Difficulty Engine
- Start at **medium** difficulty
- **2 consecutive wrong** → decrease difficulty
- **2 consecutive correct** → increase difficulty
- Range: easy ↔ medium ↔ hard

### 4. Multi-Attempt Retry System (Critical)
- Task completed only when: **≥5 correct in single attempt**
- If failed (<5 correct): **unlimited same-day retries**
- **Each attempt creates new record** (never overwrite)
- Session = all attempts for task on given day

### 5. Question Structure (Critical)
Each question includes:
```
- question_text
- difficulty: easy | medium | hard
- correct_answer
- wrong_answers: [3 options]
- success_statement: "Demonstrated understanding of [concept]"
- failure_statement: "Needs practice with [concept]"
```

### 6. Summary & Reporting Engine
Per task session (not per attempt):
- **Total attempts** count
- **Overall accuracy** (total_correct / total_questions across ALL attempts)
- **Statement aggregation:**
  - ALL failure statements from FIRST attempt ALWAYS preserved
  - Combine success/failure from all attempts
  - Remove duplicates
  - Output: strengths + needs improvement

### 7. Gamification System
- **XP:** Awarded once per task per day (only on completion)
- **Levels:** Progress based on XP
- **Streaks:** Daily completion → streak +1, miss → reset
- **Badges:** 7-day streak unlocks badge

### 8. Parent Dashboard
- Skill mastery by subject (% progress bars)
- Weekly accuracy trends
- Recent activity timeline
- Conversation starters for parent-child engagement
- Notification preferences

### 9. Tutor View
- Pre-session brief: what child struggled with
- Assign next week's tasks
- See self-learning summary stats

### 10. Simulation Mode
- **"Next Day" button:** Advances virtual day
- Generates new tasks
- Maintains streak logic

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State:** React hooks + Zustand (if needed)

### Backend
- **Primary Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (simplified - email only)
- **API:** Supabase Edge Functions or Next.js API routes
- **Real-time:** Supabase Realtime (for live updates if needed)

### Infrastructure
- **Frontend Hosting:** Vercel
- **Backend/API:** Railway (if Edge Functions insufficient)
- **Database:** Supabase (hosted PostgreSQL)

### Development
- **Package Manager:** pnpm
- **Testing:** Vitest + Testing Library
- **Linting:** ESLint + Prettier

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           VERCEL                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    Next.js Frontend                          │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐    │    │
│  │  │  Login   │ │ Kid Task │ │  Parent  │ │   Tutor      │    │    │
│  │  │   Page   │ │   View   │ │Dashboard │ │   View       │    │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘    │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ API Calls
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          SUPABASE                                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │   PostgreSQL    │  │  Edge Functions │  │    Supabase Auth    │  │
│  │   Database      │  │  (Business      │  │    (Email-only)     │  │
│  │                 │  │   Logic APIs)   │  │                     │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │
│                                                                      │
│  Tables:                                                            │
│  - parents           - skills            - task_attempts            │
│  - kids              - lessons           - skill_progress           │
│  - disciplines       - questions         - kid_gamification         │
│  - grades            - daily_tasks       - session_summaries        │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **Supabase over custom backend:** Faster MVP, built-in auth, real-time, Row Level Security
2. **Edge Functions for logic:** Task generation, adaptive difficulty, summary generation
3. **Multi-attempt as first-class:** Schema designed around preserving attempt history
4. **Statement-based reporting:** Questions carry their own success/failure explanations
5. **Simulation mode:** Virtual date for demo purposes (stored in DB, not system time)

---

## Database Schema

### Core Entities

```sql
-- Parents (account holders)
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kids (learners linked to parents)
CREATE TABLE kids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  grade_id UUID REFERENCES grades(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gamification stats per kid
CREATE TABLE kid_gamification (
  kid_id UUID PRIMARY KEY REFERENCES kids(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  last_active_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disciplines (Math, ELA)
CREATE TABLE disciplines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'math' | 'ela'
  display_name TEXT NOT NULL
);

-- Grades (1-9)
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'G1', 'G2', etc.
  display_name TEXT NOT NULL,
  sort_order INTEGER
);

-- Skills (skill tree nodes)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discipline_id UUID REFERENCES disciplines(id),
  grade_id UUID REFERENCES grades(id),
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER,
  prerequisite_skill_id UUID REFERENCES skills(id)
);

-- Lessons (tied to skills)
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES skills(id),
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER
);

-- Questions (the core content)
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id),
  question_text TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  correct_answer TEXT NOT NULL,
  wrong_answer_1 TEXT NOT NULL,
  wrong_answer_2 TEXT NOT NULL,
  wrong_answer_3 TEXT NOT NULL,
  success_statement TEXT NOT NULL, -- "Demonstrated understanding of..."
  failure_statement TEXT NOT NULL, -- "Needs practice with..."
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skill progress per kid
CREATE TABLE skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_id UUID REFERENCES kids(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id),
  state TEXT CHECK (state IN ('learned', 'revised', 'repeated_week', 'repeated_month')) DEFAULT 'learned',
  learned_at TIMESTAMPTZ,
  last_practiced_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kid_id, skill_id)
);

-- Daily tasks (generated per kid per day)
CREATE TABLE daily_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_id UUID REFERENCES kids(id) ON DELETE CASCADE,
  discipline_id UUID REFERENCES disciplines(id),
  task_date DATE NOT NULL,
  task_name TEXT NOT NULL,
  lesson_id UUID REFERENCES lessons(id), -- Primary lesson for this task
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kid_id, discipline_id, task_date)
);

-- Task attempts (CRITICAL: each retry is a NEW record)
CREATE TABLE task_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_task_id UUID REFERENCES daily_tasks(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  is_successful BOOLEAN, -- >=5 correct
  UNIQUE(daily_task_id, attempt_number)
);

-- Attempt answers (each question answered in an attempt)
CREATE TABLE attempt_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES task_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  question_order INTEGER NOT NULL, -- 1-7
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  difficulty_at_time TEXT NOT NULL, -- Track what difficulty was shown
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Session summaries (generated after session ends)
CREATE TABLE session_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_task_id UUID REFERENCES daily_tasks(id) ON DELETE CASCADE UNIQUE,
  total_attempts INTEGER NOT NULL,
  total_questions INTEGER NOT NULL, -- 7 * total_attempts
  total_correct INTEGER NOT NULL,
  accuracy_percent DECIMAL(5,2) NOT NULL,
  strengths TEXT[], -- Array of success statements
  needs_improvement TEXT[], -- Array of failure statements (first attempt preserved)
  summary_text TEXT, -- Human-readable summary
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  criteria JSONB -- e.g., {"type": "streak", "value": 7}
);

-- Kid badges (earned)
CREATE TABLE kid_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_id UUID REFERENCES kids(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kid_id, badge_id)
);

-- Simulation state (for demo "Next Day" functionality)
CREATE TABLE simulation_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current_date DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Indexes for Performance

```sql
CREATE INDEX idx_questions_lesson ON questions(lesson_id);
CREATE INDEX idx_questions_difficulty ON questions(lesson_id, difficulty);
CREATE INDEX idx_daily_tasks_kid_date ON daily_tasks(kid_id, task_date);
CREATE INDEX idx_task_attempts_task ON task_attempts(daily_task_id);
CREATE INDEX idx_attempt_answers_attempt ON attempt_answers(attempt_id);
CREATE INDEX idx_skill_progress_kid ON skill_progress(kid_id);
```

---

## Core Business Logic

### 1. Task Generation Engine

```typescript
// Pseudocode for daily task generation
async function generateDailyTasks(kidId: string, date: Date) {
  const disciplines = ['math', 'ela'];

  for (const discipline of disciplines) {
    // Get kid's most recent learned lesson
    const latestLesson = await getLatestLearnedLesson(kidId, discipline);

    // Get lesson from ~1 week ago
    const weekOldLesson = await getLessonLearnedAround(kidId, discipline, subDays(date, 7));

    // Get lesson from ~1 month ago
    const monthOldLesson = await getLessonLearnedAround(kidId, discipline, subDays(date, 30));

    // Create task record
    const task = await createDailyTask({
      kidId,
      disciplineId: getDisciplineId(discipline),
      taskDate: date,
      taskName: generateTaskName(latestLesson, discipline),
      lessonId: latestLesson.id
    });
  }
}
```

### 2. Question Selection for Attempt

```typescript
async function selectQuestionsForAttempt(taskId: string, kidId: string) {
  const task = await getTask(taskId);
  const kidProgress = await getKidProgress(kidId);

  // 5 from current lesson
  const currentQuestions = await getQuestionsFromLesson(
    task.lessonId,
    5,
    kidProgress.currentDifficulty
  );

  // 1 from week ago
  const weekQuestion = await getQuestionFromOlderLesson(
    kidId,
    task.disciplineId,
    7, // days ago
    1
  );

  // 1 from month ago
  const monthQuestion = await getQuestionFromOlderLesson(
    kidId,
    task.disciplineId,
    30, // days ago
    1
  );

  // Shuffle and return 7 questions
  return shuffle([...currentQuestions, weekQuestion, monthQuestion]);
}
```

### 3. Adaptive Difficulty Engine

```typescript
interface DifficultyState {
  current: 'easy' | 'medium' | 'hard';
  consecutiveCorrect: number;
  consecutiveWrong: number;
}

function updateDifficulty(state: DifficultyState, isCorrect: boolean): DifficultyState {
  if (isCorrect) {
    const consecutiveCorrect = state.consecutiveCorrect + 1;
    const consecutiveWrong = 0;

    // 2 consecutive correct → increase difficulty
    if (consecutiveCorrect >= 2 && state.current !== 'hard') {
      return {
        current: state.current === 'easy' ? 'medium' : 'hard',
        consecutiveCorrect: 0,
        consecutiveWrong: 0
      };
    }

    return { ...state, consecutiveCorrect, consecutiveWrong };
  } else {
    const consecutiveWrong = state.consecutiveWrong + 1;
    const consecutiveCorrect = 0;

    // 2 consecutive wrong → decrease difficulty
    if (consecutiveWrong >= 2 && state.current !== 'easy') {
      return {
        current: state.current === 'hard' ? 'medium' : 'easy',
        consecutiveCorrect: 0,
        consecutiveWrong: 0
      };
    }

    return { ...state, consecutiveCorrect, consecutiveWrong };
  }
}
```

### 4. Summary Generation Engine

```typescript
async function generateSessionSummary(taskId: string) {
  const task = await getTaskWithAttempts(taskId);
  const allAttempts = task.attempts;

  // Calculate totals
  const totalAttempts = allAttempts.length;
  const totalQuestions = totalAttempts * 7;
  const totalCorrect = allAttempts.reduce(
    (sum, att) => sum + att.answers.filter(a => a.isCorrect).length,
    0
  );
  const accuracy = (totalCorrect / totalQuestions) * 100;

  // CRITICAL: Preserve ALL failure statements from first attempt
  const firstAttemptFailures = allAttempts[0].answers
    .filter(a => !a.isCorrect)
    .map(a => a.question.failureStatement);

  // Collect successes from all attempts
  const allSuccesses = allAttempts.flatMap(att =>
    att.answers.filter(a => a.isCorrect).map(a => a.question.successStatement)
  );

  // Collect failures from subsequent attempts
  const subsequentFailures = allAttempts.slice(1).flatMap(att =>
    att.answers.filter(a => !a.isCorrect).map(a => a.question.failureStatement)
  );

  // Deduplicate
  const strengths = [...new Set(allSuccesses)];
  const needsImprovement = [...new Set([...firstAttemptFailures, ...subsequentFailures])];

  // Generate human-readable summary
  const summaryText = `The student completed the task in ${totalAttempts} attempt${totalAttempts > 1 ? 's' : ''} with ${accuracy.toFixed(0)}% accuracy.`;

  return {
    totalAttempts,
    totalQuestions,
    totalCorrect,
    accuracyPercent: accuracy,
    strengths,
    needsImprovement,
    summaryText
  };
}
```

### 5. Gamification Updates

```typescript
async function updateGamificationOnCompletion(kidId: string, taskId: string) {
  const gamification = await getKidGamification(kidId);
  const today = await getSimulationDate();

  // XP awarded once per task per day
  const xpEarned = 50; // Base XP for completion

  // Update streak
  const isConsecutiveDay = isYesterday(gamification.lastActiveDate, today);
  const newStreak = isConsecutiveDay ? gamification.streak + 1 : 1;

  // Check for badge unlocks
  if (newStreak === 7) {
    await awardBadge(kidId, 'streak_7');
  }

  // Calculate new level (100 XP per level)
  const newXp = gamification.xp + xpEarned;
  const newLevel = Math.floor(newXp / 100) + 1;

  await updateKidGamification(kidId, {
    xp: newXp,
    level: newLevel,
    streak: newStreak,
    tasksCompleted: gamification.tasksCompleted + 1,
    lastActiveDate: today
  });
}
```

---

## API Structure

### Supabase Edge Functions

```
/functions
  /auth
    - login.ts              # Email + name + grade login/signup
  /tasks
    - generate-daily.ts     # Generate daily tasks for a kid
    - get-today.ts          # Get today's tasks for kid
    - start-attempt.ts      # Start new attempt, get questions
    - submit-answer.ts      # Submit single answer
    - complete-attempt.ts   # Finalize attempt, check completion
  /summary
    - generate.ts           # Generate session summary
    - get-kid-summaries.ts  # Get summaries for parent view
  /gamification
    - get-stats.ts          # Get XP, level, streak, badges
    - update-on-complete.ts # Award XP, update streak
  /simulation
    - advance-day.ts        # Move to next day (demo mode)
    - get-current-date.ts   # Get simulated current date
  /tutor
    - get-student-brief.ts  # Pre-session summary
    - assign-tasks.ts       # Assign practice to student
```

### API Endpoints (REST-style)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login/signup with email + name + grade |
| GET | `/tasks/today/:kidId` | Get today's tasks |
| POST | `/tasks/:taskId/attempts` | Start new attempt |
| POST | `/attempts/:attemptId/answers` | Submit answer |
| POST | `/attempts/:attemptId/complete` | Complete attempt |
| GET | `/kids/:kidId/gamification` | Get gamification stats |
| GET | `/kids/:kidId/summaries` | Get all summaries |
| POST | `/simulation/advance` | Advance simulation day |
| GET | `/tutor/brief/:kidId` | Get tutor pre-session brief |

---

## Frontend Structure

```
/app
  /page.tsx                     # Landing → redirect to login
  /login/page.tsx               # Login/signup form

  /kid
    /page.tsx                   # Kid dashboard (today's tasks)
    /task/[taskId]/page.tsx     # Task attempt view
    /results/[taskId]/page.tsx  # Completion results

  /parent
    /page.tsx                   # Parent dashboard (code entry)
    /dashboard/page.tsx         # Progress overview
    /[kidId]/page.tsx           # Specific kid progress
    /notifications/page.tsx     # Notification settings

  /tutor
    /page.tsx                   # Tutor view
    /brief/[kidId]/page.tsx     # Pre-session brief
    /assign/[kidId]/page.tsx    # Assign tasks

/components
  /ui                           # shadcn components
  /kid                          # Kid-specific components
    - TaskCard.tsx
    - QuestionCard.tsx
    - ProgressBar.tsx
    - StreakDisplay.tsx
    - XPDisplay.tsx
  /parent                       # Parent-specific components
    - MasteryCard.tsx
    - TrendChart.tsx
    - ActivityTimeline.tsx
  /tutor                        # Tutor-specific components
    - FocusAreaCard.tsx
    - AssignmentForm.tsx

/lib
  /supabase
    - client.ts                 # Supabase client init
    - types.ts                  # Generated types
  /hooks
    - useTask.ts
    - useAttempt.ts
    - useGamification.ts
  /utils
    - difficulty.ts             # Adaptive difficulty logic
    - summary.ts                # Summary generation helpers
```

---

## Seed Data

### Disciplines
```json
[
  { "name": "math", "display_name": "Mathematics" },
  { "name": "ela", "display_name": "English Language Arts" }
]
```

### Grades
```json
[
  { "name": "G1", "display_name": "Grade 1", "sort_order": 1 },
  { "name": "G2", "display_name": "Grade 2", "sort_order": 2 },
  { "name": "G3", "display_name": "Grade 3", "sort_order": 3 }
]
```

### Sample Skills (Grade 3 Math)
```json
[
  { "name": "addition_subtraction", "description": "Addition and subtraction within 1000" },
  { "name": "multiplication_basics", "description": "Multiplication facts 0-5" },
  { "name": "fractions_intro", "description": "Introduction to fractions" },
  { "name": "word_problems", "description": "Multi-step word problems" }
]
```

### Sample Questions (Grade 3 Math - Multiplication)
```json
[
  {
    "question_text": "What is 5 x 8?",
    "difficulty": "medium",
    "correct_answer": "40",
    "wrong_answer_1": "35",
    "wrong_answer_2": "45",
    "wrong_answer_3": "48",
    "success_statement": "Demonstrates understanding of multiplication facts for 5s",
    "failure_statement": "Needs more practice with multiplication facts for 5s"
  },
  {
    "question_text": "What is 3 x 7?",
    "difficulty": "medium",
    "correct_answer": "21",
    "wrong_answer_1": "18",
    "wrong_answer_2": "24",
    "wrong_answer_3": "27",
    "success_statement": "Can multiply single digits accurately",
    "failure_statement": "Struggles with multiplication of 3s and 7s"
  },
  {
    "question_text": "If you have 4 groups of 6 stickers, how many stickers do you have?",
    "difficulty": "hard",
    "correct_answer": "24",
    "wrong_answer_1": "10",
    "wrong_answer_2": "20",
    "wrong_answer_3": "26",
    "success_statement": "Applies multiplication to real-world scenarios",
    "failure_statement": "Needs help connecting multiplication to word problems"
  }
]
```

### Sample Questions (Grade 3 ELA - Grammar)
```json
[
  {
    "question_text": "Which word is a verb? 'The cat sleeps quietly.'",
    "difficulty": "easy",
    "correct_answer": "sleeps",
    "wrong_answer_1": "cat",
    "wrong_answer_2": "quietly",
    "wrong_answer_3": "The",
    "success_statement": "Can identify verbs in simple sentences",
    "failure_statement": "Needs practice distinguishing verbs from other parts of speech"
  },
  {
    "question_text": "What punctuation should end this sentence? 'Where is the library'",
    "difficulty": "easy",
    "correct_answer": "Question mark (?)",
    "wrong_answer_1": "Period (.)",
    "wrong_answer_2": "Exclamation mark (!)",
    "wrong_answer_3": "Comma (,)",
    "success_statement": "Understands question sentences need question marks",
    "failure_statement": "Needs practice with question punctuation"
  }
]
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
**Goal:** Core loop working end-to-end

1. [ ] Set up Next.js + Supabase project
2. [ ] Create database schema in Supabase
3. [ ] Implement login flow (email + name + grade)
4. [ ] Build task display UI
5. [ ] Implement question selection
6. [ ] Build attempt flow (7 questions)
7. [ ] Implement completion check (≥5 correct)
8. [ ] Add retry functionality
9. [ ] Seed initial data (Grade 3 Math + ELA)

### Phase 2: Core Logic (Week 3-4)
**Goal:** Adaptive difficulty + summaries working

10. [ ] Implement adaptive difficulty engine
11. [ ] Build attempt history (never overwrite)
12. [ ] Create summary generation engine
13. [ ] Build parent dashboard (read-only)
14. [ ] Implement gamification (XP, levels, streaks)
15. [ ] Add badge system

### Phase 3: Polish (Week 5-6)
**Goal:** Full prototype functional

16. [ ] Parent 4-digit code access
17. [ ] Tutor view (brief + assignment)
18. [ ] "Next Day" simulation button
19. [ ] Add more seed content
20. [ ] Mobile responsive design
21. [ ] Testing and bug fixes

---

## Rules

### Code Style
- TypeScript strict mode enabled
- Use `const` by default, `let` only when reassignment needed
- Async/await over .then() chains
- Named exports preferred
- Components: PascalCase
- Functions/variables: camelCase
- Files: kebab-case or lowercase

### Naming Conventions
- Tables: snake_case
- Columns: snake_case
- React components: PascalCase
- Hooks: useXxx pattern
- Types/Interfaces: PascalCase

### Git Workflow
- Main branch protected
- Feature branches: `feature/description`
- Conventional commits: `feat:`, `fix:`, `chore:`
- PR required for merge

### Critical Rules
1. **NEVER overwrite attempt history** — each retry is new record
2. **ALWAYS preserve first-attempt failures** in summaries
3. **Questions MUST have success/failure statements** — no exceptions
4. **Exactly 7 questions per attempt** — no more, no less
5. **≥5 correct = completion** — this is the only success criteria
6. **XP once per task per day** — not per attempt

---

## Quick Commands

```bash
# Development
pnpm dev

# Database
pnpm supabase:start      # Local Supabase
pnpm supabase:generate   # Generate types
pnpm supabase:push       # Push migrations

# Testing
pnpm test
pnpm test:e2e

# Build
pnpm build

# Linting
pnpm lint
pnpm format
```

---

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key (server only)
```

---

## Existing Prototype Reference

The `/web clone` folder contains a static HTML/CSS/JS prototype showing:
- Login flow
- Kid dashboard with Math/ELA switching
- 7-question challenge flow
- Parent dashboard with mastery visualization
- Tutor view with pre-session brief
- Notification settings

Reference this for UI patterns and styling direction. The production app should recreate these views with real data and Next.js/Supabase backend.

---

## Notes

- **COPPA Compliance:** All external notifications go to parents only
- **Mobile-first:** Kids primarily use tablets, design accordingly
- **Session tolerance by age:** 5-7 years (5-10 min), 8-10 years (10-15 min), 11-14 years (15-20 min)
- **Gamification research:** See `/gamification-mechanics-analysis.md` for Duolingo, Prodigy, Khan mechanics
- **Market context:** See `/GTM-SELF-LEARNING-PLATFORM.md` for full strategy

---

*Last updated: March 2026*
