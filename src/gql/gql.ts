/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query SearchCandidates($step: CandidateStep, $name: String) {\n    searchCandidates(step: $step, name: $name) {\n      candidates {\n        ...CandidatesSelection_Fragment\n      }\n      success\n      errors\n    }\n  }\n": types.SearchCandidatesDocument,
    "\n  mutation UpdateCandidate($id: Int!, $update: CandidatePatch!) {\n    updateCandidate(id: $id, update: $update) {\n      candidates {\n        ...CandidatesSelection_Fragment\n      }\n      success\n      errors\n    }\n  }\n": types.UpdateCandidateDocument,
    "\n  fragment CandidatesSelection_Fragment on Candidate {\n    step\n    id\n    email\n    name\n    phone\n    profile_url\n    time_interview\n  }\n": types.CandidatesSelection_FragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchCandidates($step: CandidateStep, $name: String) {\n    searchCandidates(step: $step, name: $name) {\n      candidates {\n        ...CandidatesSelection_Fragment\n      }\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  query SearchCandidates($step: CandidateStep, $name: String) {\n    searchCandidates(step: $step, name: $name) {\n      candidates {\n        ...CandidatesSelection_Fragment\n      }\n      success\n      errors\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCandidate($id: Int!, $update: CandidatePatch!) {\n    updateCandidate(id: $id, update: $update) {\n      candidates {\n        ...CandidatesSelection_Fragment\n      }\n      success\n      errors\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCandidate($id: Int!, $update: CandidatePatch!) {\n    updateCandidate(id: $id, update: $update) {\n      candidates {\n        ...CandidatesSelection_Fragment\n      }\n      success\n      errors\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CandidatesSelection_Fragment on Candidate {\n    step\n    id\n    email\n    name\n    phone\n    profile_url\n    time_interview\n  }\n"): (typeof documents)["\n  fragment CandidatesSelection_Fragment on Candidate {\n    step\n    id\n    email\n    name\n    phone\n    profile_url\n    time_interview\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;