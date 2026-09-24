# LOST//98 — Lost & Found Portal

## Retro '98 Inspired Website Specification

Reference: https://retro98.framer.website/landing

Build a complete Lost & Found Portal using an original Windows 95/98-inspired visual language based on the supplied reference. The reference is inspiration for the UI style, not content to copy.

> **Lost something? Found something? Check the system.**

---

## 1. Product Vision

LOST//98 is a community Lost & Found platform where users can:

- Report lost items
- Report found items
- Search and filter reports
- Discover possible matches
- Submit ownership claims
- Verify ownership
- Communicate securely
- Track reports and claims
- Receive notifications
- Report suspicious activity
- Manage account security

The UI should look retro while the underlying application is modern, responsive, accessible, and secure.

---

# 2. UI / Design Direction

Use the supplied Retro '98 Portfolio as the visual direction.

### Visual language

- Windows 95/98-inspired windows
- Desktop metaphor
- Grey/silver panels
- Blue title bars
- Beveled buttons
- Pixel/bitmap-style icons
- File Explorer-style lists
- Taskbar
- Start menu
- Dialog boxes
- System status indicators
- Monospace/system typography
- Retro menus
- Small nostalgic UI details

Do not make a direct copy of the reference. Create an original LOST//98 interface using the same general retro-computer design language.

### Design principle

**Retro outside. Modern inside.**

---

# 3. Brand

### Name

**LOST//98**

### Tagline

**Lost something? Found something? Check the system.**

### System microcopy

- `SYSTEM READY`
- `SEARCH THE DATABASE`
- `ITEM FOUND`
- `POSSIBLE MATCH DETECTED`
- `CLAIM VERIFICATION REQUIRED`
- `REPORT SAVED`
- `SECURITY CHECK PASSED`
- `USER AUTHENTICATED`
- `NO MATCH FOUND`
- `CASE RESOLVED`

---

# 4. Homepage / Desktop

The homepage should feel like a retro computer desktop.

### Desktop shortcuts

- `My Computer` → Dashboard
- `Search` → Search items
- `Report Lost` → Lost item form
- `Report Found` → Found item form
- `My Reports` → User reports
- `Messages` → Secure messages
- `Security Center` → Security settings
- `Recycle Bin` → Resolved/closed cases
- `Community` → Community reports

### Taskbar

Include:

- Start button
- Search
- Open windows
- Notifications
- Security status
- Current time

Example:

```text
┌──────────────────────────────────────────────────────────────┐
│ [START] [🔎 Search] [📦 Reports] [💬 Messages]      🔐 SECURE │
└──────────────────────────────────────────────────────────────┘
```

---

# 5. Main Application Window

```text
┌─────────────────────────────────────────────────────────────┐
│ LOST//98 — Lost & Found                           _ □ X      │
├─────────────────────────────────────────────────────────────┤
│ File   Edit   View   Search   Reports   Security   Help      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              LOST SOMETHING?                                │
│              FIND IT BEFORE IT'S GONE.                      │
│                                                             │
│       [ 🔎 SEARCH ITEMS ]                                   │
│                                                             │
│       [ REPORT LOST ]    [ REPORT FOUND ]                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ SYSTEM STATUS                                               │
│ 🟢 Database Online     🟢 Security Active                  │
│                                                             │
│ Reports: 2,481       Returned: 1,204       Active: 327      │
└─────────────────────────────────────────────────────────────┘
```

---

# 6. Search System

Make search feel like a retro file explorer.

### Filters

- Item name
- Category
- Color
- Brand
- Location
- Date lost/found
- Status
- Lost / Found
- Keywords

```text
┌─ SEARCH LOST & FOUND ─────────────────────────────── X ┐
│                                                        │
│ What are you looking for?                              │
│ [ black wallet                                  ] 🔎  │
│                                                        │
│ Category: [ All Categories ▼ ]                         │
│ Location: [ Any Location ▼ ]                           │
│ Date:     [ Any Date ▼ ]                               │
│ Status:   [ Active ▼ ]                                 │
│                                                        │
│                    [ SEARCH ]                           │
└────────────────────────────────────────────────────────┘
```

Results should show:

- Image
- Item name
- Lost/found status
- Category
- General location
- Date
- Short description
- Possible match percentage
- Report ID
- `VIEW ITEM`

Never expose sensitive information or exact private locations.

---

