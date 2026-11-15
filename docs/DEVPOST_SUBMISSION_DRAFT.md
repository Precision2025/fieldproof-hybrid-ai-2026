# FieldProof — Evidence Before Invoice

**Contest:** Google #BuildHybridAI 2026 (Web/Chrome)
**Entrant:** Travis Jackson / Precision2025
**Status:** Draft — NOT a confirmed Devpost submission
**Deadline:** Nov 30, 2026 at 2:00 PM Pacific / 4:00 PM Central

## Elevator pitch
FieldProof helps field-service technicians show what is known, what is missing, and what still requires human approval before an invoice or service report is finalized. It combines an explainable evidence checklist with privacy-aware Firebase AI Logic review, using synthetic work orders and never fabricating inspection results.

## Inspiration
Facilities and electrical-service work orders can close with incomplete notes, missing before-and-after photographs, or an unclear return visit. That creates disputes, repeated calls, and unnecessary administrative work. FieldProof focuses on evidence rather than claiming to diagnose an electrical problem or certify a repair.

## What it does
- Choose or edit a synthetic work order and technician notes.
- A six-point deterministic checklist identifies arrival/access, before photos, performed actions, after photos, verification notes, and documented customer handoff.
- Add local image references and categorize them by stage; the prototype never uploads image bytes.
- Check missing facts and prevent an unsupported claim of completion; all outcomes still require human supervisor review.
- Explicitly opt into Firebase AI Logic cloud fallback to generate a grounded customer summary, missing-evidence questions, and administrative next steps.
- Export a plain-text evidence packet with unverified technician notes clearly labeled.

## How we built it
A new open-source Vite JavaScript application was created during the November 2026 competition. The frontend uses original source with synthetic sample records, an explainable deterministic rubric, and Firebase AI Logic's JavaScript SDK. The Web app was registered in a dedicated free Firebase Spark project. Firebase App Check uses a production reCAPTCHA Enterprise provider and is enforced for Firebase AI Logic. The Gemini Developer API model is explicitly configured as gemini-3.5-flash-lite. The application instantiates `getGenerativeModel` with Firebase AI Logic's `PREFER_ON_DEVICE` mode when cloud permission is enabled, calls `initializeDeviceModel` from the Analyze action, and exposes the actual `inferenceSource` returned by the SDK. The default privacy state disallows cloud data transfer.

## What really works and what is still limited
The deterministic evidence checklist, local photo references, export, App Check integration, and publicly accessible Vercel deployment are functional. A separate live browser test verified a genuine Firebase AI Logic `IN_CLOUD` response to synthetic parking-lot field notes, generating a customer summary and documentation questions without inventing measurements. Another test identified a privacy regression where cloud inference was reported with the cloud toggle OFF. We blocked on-device-only inference **before any AI request** until a separate Chrome on-device privacy test can prove local isolation. Today, cloud-inference use requires the explicit consent toggle. We do **not** claim to have independently verified an `ON_DEVICE` response.

## Challenges and learnings
- Google's older default Gemini 2.5 Flash Lite model was unavailable to this new Firebase project. We configured Gemini 3.5 Flash Lite and verified actual inference.
- The production App Check provider was initially blocked by a reCAPTCHA v3 registration error; reCAPTCHA Enterprise registration succeeded with no paid plan or billing method.
- A separate browser test revealed a privacy problem with the on-device-only setting. We treated it as a release blocker and instituted a fail-closed guard rather than pretending an inference was local.
- The documentation rubric originally marked a tenant mention as completed customer handoff. We strengthened the rule to require explicit communication or approval and added a regression test.

## Impact and originality
Unlike broad chatbots, FieldProof targets a highly specific work-order failure: evidence that cannot be defended later. The app distinguishes unverified technician reports from actual proof and keeps a human supervisor in the loop. We used no production Precision Lighting or All In One Electric records, and no proprietary code was copied. AI coding assistance was used during development; all repository files were created as part of this contest project.

## Public links
- **Source (MIT):** https://github.com/Precision2025/fieldproof-hybrid-ai-2026
- **Live app:** https://fieldproof-hybrid-ai-2026-travis-s-projects-980fd233.vercel.app/
- **YouTube demo:** PENDING PUBLICATION AND VALIDATION — insert verified watch URL before submission

## Judge testing steps
1. Open the live app in a current desktop Chrome browser; no account required.
2. Choose **Retail outage**. The evidence rubric flags incomplete records rather than fabricating a handoff.
3. Switch to **Parking-lot lights** to show the transparent six-point checklist and synthetic before/after image references.
4. Remove an after-photo: the score must drop. Restore sample by reselecting it.
5. Download the plain-text proof packet; verify that it says technician notes are unverified and it is not electrical safety certification.
6. For a real model test, choose a synthetic scenario, explicitly turn **Allow cloud fallback** ON, then click **Analyze documentation with Firebase AI Logic**. App Check may need time to initialize and network access; the response must show `IN_CLOUD` or `ON_DEVICE` and a factual, non-fabricated summary. Keep the toggle OFF unless consenting to cloud transmission. On-device-only AI remains on safety hold while a privacy test is pending.

## Submission checklist
- [x] Original public repository and MIT license
- [x] Working public deployment (non-AI functions)
- [x] Firebase AI Logic invoked at runtime with App Check enforced
- [x] Verified live `IN_CLOUD` result with synthetic data
- [x] Explicitly documented on-device safety hold
- [x] 69-second real-UI screen walkthrough, original instrumental score
- [ ] Public YouTube watch URL confirmed after publication
- [ ] On-device Chrome Nano4 proof and privacy regression test (high priority, not independently verified)
- [ ] Sign in to Devpost and submit using the user's existing account; save receipt

No prize, acceptance, or official contest submission is claimed by this draft.