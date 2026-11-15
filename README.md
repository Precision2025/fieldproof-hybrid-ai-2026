# FieldProof — Evidence Before Invoice

**Status: working documentation prototype / Firebase live integration requires the entrant's new project credentials and App Check setup. Not yet eligible as a final #BuildHybridAI entry.**

A privacy-first field-documentation reviewer for commercial electrical and service technicians, using a transparent six-point evidence rubric plus optional **Firebase AI Logic hybrid inference**. Designed from a real service-industry workflow, not based on proprietary company code. All built-in samples are entirely synthetic.

## Value proposition

Service visits often end with incomplete notes, missing before/after evidence or unverified signoff. FieldProof identifies what was documented and what still needs to be confirmed **before** a work order can be routed to office review. It never fabricates readings, fixes, photos or customer signatures, and it never certifies electrical work.

## What works without an account

- Three synthetic sample work orders and editable notes / site fields
- Six explainable documentation checks with real-time status and score
- Browser file picker for optional local before/after photo references (files are NOT uploaded)
- Locally generated and downloadable evidence packets
- Explicit privacy controls and honest AI-availability/error reporting
- Responsive web UI; desktop and mobile layout

## AI integration (contest-required activation)

`src/ai.js` **imports and invokes** Firebase AI Logic (`getAI`, `getGenerativeModel`, `model.initializeDeviceModel`, `model.generateContent`). It uses `InferenceMode.ONLY_ON_DEVICE` by default for data privacy. If the technician explicitly authorizes cloud fallback, it uses `InferenceMode.PREFER_ON_DEVICE`. `result.response.inferenceSource` reports whether the result was ON_DEVICE or IN_CLOUD. Firebase App Check initialization uses a registered public reCAPTCHA v3 site key.

**No AI output is fabricated while unconfigured.** A working Chrome desktop with Nano4 available, a real Firebase project with AI Logic enabled, and enforced App Check are needed to validate the live AI path. App Check debug tokens must NEVER be committed. A production attestation provider must be configured before public release.

## Run

```bash
npm install
cp .env.example .env
npm run dev
npm test
npm run build
```

To activate live hybrid AI:
1. Create a **new** Firebase project dedicated to this contest, register a Web app, enable Gemini Developer API provider for AI Logic, and enforce App Check.
2. Register a production reCAPTCHA v3 App Check provider and copy only the public site key into `VITE_APPCHECK_RECAPTCHA_SITE_KEY`. Set Firebase public configuration entries in `.env` (not committed).
3. Use Chrome desktop v139+ with Gemini Nano multimodal Prompt API support/flag and availability; a user click starts `initializeDeviceModel`.
4. Press **Analyze with Firebase AI Logic**. With cloud fallback off, only the on-device model is allowed. With it on, the text notes may be sent to the Gemini Developer API through Firebase if local model isn't available.
5. Test using an actual project. Confirm `ON_DEVICE` and `IN_CLOUD` modes are accurately labeled before making contest/demo claims.

## #BuildHybridAI 2026 eligibility checklist

- [x] Source explicitly calls Firebase AI Logic at runtime
- [x] Web/Chrome application implementation
- [x] Open-source MIT license
- [x] Original value proposition and full instructions
- [ ] Activate actual Firebase project, App Check, and Gemini Nano4 on desktop Chrome
- [ ] Exercise live Firebase AI Logic call and verify inferenceSource
- [ ] Deploy secure preview with production App Check configured
- [ ] Put code in a **public** repository; final open-source README and LICENSE visible
- [ ] Record truthful functional < 3-minute demo and publish publicly on YouTube
- [ ] Submit through Devpost before 2026-11-30 2:00 PM Pacific

**Demo-mode is not sufficient for contest eligibility. Do not claim live AI inference until it has actually been tested.**

## Safety and privacy

This tool reviews documentation completeness only. It cannot issue safe-to-energize decisions, electrical code determinations or repair instructions. The photo file contents remain local. User-entered notes may contain private information; no cloud fallback occurs without consent. No production customer records or company trade secrets are included.

Firebase documentation: https://firebase.google.com/docs/ai-logic/hybrid/web/get-started
Official rules: https://firebasehybridaihackathon.devpost.com/rules