# 7. Report Lost Item

Use a multi-step retro form.

### Step 1 — Item information

- Item name
- Category
- Brand
- Color
- Description
- Approximate date/time
- General location
- Photos
- Identifying characteristics

### Step 2 — Private ownership information

Collect information that must remain private:

- Hidden marking
- Serial number
- Unique scratch
- Contents
- Private identifier

This information is used for ownership verification and must not appear publicly.

### Step 3 — Contact preferences

Allow:

- In-platform messaging
- Email notification
- Optional protected phone contact

Never publicly expose personal contact information.

---

# 8. Report Found Item

Fields:

- Item name
- Category
- Brand
- Color
- Description
- Found date/time
- General location
- Photos
- Condition
- Safe handover location
- Optional private identifying details

Show a warning:

```text
⚠ SECURITY NOTICE

Do not publish serial numbers, hidden markings,
private contents, or other information that could
allow someone to falsely claim this item.

[ OK, I UNDERSTAND ]
```

---

# 9. Item Details

```text
┌─ ITEM REPORT #L98-2048 ────────────────────────────── X ┐
│                                                         │
│  [ IMAGE ]       BLACK BACKPACK                         │
│                                                         │
│                  Status: FOUND                          │
│                  Category: Bags                         │
│                  Area: College Campus                   │
│                  Date: 22 Sep 2026                      │
│                                                         │
│                  Possible matches: 3                    │
│                                                         │
│       [ I THINK THIS IS MINE ]                          │
│       [ REPORT THIS LISTING ]                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

# 10. Ownership Verification

This is a core security feature.

Never allow a user to claim an item only because they know the public description.

### Flow

```text
Lost Report
     ↓
Possible Match
     ↓
Claim Request
     ↓
Ownership Questions
     ↓
Verification
     ↓
Finder Review
     ↓
Safe Handover
     ↓
Case Resolved
```

### Verification questions

Examples:

- What was inside the bag?
- What unique mark does it have?
- What are the last 4 digits of the serial number?
- What sticker/marking is on it?
- What accessory was attached?

Never reveal the expected answers.

---

# 11. Smart Matching

Add an optional matching system comparing:

- Category
- Item name
- Color
- Brand
- Location proximity
- Date proximity
- Description similarity
- Image similarity
- Keywords

Example:

```text
┌─ MATCH DETECTOR ────────────────────────────────┐
│                                                 │
│ POSSIBLE MATCH DETECTED                         │
│                                                 │
│ Match confidence: 87%                           │
│                                                 │
│ ✓ Category matches                              │
│ ✓ Color matches                                 │
│ ✓ Nearby location                              │
│ ✓ Date proximity                                │
│ ✓ Description similarity                        │
│                                                 │
│ [ VIEW POSSIBLE MATCH ]                         │
└─────────────────────────────────────────────────┘
```

The score is only a suggestion, never proof of ownership.

---

# 12. Secure Messaging

Use internal messaging so users do not need to publicly share:

- Phone numbers
- Email addresses
- Home addresses
- Social media accounts

Features:

- In-platform messages
- Block user
- Report conversation
- Rate limiting
- Spam detection
- Moderation tools

---

# 13. Cybersecurity Center

Make security a visible first-class feature.

```text
┌─ SECURITY CENTER ───────────────────────────────────┐
│                                                     │
│ ACCOUNT STATUS                                      │
│                                                     │
│ 🟢 Email verified                                   │
│ 🟢 Strong password                                  │
│ 🟢 Active session protected                         │
│ 🟢 Two-factor authentication                        │
│                                                     │
│ [ ENABLE 2FA ]                                      │
│ [ VIEW ACTIVE SESSIONS ]                            │
│ [ CHANGE PASSWORD ]                                 │
│ [ SECURITY LOG ]                                    │
└─────────────────────────────────────────────────────┘
```

---

# 14. Authentication

Support:

- Email/password
- Email verification
- Google OAuth
- Password reset
- Secure session management
- Optional 2FA
- Logout from all devices
- Session/device list

### Roles

**User**
- Create reports
- Search
- Claim items
- Message users
- Manage profile

**Moderator**
- Review reports
- Remove suspicious content
- Review claims
- Handle abuse reports

**Admin**
- Manage users/moderators
- Review security logs
- Investigate suspicious activity
- Manage categories
- Manage system settings

---

# 15. Database Security

Use PostgreSQL/Supabase Row Level Security.

Users should only be able to:

- Read public report data
- Edit their own reports
- Access their own private claim data
- Access their own messages
- Access their own profile

Never rely only on frontend authorization. Sensitive authorization must be enforced server-side/database-side.

---

# 16. File Upload Security

Allow item images with:

- MIME validation
- Extension validation
- Maximum file size
- Image dimension limits
- Filename sanitization
- Random storage filenames
- Private storage where appropriate
- Signed URLs for protected files
- Malware scanning where available
- No executable files
- Safely sanitized SVG or preferably no SVG uploads

Recommended formats:

- JPEG
- PNG
- WebP

---

# 17. Common Attack Protection

### XSS
Sanitize user-generated content and never inject raw user input into HTML.

### SQL Injection
Use parameterized queries/database APIs.

### IDOR
Verify that the authenticated user owns or is authorized to access the requested resource.

### Brute Force
Use rate limiting, login monitoring, temporary lockouts, and CAPTCHA when suspicious.

### CSRF
Use framework/server protections for state-changing requests.

### Spam
Detect excessive reports, duplicate submissions, repeated messages, and suspicious patterns.

### Account takeover
Use email verification, secure sessions, optional 2FA, login notifications, and device/session management.

---

# 18. Privacy

Never publicly display:

- Phone number
- Personal email
- Home address
- Exact current location
- Private ownership information
- Sensitive item identifiers

Use approximate locations.

Example:

```text
Private:
Building 4, Room 203

