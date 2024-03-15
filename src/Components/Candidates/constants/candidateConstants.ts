// Bad file name, sorry..

// This would probably come from the server normally
export const CANDIDATE_STEP = {
  DRUG_TEST: "Drug Test",
  BACKGROUND_CHECK: "Background Check",
  PAPERWORK: "Paperwork",
} as const;

export const CANDIDATE_STEP_OPTIONS = Object.values(CANDIDATE_STEP);

export type CandidateStep =
  (typeof CANDIDATE_STEP)[keyof typeof CANDIDATE_STEP];
