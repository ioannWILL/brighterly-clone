# Notification Strategy for Brighterly (Web-Based Tutoring Platform)

> **Status:** Planning - Not yet implemented
> **Last Updated:** 2026-03-25
> **Owner:** Product Team

## Current State

| Channel | Status | Current Use |
|---------|--------|-------------|
| **WhatsApp** | Active | Upcoming lesson reminders |
| **SMS** | Active | Upcoming lesson reminders |
| **Email** | Active | Heavily used (multiple purposes) |
| **Browser Push** | Not implemented | - |

---

## Context

- **Platform:** Web-based only (no mobile/PWA app)
- **Market:** US/Canada
- **Age range:** Mixed 5-14 years
- **Goal:** Bring kids/parents back for mini-lessons between live tutoring sessions

---

## Recommended Strategy: Prioritized Channels

Given existing SMS/WhatsApp for session reminders, here's the adjusted priority:

| Priority | Channel | Effort | Impact | Recommendation |
|----------|---------|--------|--------|----------------|
| **1** | Browser Push Notifications | Low | High | Implement for engagement (achievements, streaks) |
| **2** | Email Optimization | Low | Medium | Restructure existing emails |
| **3** | SMS/WhatsApp Expansion | Low | Medium | Extend existing channels to engagement use cases |

---

## Priority 1: Browser Push Notifications

### Why This Is Your Best Bet for Engagement

- **Works without an app** - Notifications appear on desktop/mobile browsers even when your site is closed
- **30x higher conversion than email**
- **50% open rates** vs 20-25% for email
- **7.8-10% CTR** vs 1-3% for email
- **Low implementation effort** - Third-party services handle complexity
- **Complements existing SMS/WhatsApp** - Use push for frequent engagement, keep SMS/WhatsApp for high-priority session reminders

### Implementation Recommendation

**Recommended service: OneSignal**
- Free tier: 10,000 subscribers
- Works on Chrome, Firefox, Safari, Edge
- Rich notifications (images, action buttons)
- Segmentation and automation built-in
- Easy integration with most web platforms

### What to Send via Push (NEW - Not Covered by Existing Channels)

| Notification | Trigger | Example |
|--------------|---------|---------|
| **Achievement** | Lesson/badge earned | "[Child] just earned Bronze Calculator!" |
| **Streak reminder** | 5 PM if no practice today | "Keep [Child]'s 5-day streak alive! 10 mins" |
| **Session prep** | 24h before live session | "Tomorrow's session: Complete 2 mini-lessons first" |
| **New content** | When tutor assigns practice | "[Tutor] assigned new practice for [Child]" |

### Frequency Limit
- **2-3 push notifications per week maximum**
- Personalize timing based on when parents typically engage

### COPPA Compliance
Since you have mixed ages (5-14), **all push notifications must go to parents**:
1. During parent onboarding, request push notification permission
2. Notifications go to parent's browser, not child's
3. Content references child's progress but parent is the recipient

---

## Priority 2: Email Optimization (Not More, Smarter)

You already send emails - restructure them rather than adding volume.

### Current vs Recommended

| Instead of... | Send... |
|--------------|---------|
| Multiple weekly updates | **1 weekly digest** (Tuesday or Friday, 5 PM) |
| Generic "practice reminder" | **Achievement-triggered** ("Emma earned a badge!") |
| Text-heavy progress reports | **Visual dashboard** (progress bars, streak flames) |
| "Don't forget to practice" | **Specific call-to-action** ("2 lessons unlock a badge") |

### Weekly Digest Template

**Subject:** [Child]'s Week: 3 lessons completed, 5-day streak!

**Content:**
- Progress visualization (lessons done, streak count)
- One highlight achievement
- "Before Thursday's session: Complete the fractions practice [Tutor] assigned"
- One-click link to mini-lesson

### Triggered Emails (Replace Broadcast)

| Trigger | Email |
|---------|-------|
| Badge earned | Celebration email with badge image |
| 3+ day streak achieved | "Keep it going!" with streak visualization |
| 5-7 days inactive | Re-engagement ("Emma's lessons miss her") |
| Tutor assigns practice | "New practice from [Tutor]: [Topic]" |

---

## Priority 3: Expand Existing SMS/WhatsApp

### Current State
- SMS and WhatsApp already active for **upcoming lesson reminders**

### Expansion Opportunities

Since infrastructure exists, consider adding:

| Use Case | Channel | Why |
|----------|---------|-----|
| Streak about to break (5+ day streak at risk) | SMS | Urgency requires immediate attention |
| Re-engagement (7+ days inactive) | WhatsApp | Last resort after push/email fail |
| Session prep reminder (2h before) | WhatsApp | "Complete [Tutor]'s practice before today's session" |