Public:
North Campus
```

---

# 19. Suspicious Activity Detection

Flag suspicious behavior such as:

- Many reports submitted rapidly
- Many failed claim attempts
- Excessive messages
- Repeated claims for unrelated items
- Suspicious uploads
- Multiple account creation
- Unauthorized API requests

Example:

```text
SECURITY EVENT

Suspicious activity detected.

Event: Multiple failed ownership claims
Risk: MEDIUM
Action: Additional verification required

[ REVIEW SECURITY EVENT ]
```

Do not automatically ban legitimate users based on a single signal.

---

# 20. Admin Dashboard

Retro-style sections:

- System Overview
- Users
- Lost Reports
- Found Reports
- Claims
- Messages
- Abuse Reports
- Security Events
- Audit Logs
- Storage
- Settings

Metrics:

- Active reports
- Lost reports
- Found reports
- Resolved cases
- Pending claims
- Flagged users
- Security events

---

# 21. Audit Logs

Track important security events.

```text
2026-09-24 22:41
USER LOGIN
User: U-2048
Status: SUCCESS

2026-09-24 22:43
CLAIM CREATED
Report: L98-2048
User: U-2048

2026-09-24 22:45
SECURITY EVENT
Type: RATE_LIMIT
Status: BLOCKED
```

Do not expose sensitive security information to normal users.

---

# 22. Database Schema

## users

```text
id
email
display_name
avatar_url
role
email_verified
created_at
updated_at
```

## profiles

```text
id
user_id
display_name
avatar_url
bio
preferred_contact_method
created_at
updated_at
```

## reports

```text
id
user_id
type             // LOST | FOUND
title
category
brand
color
description
general_location
date_occurred
status           // ACTIVE | MATCHED | CLAIMED | RESOLVED | CLOSED
created_at
updated_at
```

## private_item_details

```text
id
report_id
user_id
private_description
serial_hint
unique_marking
private_contents
created_at
```

Apply strict RLS.

## report_images

```text
id
report_id
storage_path
mime_type
file_size
created_at
```

## claims

```text
id
report_id
claimant_id
status
verification_status
created_at
updated_at
```

## verification_questions

```text
id
claim_id
question
answer_hash
created_at
```

## conversations

```text
id
report_id
participant_one
participant_two
created_at
```

## messages

```text
id
conversation_id
sender_id
message
created_at
read_at
```

## notifications

```text
id
user_id
type
title
message
read
created_at
```

## security_events

```text
id
user_id
event_type
risk_level
ip_hash
user_agent_hash
metadata
created_at
```

## audit_logs

```text
id
actor_id
action
resource_type
resource_id
metadata
created_at
```

---

# 23. UI Component System

Create reusable retro components:

- `RetroWindow`
- `RetroTitleBar`
- `RetroButton`
- `RetroInput`
- `RetroSelect`
- `RetroCheckbox`
- `RetroDialog`
- `RetroMenuBar`
- `RetroTaskbar`
- `RetroDesktopIcon`
- `RetroFileList`
- `RetroStatusBar`
- `RetroTabs`
- `RetroCard`
- `RetroNotification`
- `RetroProgressBar`
- `RetroModal`
- `RetroTable`
- `RetroBadge`

---

# 24. Window Behavior

Desktop:

- Open
- Close
- Minimize
- Maximize
- Restore
- Optional drag

Mobile:

- Full-screen panels
- Retro title bars
- Normal responsive layouts
- Bottom navigation instead of complex window dragging

Do not sacrifice usability for the desktop metaphor.

---

# 25. Color Direction

Use a classic retro computer palette:

- Light grey/silver panels
- Dark navy title bars
- White content areas
- Black text
- Dark grey borders
- Blue selection states
- Green security indicators
- Red warning indicators
- Yellow warning dialogs

Use beveled borders and subtle shadows.

Avoid excessive gradients.

---

# 26. Typography

System UI:

```css
font-family:
  "MS Sans Serif",
  "Segoe UI",
  Tahoma,
  sans-serif;
