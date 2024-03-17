import {
  UpdateCandidateDocument,
  UpdateCandidateMutationVariables,
} from "../../../gql/graphql";
import * as v from "valibot";
import request from "graphql-request";
import { APP_ENV } from "../constants/appEnv";
import { DocumentType } from "../../../gql";
import { CandidateSchema } from "../constants/candidateSchemas";

export const updateCandidate = async (
  variables: UpdateCandidateMutationVariables
) => {
  // Simulate a failure
  if (variables.id === 2) {
    throw new Error(`Failed to update candidate "${variables.update.name}"`);
  }

  const res = await request<DocumentType<typeof UpdateCandidateDocument>>(
    APP_ENV.API_GRAPHQL_URL,
    UpdateCandidateDocument,
    variables
  );

  if (!res.updateCandidate.success || res.updateCandidate.errors?.length) {
    const error =
      res.updateCandidate.errors?.[0] || "Failed to fetch candidates";
    throw new Error(error);
  }

  // Make it feel more like a real API call
  await new Promise((res) => setTimeout(res, 500));

  const [candidate] = res.updateCandidate.candidates as v.Output<
    typeof CandidateSchema
  >[];

  return candidate;
};
