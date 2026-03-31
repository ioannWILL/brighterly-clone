# Brighterly Self-Learning Platform: Go-To-Market Document

*Version: 1.0* *Created: March 2026* *Status: Draft for Stakeholder Review*

## Executive Summary

Brighterly is transforming from a tutoring product into a learning platform. This GTM document outlines the strategy to launch a **self-learning platform** that complements 1:1 tutoring sessions, targeting **30%+ adoption among active users** within 6 months.

### The Opportunity

Adding self-learning should **increase product value and reduce churn**. It could also attract new customers looking for a self-learning product.

The pitch: kids **practice daily** between tutoring sessions while parents and tutors get **dashboards showing progress**. Better learning outcomes (kids) plus higher satisfaction (parents) = the two things that actually keep subscribers.

This grows without adding tutors. AI can generate content at low cost, which means we can scale practice materials without scaling headcount.

### Key Success Metrics

| Metric | Target | Timeline |
| :---- | :---- | :---- |
| Self-learning feature adoption | 30%+ of active users | 6 months |
| Weekly mini-lesson completion | 50%+ of adopters | 3 months |
| Monthly churn reduction | -2-3 percentage points | 6 months |

These are targets, not guarantees. The prototype will tell us if we're close.

## 1. Strategic Context

### Business Goal

Move from a **tutoring product** to a **platform** that creates value outside live tutor-led sessions.

**From test case:**

"Our goal for 2026 is to release platform features that move the educational value out of the lesson to the platform itself, mostly by the means of AI tools and self-learning experiences."

### Constraints

| Constraint | Implication |
| :---- | :---- |
| Tutoring remains core | New features must **complement**, not replace sessions |
| Self-learning standalone value | Must work for users who may not have tutors yet |
| Scale without proportional growth | Product-driven, not supply-driven |
| COPPA compliance | All external communications to parents only |
| Lean/quick releases | MVP-first, no over-engineering |

Translation: we're adding something new without breaking what works.

### The Problem We're Solving

**For parents:**

- Limited visibility into child's progress between sessions
- No easy way for kids to practice between sessions
- Difficulty seeing ROI of $150-200/month subscription
- Child loses momentum during 4-7 day gaps between tutoring

**For the business:**

- ASSUMPTION: High churn (estimated 8-12% monthly) driven by perceived value gaps
- 90% of value locked in 1:1 sessions = hard to scale
- No touchpoints between weekly sessions

The market is big. Here's what matters for us.

## 2. Market Opportunity

### Total Addressable Market

| Definition | TAM | Source |
| :---- | :---- | :---- |
| Online tutoring + supplemental learning | $4-8B | GlobeNewswire |
| K-12 digital instruction & assessment | ~$17B | HolonIQ |
| Full K-12 EdTech market | ~$95B | Dimension Market Research |

**Growth rate:** 15-23% CAGR

### Device Landscape by Age

| Age Group | Primary Device | Product Implication |
| :---- | :---- | :---- |
| 5-8 years | Tablet (58% ownership) | Touch-first, large tap targets, audio guidance |
| 8-12 years | Tablet/Chromebook | Responsive web, moderate text |
| 13-14 years | Smartphone (95%) + laptop | Cross-device, mobile for reminders |

Brighterly existing web application meets demands of kids of all ages with additional non-functional requirements for portability on devices with small screens (mobile phones).

### Key Market Insight

"Parents buy outcomes. Kids stay for fun. Winners deliver both."

The winning formula in K-9 EdTech:

1. **Gamification** that keeps kids coming back daily
2. **Visible progress** that parents can track
3. **Adaptive learning** that personalizes difficulty
4. **Short sessions** (5-15 minutes) that fit busy schedules

## 3. Competitive Landscape (not full list of competitors)

### Direct Competitors (Tutoring + Tech)

| Competitor | Model | Price | Key Differentiator |
| :---- | :---- | :---- | :---- |
| **CosmoAI** | AI + human tutors | ~$36-54/lesson | Dedicated Learning Partner per family |
| **Preply** | Tutor marketplace | $3-40/hr | Massive tutor selection (100K+) |

### Indirect Competitors (Self-Paced Learning)

