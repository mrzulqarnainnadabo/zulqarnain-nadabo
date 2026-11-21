# SIGMA-GEO — Research concept brief

**Project family:** SIGMA-Eval  
**Research area:** AI evaluation · geospatial evidence integrity · responsible spatial reasoning  
**Project stage:** Initial hackathon prototype; further validation required  
**Developer:** Zulqarnain Nadabo, Geography and Sustainability graduate  
**Hackathon:** micro1 Eval Hackathon, 30 October–7 November 2026

## Research question

How reliably can AI systems identify defects in geographical evidence before producing spatial conclusions, while still answering when the evidence is adequate?

## Motivation

A spatial answer can sound precise while resting on evidence that is outdated, incomplete, contradictory or incorrectly referenced. Geography provides a disciplined way to examine evidence in context: its date, location, scale, completeness, consistency and suitability for the question being asked.

SIGMA-GEO explores whether these evidence-quality checks can be evaluated systematically in AI systems.

## Current prototype

The initial prototype contains:

- 12 synthetic evaluation cases across six evidence-defect dimensions.
- Matched clean controls, allowing comparison between defective and adequate evidence.
- A deterministic grader.
- Automated checks for the prototype pipeline and submission package.

The defect dimensions represented in the prototype include outdated data, missing location information, conflicting sources and coordinate reference system issues.

The paired-case design is important: an evaluation should test whether a system notices unreliable evidence, but also whether it avoids unnecessary refusal when the evidence is sufficient.

## What has been demonstrated

The prototype pipeline and automated checks ran successfully, and the submission package was prepared for the hackathon. This supports a limited claim about implementation and reproducibility of the initial evaluation scaffold.

## What has not yet been demonstrated

- No live frontier models have yet been evaluated.
- No model-performance result has been established.
- The synthetic cases do not establish generalisation to operational geospatial datasets.
- The prototype has not yet undergone independent expert validation or peer review.

## Proposed next research stages

1. **Independent review:** Invite geospatial and GIS specialists to examine the defect taxonomy, case validity and scoring rules.
2. **Benchmark expansion:** Increase the number and diversity of cases, including carefully selected real-world examples where licensing and provenance permit.
3. **Model evaluation:** Test a documented set of AI systems against the same cases and controls.
4. **Analysis:** Report defect detection, false alarms, appropriate abstention and unnecessary refusal separately.
5. **Publication:** Release methods, test cases, grader and limitations in a reproducible research report, subject to review and data permissions.

## Collaboration sought

The project would benefit from academic mentorship in geospatial methods, AI evaluation design, benchmark validity and statistical analysis. Potential support includes expert review, research collaboration, access to suitable datasets and computing resources.

## Research integrity

SIGMA-GEO is an early prototype, not a validated benchmark or evidence of frontier-model capability. All future claims should be tied to documented experiments, transparent scoring rules, data provenance and stated limitations.

## Project repository

https://github.com/mrzulqarnainnadabo/SIGMA-GEO
