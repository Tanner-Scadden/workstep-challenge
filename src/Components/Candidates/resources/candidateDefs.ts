import { graphql } from "../../../gql";

export const CandidatesSearchDocument = graphql(`
  query SearchCandidates($step: CandidateStep, $name: String) {
    searchCandidates(step: $step, name: $name) {
      candidates {
        ...CandidatesSelection_Fragment
      }
      success
      errors
    }
  }
`);

export const CandidatesUpdateDocument = graphql(`
  mutation UpdateCandidate($id: Int!, $update: CandidatePatch!) {
    updateCandidate(id: $id, update: $update) {
      candidates {
        ...CandidatesSelection_Fragment
      }
      success
      errors
    }
  }
`);

export const CandidatesSelectionFragment = graphql(`
  fragment CandidatesSelection_Fragment on Candidate {
    step
    id
    email
    name
    phone
    profile_url
    time_interview
  }
`);
