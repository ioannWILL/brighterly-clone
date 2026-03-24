# COPPA Notification Non-Functional Requirements (NFRs)

## Overview

This document defines Non-Functional Requirements (NFRs) for push notifications in products targeted at children under 13, ensuring compliance with the Children's Online Privacy Protection Act (COPPA).

COPPA regulates how personal data of children is collected, used, and processed. Push notifications fall under COPPA when they rely on device identifiers or behavioral data.

---

## 1. Privacy Compliance

### NFR-1.1: No Personal Data Usage Without Parental Consent
The system must not use personal data (including device identifiers or behavioral data) for notifications unless verifiable parental consent (VPC) is obtained.

### NFR-1.2: Limited Use Under “Support for Internal Operations”
The system may use persistent identifiers without parental consent only for internal operations such as:
- Maintaining functionality
- Authentication
- Security
- Contextual session-based reminders

### NFR-1.3: No Behavioral Profiling Without Consent
The system must not:
- Build user behavior profiles
- Track long-term engagement patterns
- Segment users based on performance or usage

---

## 2. Notification Content Constraints

### NFR-2.1: Neutral Messaging Without Consent
Notifications sent without parental consent must:
- Be neutral in tone
- Avoid pressure or urgency
- Avoid performance-based messaging

Allowed examples:
- “Your lesson is ready”
- “Time for today’s practice”

### NFR-2.2: Prohibited Content Without Consent
The system must not send:
- Performance-based messages (“You are falling behind”)
- Social comparison (“Other kids are ahead of you”)
- Streak pressure (“Don’t lose your streak”)

### NFR-2.3: No Commercial Messaging Without Consent
Notifications must not:
- Promote purchases
- Upsell subscriptions
- Advertise products or features

---

## 3. Personalization & Targeting

### NFR-3.1: No Personalization Without Consent
The system must not personalize notifications based on:
- Learning progress
- Past activity
- Engagement patterns

### NFR-3.2: Static Scheduling Only
Without consent, notifications must be:
- Time-based (fixed schedule)
- Session-based (triggered by immediate activity only)

### NFR-3.3: No Optimization Algorithms
The system must not:
- Optimize send time
- Run A/B tests
- Use ML/AI for engagement optimization

---

## 4. Data Handling & Storage

### NFR-4.1: Minimal Data Retention
The system must:
- Avoid storing notification-related data long-term
- Use ephemeral session data where possible

### NFR-4.2: No Cross-Session Tracking Without Consent
The system must not:
- Track behavior across sessions
- Link activity over time to optimize notifications

---

## 5. Frequency & Delivery Controls

### NFR-5.1: Controlled Notification Frequency
The system must:
- Limit frequency of notifications
- Avoid excessive or spam-like delivery

### NFR-5.2: No Manipulative Timing
The system must not:
- Send notifications at psychologically optimized times
- Use urgency-based triggers

---

## 6. Parental Controls & Transparency

### NFR-6.1: Consent Management
The system must:
- Collect verifiable parental consent before enabling personalization
- Store consent status securely

### NFR-6.2: Parent Dashboard
The system should provide:
- Visibility into notifications sent
- Ability to enable/disable notifications
- Ability to review data usage

### NFR-6.3: Opt-out Mechanism
Parents must be able to:
- Disable notifications entirely
- Revoke consent at any time

---

## 7. Security Requirements

### NFR-7.1: Secure Storage of Identifiers
The system must:
- Encrypt device identifiers
- Prevent unauthorized access

### NFR-7.2: Access Control
Only authorized services should:
- Trigger notifications
- Access notification-related data

---

## 8. Audit & Compliance

### NFR-8.1: Logging
The system must:
- Log notification events
- Track consent status at the time of sending

### NFR-8.2: Audit Trail
The system must:
- Maintain tamper-evident logs
- Allow reconstruction of notification decisions

### NFR-8.3: Compliance Validation
The system should:
- Periodically validate compliance with COPPA rules
- Flag violations automatically

---

## 9. Two-Tier Notification Model (Recommended Architecture)

### Tier 1: Without Parental Consent
Capabilities:
- Static reminders
- Session-based nudges
- No personalization
- No behavioral tracking

### Tier 2: With Parental Consent
Capabilities:
- Personalized notifications
- Progress-based messaging
- Adaptive timing
- Engagement optimization

Requirements:
- Explicit parental consent
- Full transparency
- Easy opt-out

---

## 10. Risk Summary

High-risk violations:
- Personalized notifications without consent
- Behavioral targeting
- Marketing messages
- A/B testing on children

Moderate risks:
- Excessive frequency
- Pressure-based language

Low risk:
- Neutral, time-based reminders
- Session-based notifications without profiling

---

## Conclusion

To remain COPPA-compliant, notification systems for children must prioritize:
- Minimal data usage
- No personalization without consent
- Transparent parental control
- Ethical engagement design

The safest baseline is to treat notifications as simple reminders, not growth tools, unless parental consent is explicitly obtained.
