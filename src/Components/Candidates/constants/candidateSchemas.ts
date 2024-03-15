import * as v from "valibot";
import { CANDIDATE_STEP } from "./candidateConstants";

export const CandidateSchema = v.object({
  id: v.number(),
  name: v.string(),
  email: v.string(),
  phone: v.string(),
  step: v.transform(v.string(), (value) => {
    if (!value) {
      return null;
    }

    try {
      return v.parse(v.enum_(CANDIDATE_STEP), value);
    } catch (e) {
      return null;
    }
  }),
  time_interview: v.string(),
  profile_url: v.string(),
});

export type Candidate = v.Output<typeof CandidateSchema>;