| Competitor | Model | Price | Scale |
| :---- | :---- | :---- | :---- |
| **Khan Academy** | Free self-paced | Free | 190M+ users |
| **IXL** | Drill-based practice | $10-20/mo | 18M+ students |
| **SplashLearn** | Game-based learning | $8-12/mo | 50M+ users |
| **Prodigy** | RPG math game | Free/Premium | 100M+ users |
| **Duolingo Math** | Gamified math | Free | Part of 500M+ platform |

### Brighterly's Positioning

Most competitors offer either high human interaction (1-to-1 sessions, CosmoAI) or ways to keep kids coming back (IXL, SplashLearn, Prodigy) — but none combine both. That's the gap we're trying to fill.

### Competitive Differentiation

| Opportunity | Why Unique |
| :---- | :---- |
| **Tutor-assigned practice** | No competitor combines live tutoring + personalized self-paced practice |
| **Session prep tracking** | Direct connection between practice and tutoring outcomes |
| **Tutor + AI hybrid** | Human relationship + practice that grows without adding tutors |

## 4. Target Users

### Primary Segments

#### Segment 1: Current Subscribers (Retention Focus)

| Attribute | Details |
| :---- | :---- |
| **Who** | Families already paying $150-200/mo |
| **Pain point** | Want more value between sessions |
| **Goal** | Reduce churn, increase daily usage |
| **Approach** | Bundle self-learning at no extra cost |

#### Segment 2: New Acquisition (Growth Focus)

| Attribute | Details |
| :---- | :---- |
| **Who** | Parents seeking affordable math/English help |
| **Pain point** | Can't afford 1:1 tutoring, need practice tools |
| **Goal** | New revenue stream, funnel to tutoring |
| **Approach** | Standalone self-learning product |

### User Personas

#### Parent: "Outcome-Oriented Mom"

- **Age:** 35-45
- **Child:** Elementary/middle school (grades 2-7)
- **Motivation:** Improve child's school performance
- **Pain:** "I'm paying $175/month but I can't tell if it's working"
- **Wants:** Visible progress, dashboards, proof of ROI

**Already addressed in prototype:**
- "Conversation starters" give parents specific talking points based on their child's current learning
- Multi-child support means one parent account manages all kids
- Notification preferences let parents choose their preferred channel (Email, SMS, WhatsApp)

#### Child: "Reluctant Learner"

- **Age:** 7-12
- **Motivation:** Fun, rewards, avoiding boredom
- **Pain:** "Practice is boring, I'd rather play games"
- **Wants:** Games, characters, badges, streaks

### Engagement Patterns by Age

| Age Group | Session Tolerance | Engagement Drivers |
| :---- | :---- | :---- |
| 5-7 years | 5-10 min max | Visual rewards, characters, audio praise |
| 8-10 years | 10-15 min | Collecting, streaks, simple games |
| 11-14 years | 15-20 min | Progress tracking, challenges, mastery |

Proposed solution: target existing active users 8-10 years old (grades 3-5) because product should be launched with low-cost content development. Younger kids require more art and animation combined with sounds. Older groups require more complex gamification to keep them coming back.

What we're actually building.

## 5. Product Strategy

### Core Features (MVP)

#### 5.1 Mini-Lessons

Short, focused practice activities between tutoring sessions. Kids practice at their own pace. Gamification keeps them coming back.

| Attribute | Specification |
| :---- | :---- |
| **Duration** | 5-15 minutes per session |
| **Content** | Math + English (aligned with tutor curriculum) |
| **Format** | Interactive exercises, not passive video |
| **Scheduling** | Daily practice recommendations |

#### 5.2 Adaptive Practice

Why this matters: if every question is too easy or too hard, kids quit.

**Tier 1: Hardcoded algorithm (MVP)**
Linear algorithm to increase difficulty based on user's performance.

| Feature | Implementation |
| :---- | :---- |
| **Tutor-defined level** | Tutor sets initial level of tasks for existing users |
| **Adaptation** | Real-time difficulty adjustment based on performance without AI tools (2 correct answers in a row increases difficulty of the next question, 2 incorrect answers in a row decreases difficulty of the next question)  |
| **Spaced repetition** | Review previously learned concepts - include 2 questions from 2 preceding topics. |
| **"Just right" challenge** | Keep learners in optimal difficulty zone |

