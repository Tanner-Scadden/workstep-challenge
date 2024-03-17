import * as v from "valibot";
import { CandidateSchema } from "../constants/candidateSchemas";
import request from "graphql-request";
import { APP_ENV } from "../constants/appEnv";
import { CandidatesSearchDocument } from "./candidateDefs";
import { DocumentType } from "../../../gql";
import { SearchCandidatesQueryVariables } from "../../../gql/graphql";

export const searchCandidates = async (
  variables: SearchCandidatesQueryVariables
) => {
  const res = await request<DocumentType<typeof CandidatesSearchDocument>>(
    APP_ENV.API_GRAPHQL_URL,
    CandidatesSearchDocument,
    variables
  );

  if (!res.searchCandidates.success || res.searchCandidates.errors?.length) {
    const error =
      res.searchCandidates.errors?.[0] || "Failed to fetch candidates";
    throw new Error(error);
  }

  await new Promise((res) => setTimeout(res, 500));

  return res.searchCandidates.candidates as v.Output<typeof CandidateSchema>[];
};
