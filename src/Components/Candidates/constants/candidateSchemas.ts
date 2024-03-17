import * as v from "valibot";
import { CandidateStep } from "../../../gql/graphql";

// Graphql already handles most of this, so it's not really needed as much with the graphql. But it's still useful for the front end to have a schema to validate against sometimes.
export const CandidateSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  phone: v.string(),
  step: v.transform(v.string(), (value) => {
    if (!value) {
      return null;
    }

    try {
      return v.parse(v.enum_(CandidateStep), value);
    } catch (e) {
      return null;
    }
  }),
  time_interview: v.string(),
  profile_url: v.string(),
});

export type Candidate = v.Output<typeof CandidateSchema>;