**Tier 2: ML-powered difficulty adjustment.**

| Feature | Implementation |
| :---- | :---- |
| **Diagnostic** | Quick assessment on first use to define the level of complexity personalized for user |
| **Adaptation** | Real-time difficulty adjustment based on performance with tutor in the loop approving tasks before assignment |
| **Spaced repetition** | Review previously learned concepts by applying SM-2 (Super Memory -2) or similar algorithms. |
| **"Just right" challenge** | Individually adjust difficulty zone and provide feedback to parents and tutors |

#### 5.3 Gamification System

Designed to keep kids practicing daily without distracting from learning.

**Tier 1: Must-Have (MVP)**

| Mechanic | Implementation | Source Inspiration |
| :---- | :---- | :---- |
| **Daily Streaks** | Track consecutive days of practice | Duolingo |
| **Points/XP** | Award points for mini-lesson completion | Khan Academy |
| **Progress Badges** | Recognize skill mastery milestones | Khan Academy |

**Tier 2: Phase 2**

| Mechanic | Implementation | Source Inspiration |
| :---- | :---- | :---- |
| **Collection System** | Unlock characters/pets through practice | Prodigy |
| **Virtual Currency** | Coins to spend on customization | SplashLearn |
| **Daily Challenges** | One special activity per day | Brilliant |

#### 5.4 Session Preparation

Connect self-learning to tutoring sessions.

| Feature | Details |
| :---- | :---- |
| **Tutor Assignments** | Tutors assign specific practice after sessions. MVP - selected from predefined list, next phase - generated with AI and approved by tutor |
| **Prep Completion Tracking** | Tutors see completion status and receive suggestions of the concepts that should be revised or reexplained |
| **Session Review** | Tutor reviews practice results before the start of the session |
| **Help Between Tutoring Sessions** | Kids can ask tutors for help from specific task that will be reviewed by tutors before session. |

#### 5.5 Parent Dashboard

Give parents visibility into progress.

| Component | Details |
| :---- | :---- |
| **Weekly Summary** | Lessons completed, time spent, skills practiced |
| **Streak Tracking** | Visualize consistency |
| **Skill Mastery** | Progress bars for each topic area |
| **Lessons Highlights** | Insights from self-completed tasks |
| **Speech Warm-ups** | Ideas to talk to kid to reinforce learning |

### Content Strategy

#### Phase 1: MVP Content

| Approach | Details |
| :---- | :---- |
| **Source** | Repurpose existing tutor materials |
| **Scope** | Core math + English for grades 1-6 |
| **Volume** | 50-100 mini-lessons per subject |
| **Format** | Interactive exercises, not worksheets |

#### Phase 2: Expansion

| Approach | Details |
| :---- | :---- |
| **AI Generation** | Use LLMs to generate practice variants |
| **Subject Expansion** | Add science, additional grade levels |
| **Personalization** | AI-selected content based on tutor input |

### What's Already Built

