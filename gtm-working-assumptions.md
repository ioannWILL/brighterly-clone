# GTM Working Assumptions

*Created: March 2026*
*Status: Assumptions to be validated with internal data*

---

## Purpose

These assumptions fill knowledge gaps needed to create the GTM document for Brighterly's self-learning platform. They are based on market research, competitor analysis, and industry benchmarks.

**Validation needed:** Replace these with actual Brighterly data when available.

---

## 1. Internal Metrics (Assumed)

| Metric | Assumption | Basis | Validation Priority |
|--------|------------|-------|---------------------|
| Monthly churn | 8-12% | Industry average for tutoring platforms | High |
| Session frequency | 1-2x/week | Standard tutoring cadence | Medium |
| Session prep completion | <20% | No current system in place | High |
| ARPU | ~$175/month | From test case ($150-200 range) | Medium |
| Active families | 500-2,000 | Mid-market tutoring platform | High |
| LTV | ~$1,400 | 8 months avg tenure at $175 ARPU | Medium |
| CAC | Unknown | Need data | High |

---

## 2. User Behavior Assumptions

### Parent Pain Points (Assumed)

| Pain Point | Evidence Basis |
|------------|---------------|
| Limited visibility into child's progress | Common in tutoring (no between-session tracking) |
| No easy practice between sessions | 90% of value from live lessons |
| Difficulty seeing ROI | Sessions happen, but measurable improvement unclear |
| Scheduling friction | 1:1 tutoring requires coordination |
| Child loses momentum between sessions | 4-7 day gaps between tutoring |

### Churn Reasons (Assumed)

| Reason | Estimated % | Industry Basis |
|--------|-------------|----------------|
| Cost / perceived value | 35-40% | Price sensitivity in K-12 |
| Lack of visible progress | 25-30% | Outcome-focused parents |
| Child disengagement | 15-20% | Motivation issues |
| Schedule conflicts | 10-15% | Logistics |
| Other (moving, etc.) | 5-10% | Life events |

### Parent Value Drivers (Assumed)

| What Parents Value | Priority |
|--------------------|----------|
| Visible improvement in school grades | #1 |
| Child's confidence in subject | #2 |
| Engagement / child actually enjoys it | #3 |
| Flexibility of schedule | #4 |
| Value for money | #5 |

### Child Engagement Patterns (Assumed)

| Age Group | Engagement Drivers | Session Tolerance |
|-----------|-------------------|-------------------|
| 5-7 years | Visual rewards, characters, audio praise | 5-10 min max |
| 8-10 years | Collecting, streaks, simple games | 10-15 min |
| 11-14 years | Progress tracking, challenges, mastery | 15-20 min |

---

## 3. Product/Tech Assumptions

| Aspect | Assumption | Confidence |
|--------|------------|------------|
| Tech stack | Modern web (React/Next.js or similar) | Medium |
| Mobile experience | Responsive web, no native app | High (from brief) |
| Push notification capability | Not implemented yet | High |
| Email infrastructure | Exists (heavily used) | High |
| SMS/WhatsApp | Active for lesson reminders | High |
| Content library | Limited - mostly tutor-delivered materials | Medium |
| Adaptive learning engine | Not implemented | High |
| Parent dashboard | Basic or non-existent | Medium |
| Gamification system | Not implemented | High |

---

## 4. Resource Constraints (Assumed)

| Resource | Assumption | Impact on Roadmap |
|----------|------------|-------------------|
| Engineering team | 2-4 developers | Limits feature velocity |
| Content production | Limited internal capability | Start with existing/purchased content |
| Design capacity | 1 designer (shared) | Simple MVP first |
| QA | Manual / developer-owned | Focus on critical paths |
| Marketing budget | Limited | Organic + existing user base first |
| Timeline pressure | 3-6 months to MVP | Phased approach required |

---

## 5. Monetization Assumptions

### Recommended Approach