### Keep Current SMS/WhatsApp For:
- Session reminders (working well, don't change)
- High-priority urgent notifications

### Do NOT Use SMS/WhatsApp For:
- Weekly updates (use email)
- Achievement notifications (use push - too frequent for SMS)
- General reminders (use push)

---

## What NOT to Do

| Avoid | Why |
|-------|-----|
| Direct notifications to kids | COPPA violation for under-13, parent-first for all |
| More than 5-7 notifications/week total | 32% opt-out rate at 6-10/week |
| Generic "time to practice" messages | Low engagement, feels spammy |
| Duplicating SMS lesson reminders | Already working, don't add noise |

---

## Notification Frequency Framework

| Channel | Max/Week | Best Use |
|---------|----------|----------|
| Email | 2x | Tuesday/Friday digest + achievement triggers |
| Browser Push | 3x | Achievements, streaks, session prep |
| SMS | 1-2x | Session reminders (existing) + streak-at-risk |
| WhatsApp | 1-2x | Session reminders (existing) + re-engagement |
| **Total combined** | 5-7 max | Spread across week |

---

## Channel Responsibility Matrix

| Notification Type | Primary Channel | Backup Channel |
|-------------------|-----------------|----------------|
| **Session reminder (24h)** | SMS/WhatsApp (existing) | Email |
| **Session reminder (1-2h)** | SMS/WhatsApp (existing) | Push |
| **Achievement earned** | Browser Push | Email |
| **Streak reminder** | Browser Push | - |
| **Session prep (tutor assigned)** | Browser Push | Email |
| **Weekly progress digest** | Email | - |
| **Re-engagement (7+ days)** | Email | WhatsApp |
| **Streak at risk (5+ days)** | Push | SMS (high-value streaks only) |

---

## Implementation Roadmap

### Phase 1 (Week 1-2): Browser Push Setup

1. Integrate OneSignal (or similar) into web platform
2. Add push opt-in during parent onboarding flow
3. Implement triggered notifications:
   - Achievement earned → immediate push
   - No practice today by 5 PM → reminder push
   - Session tomorrow → 24h prep push (complement existing SMS)

### Phase 2 (Week 3-4): Email Restructure

1. Consolidate existing emails into weekly digest
2. Create achievement-triggered email templates
3. Add visual progress elements (streak flames, progress bars)
4. Set up re-engagement sequence (5-7 day inactive trigger)

### Phase 3 (Month 2): SMS/WhatsApp Expansion

1. Evaluate push notification performance
2. If engagement is good, extend SMS/WhatsApp for:
   - Streak-at-risk alerts (only for established 5+ day streaks)
   - Re-engagement after 7+ days (WhatsApp preferred)
3. A/B test push vs SMS for session prep reminders

---

## Metrics to Track

| Metric | Target |
|--------|--------|
| Push opt-in rate | 10-15% of parents |
| Push CTR | 7-10% |
| Weekly digest open rate | 35-40% |
| Mini-lesson completion (after notification) | Track conversion |
| Notification-driven session prep | % who complete assigned practice |

---

## Summary: Your Notification Stack

```
┌─────────────────────────────────────────────────┐
│  PARENTS (Primary recipient for all ages)        │
├─────────────────────────────────────────────────┤
│  Browser Push (NEW - 2-3x/week)                  │
│  • Achievements, streak reminders, session prep  │
├─────────────────────────────────────────────────┤
│  Email (OPTIMIZE - 2x/week)                      │
│  • Weekly digest + achievement triggers          │
├─────────────────────────────────────────────────┤
│  SMS (EXISTING - 1-2x/week)                      │
│  • Session reminders + streak-at-risk            │
├─────────────────────────────────────────────────┤
│  WhatsApp (EXISTING - 1-2x/week)                 │
│  • Session reminders + re-engagement             │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  KIDS (In-platform only - no external comms)     │
├─────────────────────────────────────────────────┤
│  Dashboard badges, streak counter, animations    │
│  In-platform notification center                 │
│  Progress visualization                          │
└─────────────────────────────────────────────────┘
```

---

## Next Steps

1. [ ] **Decide on push notification service** (recommend OneSignal free tier to start)
2. [ ] **Design push opt-in flow** for parent onboarding
3. [ ] **Define notification triggers** and message templates
4. [ ] **Restructure current email cadence** into digest + triggers
5. [ ] **Audit current SMS/WhatsApp usage** to avoid overlap with new channels

---

## Open Questions

- What is the current email sending infrastructure? (SendGrid, Mailchimp, etc.)
- Are there existing user segments for parents vs children?
- What triggers currently exist for SMS/WhatsApp session reminders?
- Is there a preference for push notification provider?