```

System logs:

```css
font-family:
  "Courier New",
  monospace;
```

Use pixel fonts only for decorative headings when readability remains good.

---

# 27. Navigation

```text
┌─────────────────────────────┐
│ LOST//98                    │
├─────────────────────────────┤
│ 🔎 Search                   │
│ 📦 Lost Items               │
│ 📍 Found Items              │
│ ➕ Report Lost              │
│ ➕ Report Found             │
│ 💬 Messages                │
│ 🔔 Notifications            │
│ 👤 My Account               │
│ 🛡 Security Center          │
│ ⚙ Settings                 │
├─────────────────────────────┤
│ ⏻ Log Out                   │
└─────────────────────────────┘
```

---

# 28. User Flow

## Lost item

```text
Login
 ↓
Report Lost
 ↓
Enter item information
 ↓
Add private ownership details
 ↓
Submit
 ↓
Search possible matches
 ↓
Possible match notification
 ↓
Open match
 ↓
Submit claim
 ↓
Ownership verification
 ↓
Secure communication
 ↓
Safe handover
 ↓
Mark resolved
```

## Found item

```text
Login
 ↓
Report Found
 ↓
Enter item information
 ↓
Upload photo
 ↓
Keep private identifiers hidden
 ↓
Submit
 ↓
Search existing lost reports
 ↓
Possible match
 ↓
Contact owner securely
 ↓
Verify ownership
 ↓
Handover
 ↓
Resolve case
```

---

# 29. Homepage Copy

### Hero

**LOST SOMETHING?**

**FIND IT BEFORE IT'S GONE.**

`[ SEARCH ITEMS ]`

`[ REPORT LOST ]` `[ REPORT FOUND ]`

### System status

```text
SYSTEM STATUS: ONLINE

2,481 REPORTS
1,204 ITEMS RETURNED
327 ACTIVE CASES
```

### Security section

**YOUR ITEM. YOUR DATA. YOUR CONTROL.**

LOST//98 uses secure authentication, private messaging, ownership verification, and protected data access to help prevent fraudulent claims and protect users.

`[ OPEN SECURITY CENTER ]`

---

# 30. Empty States

### No results

```text
┌──────────────────────────────────────┐
│ FILE NOT FOUND                       │
│                                      │
│ No matching items were found.        │
│                                      │
│ Try changing your search filters.    │
│                                      │
│ [ SEARCH AGAIN ]                     │
└──────────────────────────────────────┘
```

### No reports

```text
NO REPORTS FOUND

Your reports directory is empty.