| Phase | Model | Rationale |
|-------|-------|-----------|
| Phase 1 (Months 1-3) | **Bundled** with existing subscription | Retention focus - reduce churn by adding value |
| Phase 2 (Months 4-6) | **Tiered** - basic bundled, premium upsell | Monetize power users |
| Phase 3 (Month 6+) | **Standalone** option for acquisition | New revenue stream |

### Pricing Assumptions

| Scenario | Price Point | Basis |
|----------|-------------|-------|
| Bundled (no extra cost) | $0 incremental | Retention value > direct revenue |
| Premium upsell | +$20-30/month | Based on competitor pricing (IXL, SplashLearn) |
| Standalone (no tutoring) | $30-50/month | Competitive with SplashLearn, IXL |

### Willingness to Pay (Assumed)

| Segment | WTP for Self-Learning | Evidence |
|---------|----------------------|----------|
| Current subscribers (engaged) | High - want more value | Already paying $150-200 |
| Current subscribers (at-risk) | Medium - need to see value first | Considering churn |
| New acquisition | Medium - need to prove vs free alternatives | Khan Academy is free |

---

## 6. Market Assumptions

| Assumption | Value | Source |
|------------|-------|--------|
| US online tutoring TAM | $4-8B | GlobeNewswire |
| K-12 digital instruction TAM | ~$17B US | HolonIQ |
| Annual market growth | 15-23% CAGR | Multiple sources |
| Tablet ownership (ages 5-8) | 58% | Common Sense Media |
| Smartphone access (teens) | 95% | Pew Research |

---

## 7. Competitive Positioning Assumptions

### Where Brighterly Sits

| Dimension | Brighterly Position | Competitors |
|-----------|---------------------|-------------|
| Human tutoring | Core strength | CosmoAI, Preply |
| Self-paced learning | Gap to fill | IXL, SplashLearn, Khan |
| Gamification | Not implemented | Prodigy, Duolingo Math |
| Price point | Premium ($150-200) | Higher than self-paced alternatives |
| Age focus | 5-14 (grades 1-9) | Broad range like IXL |

### Differentiation Opportunity

| Opportunity | Why Unique |
|-------------|-----------|
| Tutor-assigned practice | No competitor combines live tutoring + self-paced |
| Session prep tracking | Direct connection to tutoring outcomes |
| Tutor + AI hybrid | Human relationship + scalable practice |

---

## 8. Success Metrics Assumptions

### Target Metrics (from Test Case)

| Metric | Target | Baseline (Assumed) |
|--------|--------|-------------------|
| Self-learning adoption | 30%+ of active users | 0% (new feature) |
| Weekly mini-lesson completion | 50%+ of adopters | 0% |
| Session prep completion | 40%+ | <20% |
| Churn reduction | -2-3% monthly | 8-12% |

### Leading Indicators

| Indicator | Target | Why It Matters |
|-----------|--------|---------------|
| Push notification opt-in | 10-15% of parents | Enables engagement |
| Day 7 return rate | 30%+ | Habit formation |
| Weekly active users (self-learning) | Growing | Feature stickiness |

---

## 9. Risk Assumptions

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Low adoption | Medium | High | Start with engaged users, not all |
| Cannibalization of tutoring | Low | High | Position as complement, not replacement |
| Content quality issues | Medium | Medium | Start with proven content |
| COPPA violations | Low | Very High | Follow NFRs strictly |
| Over-engineering | Medium | Medium | MVP first, iterate |

---

## Validation Checklist

When internal data becomes available, validate:

- [ ] Actual monthly churn rate
- [ ] Actual ARPU and LTV
- [ ] Number of active families
- [ ] Current session frequency
- [ ] Parent NPS or satisfaction data
- [ ] Churn reason analysis
- [ ] Tech stack capabilities
- [ ] Content library inventory
- [ ] Development team capacity
- [ ] Marketing budget

---

## Usage

These assumptions should be:
1. **Referenced** when creating GTM document
2. **Flagged** as assumptions in final deliverable
3. **Validated** before major investment decisions
4. **Updated** as real data becomes available