The working prototype (https://brighterly-app.vercel.app/) demonstrates these concepts with real, functional features:

| Category | What's Working |
| :---- | :---- |
| **Content** | 3,668 questions across 160 themed lessons for Grade 3 Math & ELA (CCSS-aligned) |
| **Adaptive Difficulty** | Real-time adjustment: 2 correct → harder, 2 wrong → easier |
| **Gamification** | XP with progressive leveling, 9 badge types with celebration animations, 7-day streak tracking |
| **Parent Dashboard** | Learning insights, conversation starters, multi-channel notification preferences |
| **Tutor View** | Student performance overview and question library |
| **Accessibility** | Dark mode across all portals |
| **Multi-Child** | Support for families with multiple students |
| **Responsive** | Mobile-tested across devices |

**Built in ~5 hours for ~$15 in AI tokens.** This demonstrates the lean approach we'll use for expansion.

See `PROTOTYPE-CAPABILITIES.md` for detailed feature inventory and demo walkthrough.

## 6. Notification Strategy

### Enrich existing notification events with summarized information about kid's progress on self-learning platform. Do not overwhelm parents with too many notifications. Provide controls for parents to opt in and opt out from notifications according to their choice.

Consider sending browser notification to parents as CTA to encourage their kids to open self-learning platform between tutoring sessions.

### COPPA Compliance

All external notifications go to parents only:

- Push opt-in during parent onboarding
- Content references child's progress, but parent is recipient
- No direct communications to children outside platform
- In-platform engagement only for kids

### Already Implemented in Prototype

- Parent notification preference matrix (channel × event type)
- "Conversation starters" as a low-pressure engagement channel
- Parent PIN gate preventing children from accessing analytics

## 7. Monetization Strategy

### Phased Approach

| Phase | Model | Rationale |
| :---- | :---- | :---- |
| **Phase 1 (Months 1-3)** | **Bundled** with subscription | Retention focus - reduce churn by adding value |
| **Phase 2 (Months 4-6)** | **Tiered** - basic bundled, premium upsell | Monetize power users |
| **Phase 3 (Month 6+)** | **Standalone** option | New acquisition revenue |

### Pricing Strategy

| Scenario | Price Point | Basis |
| :---- | :---- | :---- |
| Bundled (Phase 1) | $0 incremental | Retention value > direct revenue |
| Premium upsell (Phase 2) | +$20-30/month | Based on IXL, SplashLearn pricing |
| Standalone (Phase 3) | $30-50/month | Competitive with market |

### Revenue Model Validation

**Bundled approach rationale:**

- Current churn assumed at 8-12%/month
- At $175 ARPU, reducing churn by 2% = significant LTV increase
- Self-learning as retention lever first, revenue second

**Standalone potential:**

- TAM for self-paced: $4-8B
- Brighterly differentiation: tutoring pipeline + tutor-assigned content
- Price positioning below premium (Synthesis $125/mo) but above commodity (IXL $10-20/mo)

How we'll know if it's working.

## 8. Success Metrics

### Primary Metrics

| Metric | Target | Timeline | Measurement |
| :---- | :---- | :---- | :---- |
| **Adoption Rate** | 30%+ of active users | 6 months | % of subscribers using self-learning weekly |
| **Weekly Completion** | 50%+ of adopters | 3 months | % of adopters completing 3+ mini-lessons/week |
| **Churn Impact** | -2-3% monthly churn | 6 months | Compare adopters vs non-adopters |

### Leading Indicators

| Indicator | Target | Why It Matters |
| :---- | :---- | :---- |
| Push notification opt-in | 10-15% of parents | Enables daily practice |
| Day 7 return rate | 30%+ | Habit formation signal |
| Streak maintenance (7+ days) | 20%+ of adopters | Usage depth |
| Parent dashboard visits | 2x/week | Parent usage |

If we're not hitting these after 8 weeks, we pivot or stop.

### Measurement Infrastructure - **GUESSING** what you can use

| Tool | Purpose |
| :---- | :---- |
| Product analytics | Feature usage, funnels, retention |
| Push notification service  | Opt-in rates, CTR, engagement |
| Email metrics (including AMP (Accelerated Mobile Pages) in emails) | Open rates, click-through |
| A/B testing framework | Feature experiments |
| Cohort analysis | Adopter vs non-adopter comparison |

The plan — and the hypothesis we're testing first.

## 9. Implementation Roadmap

Brighterly currently does not offer a standalone mobile application for children. As a result, daily engagement with the self-learning platform depends primarily on two channels:

* **Tutors** – who can introduce the platform at the end of a session, though the likelihood of a child returning independently the next day is low

* **Parents** – who interact with children daily and are the most realistic channel for driving repeated usage outside tutoring sessions

While parent-facing notifications through SMS, WhatsApp, or email may increase awareness, they do not guarantee that children will start using Brighterly daily. Consistent usage is more likely only after children experience clear value and sufficient motivation through the product experience, including gamification.

Before any implementation we need to test the main hypothesis:

**"Brighterly can attract children to the self-learning platform through parent and tutor-driven engagement."**

The initial test is not whether children will build a long-term habit immediately, but whether parents and tutors can successfully bring them to the platform and generate first-use and early repeat usage.

For such purpose a fully functional interactive prototype is created - **https://brighterly-app.vercel.app/**

### This prototype simulates the core user experience of the proposed product while intentionally limiting complexity:

* Content and engagement logic are hardcoded

* AI-driven capabilities are not yet implemented

* The purpose is to validate user activation and early engagement behavior, not the final intelligence layer of the solution

**The prototype isn't a wireframe — it's a working product with:**

* Production-ready database schema (18 tables with proper indexing and foreign keys)
* Real authentication and session management
* COPPA-compliant architecture throughout (parent PIN gate, parent-only notifications)
* Adaptive difficulty algorithm running in real-time
* Full gamification system (XP, levels, badges, streaks)

### For testing purposes Final Grade 3 Curriculum was implemented:

  - 10 domains (5 Math, 5 ELA)

  - 82 skills with CCSS alignment (Common Core State Standards, https://corestandards.org/)

  - 160 themed lessons

  - 3,668 questions across difficulty levels (easy, medium, hard)

### Resources spent: 5 hours, 15 Mb of storage, 15 USD in tokens (Anthropic AI)

How prototype works:

1. Prototype tracks kid's progress across skills tree in Math and ELA. Each and parents can review it
2. Each lesson dynamically changes difficulty of questions based on kid's performance
3. Kid's performance generates statements for report that is displayed to parents and tutors
4. Kid's get basic gamification features: badges, XP and levels, daily streak.

The immediate objective is to release the prototype to active users and measure whether parent and tutor involvement can successfully drive children to the platform.

Key signals to evaluate include:

* first-time platform opens

* lesson starts

* repeat visits in the first days after introduction

* differences in activation between tutor-led and parent-led entry points

Success will support the broader goal of reaching **30%+ adoption among active users within 6 months**.

### Phase 1: Foundation (Months 1-2)

**Goal:** Launch MVP to 20% of active users (beta)

| Week | Deliverable | Dependencies |
| :---- | :---- | :---- |
| 1-2 | Mini-lesson content (50 lessons per subject) | Content team |
| 2-3 | Basic gamification (streaks, XP, badges) | Engineering |
| 2-3 | Parent dashboard (read-only) | Engineering |
| 3-4 | Push notification infrastructure (OneSignal) | Engineering |
| 4 | Beta launch to 20% of users | QA |

**Success criteria for Phase 1:**

- [ ] 15%+ of beta users complete 1+ mini-lesson
- [ ] Push opt-in rate > 10%
- [ ] No critical bugs

### Phase 2: Iterate & Scale (Months 3-4)

**Goal:** Expand to 100% of users, add tutor integration

| Week | Deliverable | Dependencies |
| :---- | :---- | :---- |
| 1-2 | Tutor assignment feature | Engineering |
| 2-3 | Session prep tracking | Engineering |
| 3-4 | Collection system (characters/pets) | Design + Engineering |
| 4 | Full rollout to all users | QA |

**Success criteria for Phase 2:**

- [ ] 25%+ weekly adoption
- [ ] 30%+ session prep completion
- [ ] Positive tutor feedback

### Phase 3: Optimize & Monetize (Months 5-6)

**Goal:** Hit 30% adoption, launch premium tier

| Week | Deliverable | Dependencies |
| :---- | :---- | :---- |
| 1-2 | Adaptive difficulty (ML-based) | Engineering |
| 2-3 | Premium content tier | Product + Content |
| 3-4 | Standalone product page | Marketing |
| 4 | Premium tier launch | Product |

**Success criteria for Phase 3:**

- [ ] 30%+ adoption achieved
- [ ] Measurable churn reduction in adopter cohort
- [ ] Premium upsell conversion > 5%

What could go wrong.

### Stop/Pivot Criteria

| Signal | Threshold | Action |
| :---- | :---- | :---- |
| Beta adoption | <10% after 4 weeks | Investigate, iterate on onboarding |
| Weekly completion | <20% of adopters | Simplify content, increase gamification |
| Churn impact | No difference vs control | Re-evaluate what we're offering |
| Tutor resistance | >30% negative feedback | Simplify tutor workflow |

## 10. Risks & Mitigations

### High Impact Risks

| Risk | Likelihood | Impact | Mitigation |
| :---- | :---- | :---- | :---- |
| **Low adoption** | Medium | High | Start with engaged users; iterate on onboarding |
| **Cannibalization of tutoring** | Low | High | Position as complement; track session attendance |
| **COPPA violation** | Low | Very High | Follow NFRs strictly; parent-only notifications |
| **Content quality issues** | Medium | Medium | Start with proven content; gather feedback fast |

### Medium Impact Risks

| Risk | Likelihood | Impact | Mitigation |
| :---- | :---- | :---- | :---- |
| Over-engineering | Medium | Medium | MVP scope lock; time-box phases |
| Tutor workflow friction | Medium | Medium | Co-design with tutors; simple UI |
| Push notification fatigue | Medium | Low | Strict frequency limits; A/B test |

### COPPA Compliance Checklist

- [ ] All external notifications to parents only
- [ ] No behavioral profiling without parental consent
- [ ] No performance-based pressure messaging
- [ ] No commercial messaging without consent
- [ ] Parental consent management implemented
- [ ] Parent dashboard with opt-out mechanism

---

## 11. Dependencies & Open Questions

### Technical Dependencies

| Dependency | Owner | Status |
| :---- | :---- | :---- |
| Push notification service integration | Engineering | Not started |
| Content management system | Engineering | To be assessed |
| Adaptive learning engine | Engineering | Not started |
| Parent dashboard | Engineering | Not started |

### Content Dependencies

| Dependency | Owner | Status |
| :---- | :---- | :---- |
| Initial mini-lesson content (100 lessons) | Content team | Not started |
| Gamification assets (badges, characters) | Design | Not started |
| Email template redesign | Marketing | Not started |

### Open Questions (To Validate)

| Question | Impact | How to Answer |
| :---- | :---- | :---- |
| What is actual monthly churn rate? | Sets retention impact baseline | Pull from data |
| What content already exists to repurpose? | Determines MVP scope | Content audit |
| What is dev team capacity? | Affects roadmap realism | Team capacity review |
| Do tutors support this direction? | Risk of workflow friction | Tutor interviews |
| Is self-learning bundled or upsold? | Revenue model decision | Stakeholder decision |

---

## 12. Appendix

### A. Working Assumptions

All assumptions documented in `gtm-working-assumptions.md`. Key assumptions:

| Assumption | Value | Validation Needed |
| :---- | :---- | :---- |
| Monthly churn | 8-12% | Pull actual data |
| ARPU | ~$175/month | Confirm |
| Active families | 500-2,000 | Confirm |
| Session frequency | 1-2x/week | Confirm |
| Dev capacity | 2-4 engineers | Confirm |

### B. Reference Documents

| Document | Purpose |
| :---- | :---- |
| `PROTOTYPE-CAPABILITIES.md` | Working prototype feature inventory and demo guide |
| `competitor-analysis-kids-learning-platforms.md` | 12+ competitors analyzed |
| `online_learning_kids_usa_research.md` | TAM, device usage, best practices |
| `gamification-mechanics-analysis.md` | Detailed mechanics from leading platforms |
| `NOTIFICATION-STRATEGY.md` | Channel strategy and implementation |
| `coppa_notifications_nfr.md` | COPPA compliance requirements |
| `brighterly_test_case.md` | Original project brief |
| `gtm-working-assumptions.md` | All assumptions with validation checklist |

### C. Competitive Pricing Reference

| Platform | Model | Price | Best For |
| :---- | :---- | :---- | :---- |
| Khan Academy | Free | $0 | Budget-conscious |
| Prodigy | Freemium | Free/$8-15 | Game-lovers |
| SplashLearn | Subscription | $8-12/mo | Elementary |
| IXL | Subscription | $10-20/mo | Drill practice |
| Synthesis | Premium | $125/mo | Critical thinking |

### D. Gamification Mechanics Summary

**Recommended for Brighterly:**

| Tier | Mechanics | Source |
| :---- | :---- | :---- |
| Must-Have | Streaks, XP, Badges, Parent Dashboard | Duolingo, Khan, ClassDojo |
| High-Value | Collections, Virtual Currency, Daily Challenges | Prodigy, SplashLearn, Brilliant |
| Nice-to-Have | Leaderboards, Quests, Avatar Customization | Duolingo, Prodigy |

**Avoid:**

- IXL's punitive scoring (frustrates learners)
- Over-gamification that distracts from learning
- Complex RPG mechanics (resource-intensive)

## Document Control

| Version | Date | Author | Changes |
| :---- | :---- | :---- | :---- |
| 1.0 | March 2026 | Ivan Vilchavskyi | Initial GTM document |