[ CREATE REPORT ]
```

---

# 31. Notifications

Use retro notification popups.

```text
┌─ LOST//98 ──────────────────── X ┐
│ POSSIBLE MATCH FOUND             │
│                                  │
│ A found item may match your      │
│ lost report #L98-2048.           │
│                                  │
│ [ VIEW MATCH ]                   │
└──────────────────────────────────┘
```

---

# 32. Accessibility

Even with the retro design:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible labels
- Good contrast
- Alt text
- Do not rely only on color
- Screen-reader support
- Reduced-motion support
- Large enough touch targets

---

# 33. Responsive Design

### Desktop
Full desktop metaphor.

### Tablet
Desktop-like windows with flexible layouts.

### Mobile
Full-screen windows, bottom navigation, large touch targets, simplified menus, responsive cards.

The retro style must remain recognizable on every screen.

---

# 34. Recommended Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- React
- Custom retro component system

### Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security

### Optional AI

- Embeddings for description matching
- Image similarity
- Semantic search

### Deployment

- Vercel
- Supabase

---

# 35. Suggested Folder Structure

```text
lost-and-98/
│
├── app/
│   ├── page.tsx
│   ├── search/
│   ├── lost/
│   ├── found/
│   ├── reports/
│   ├── claims/
│   ├── messages/
│   ├── security/
│   ├── profile/
│   └── admin/
│
├── components/
│   ├── retro/
│   │   ├── RetroWindow.tsx
│   │   ├── RetroButton.tsx
│   │   ├── RetroInput.tsx
│   │   ├── RetroTaskbar.tsx
│   │   ├── RetroDialog.tsx
│   │   └── RetroMenu.tsx
│   ├── reports/
│   ├── search/
│   ├── claims/
│   ├── security/
│   └── navigation/
│
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── security/
│   ├── validation/
│   └── matching/
│
├── types/
├── public/
│   ├── icons/
│   └── images/
└── supabase/
    ├── migrations/
    └── policies/
```

---

# 36. MVP

Build these first:

1. Retro homepage
2. Authentication
3. Report Lost
4. Report Found
5. Search
6. Item details
7. Image upload
8. Ownership claim
9. Basic verification
10. Secure messaging
11. User dashboard
12. Security center
13. Admin moderation
14. Supabase RLS
15. Responsive UI

---

# 37. Future Features

- AI item matching
- Image similarity
- QR codes for registered items
- Campus-specific portals
- Location heatmap
- Push notifications
- Email notifications
- Mobile application
- Reputation system
- Advanced fraud detection
- Automated moderation
- Multi-campus support
- Analytics dashboard

---

# 38. QR Recovery

Future feature:

```text
┌──────────────────────┐
│       [ QR CODE ]    │
│                      │
│   LOST//98 ITEM ID   │
│       L98-2048       │
└──────────────────────┘
```

Scanning should never expose the owner's personal details.

Instead:

`ITEM REPORTED LOST`

`[ CONTACT OWNER SECURELY ]`

---

# 39. Safe Handover

Recommend public handover locations such as:

- College security desk
- Reception
- Police/help desk
- Campus administration
- Verified public locations

Never encourage users to share home addresses.

---

# 40. Security Checklist

- [ ] Authentication enabled
- [ ] Email verification enabled
- [ ] RLS enabled on sensitive tables
- [ ] Server-side authorization
- [ ] Input validation
- [ ] Output sanitization
- [ ] Rate limiting
- [ ] Secure file upload
- [ ] Storage access rules
- [ ] Private ownership data protected
- [ ] Secure messaging
- [ ] Abuse reporting
- [ ] Audit logs
- [ ] Security event logging
- [ ] Session management
- [ ] Password reset protection
- [ ] Optional 2FA
- [ ] HTTPS
- [ ] Secrets kept out of source control
- [ ] No API keys exposed in frontend
- [ ] Errors do not leak sensitive data
- [ ] Dependency vulnerabilities checked
- [ ] Database backups configured

---

# 41. Development Priority

### Phase 1 — Visual Foundation
Retro desktop, windows, taskbar, menus, buttons, inputs, cards, responsive layout.

### Phase 2 — Authentication
Sign up, login, verification, password reset, profile.

### Phase 3 — Reports
Lost report, found report, image upload, report detail.

### Phase 4 — Search
Search, filters, results, matching.

### Phase 5 — Claims
Claim request, verification questions, finder review, resolution.

### Phase 6 — Communication
Secure messages, notifications, blocking/reporting.

### Phase 7 — Security
RLS, rate limiting, security events, audit logs, upload validation, abuse detection.

### Phase 8 — AI
Semantic matching and image similarity.

---

# 42. Final Product Goal

The final website should feel like:

> **Someone opened a Windows 98 computer in 2026 and found a modern Lost & Found operating system inside it.**

### Product personality

**Nostalgic + playful + technical + trustworthy + secure**

### Final statement

> **LOST//98**
>
> **The Lost & Found operating system for the real world.**
>
> `SEARCH. MATCH. VERIFY. RETURN.`
