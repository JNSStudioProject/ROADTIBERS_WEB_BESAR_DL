# RoadTierbers Design Lock

This document outlines the final, approved visual and interaction design direction for RoadTierbers. Future tasks, subagents, and development must adhere to these guidelines to maintain a premium, cohesive product experience.

## 1. Locked Design Direction
- **Style:** Bright Apple-inspired liquid glass.
- **Vibe:** Clean, elegant, professional, and visually full (no excessive empty/dead space).
- **Prohibitions:** 
  - No dark-heavy sections.
  - No cyberpunk or neon aesthetics.
  - No generic AI SaaS landing page templates.

## 2. Locked Color Direction
Use the RoadTierbers bright palette exclusively:
- **Backgrounds:** Off-white (`#F5F7FA`) and soft blue-white bases.
- **Surfaces:** White translucent glass.
- **Text:** Police Navy (`#0B1F3A`) or soft slate variants for readability.
- **CTAs & Active States:** Command Blue (`#1D4ED8`).
- **Highlights:** Subtle Cyan (`#06B6D4`) or Teal (`#14B8A6`) glows.
- **Status:** Use red/amber/green status colors only when strictly needed for indicators.

**Avoid:** Full dark navy backgrounds, solid black sections, random unstructured gradients, inconsistent accent colors, and gray opaque glass blocks.

## 3. Locked Navbar Direction
- **Structure:** Floating, rounded, top-center liquid glass navbar.
- **Aesthetic:** Transparent/semi-transparent with strong backdrop blur, a hairline white border, and soft shadow.
- **Behavior:** Features a compact pill for active state and keeps the "Command Center" CTA prominent.
- **Rule:** Do not redesign the navbar unless explicitly requested by the user.

## 4. Locked Landing Page Direction
- **Structure:** The current layout, scrolling flow, and section order of the landing page are approved.
- **Rule:** Do not redesign the landing page, rewrite its copy, or change the section sequence unless explicitly requested. Only bug fixes or consistency alignments are allowed.

## 5. Locked Interaction Direction
- **Mouse Hover:** Interactive cards use subtle tilt and tracking highlight logic. 
- **Mouse Leave:** Mouse tilt must immediately and smoothly reset (x:0, y:0) when the cursor leaves. No stuck animations.
- **Scroll Reveals:** Scroll animations should be varied (e.g., staggering up, revealing from left/right) but remain subtle and professional.
- **Quality:** Motion must feel premium, not gimmicky. No spinning, no excessive bouncing. Always respect the OS `prefers-reduced-motion` setting.

## 6. Liquid Glass Rules
All glass elements across the app must follow this consistent visual language:
- Use translucent white surfaces (e.g., `bg-white/60` to `bg-white/90`).
- Apply sufficient backdrop blur.
- Use soft, hairline borders (e.g., `border-white/80`).
- Use subtle inner highlights and soft shadows.
- Ensure high readability for all text placed over glass.

## 7. Future Page Rules
All future public and officer pages must follow the locked design:
- Adhere to the bright liquid glass aesthetic.
- Maintain minimal copy, clear hierarchy, and responsive layouts.
- Ensure no dead or awkward empty areas.
- Maintain a professional UI/UX.
- Strictly separate public-safe data from sensitive officer data.
