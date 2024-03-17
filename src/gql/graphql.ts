/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Candidate = {
  __typename?: 'Candidate';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  profile_url: Scalars['String']['output'];
  step?: Maybe<CandidateStep>;
  time_interview: Scalars['String']['output'];
};

export type CandidatePatch = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  profile_url: Scalars['String']['input'];
  step?: InputMaybe<CandidateStep>;
  time_interview: Scalars['String']['input'];
};

export type CandidateResult = {
  __typename?: 'CandidateResult';
  candidates?: Maybe<Array<Maybe<Candidate>>>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  success: Scalars['Boolean']['output'];
};

export enum CandidateStep {
  BackgroundCheck = 'BACKGROUND_CHECK',
  DrugTest = 'DRUG_TEST',
  Paperwork = 'PAPERWORK'
}

export type Mutation = {
  __typename?: 'Mutation';
  updateCandidate: CandidateResult;
};


export type MutationUpdateCandidateArgs = {
  id: Scalars['Int']['input'];
  update: CandidatePatch;
};

export type Query = {
  __typename?: 'Query';
  searchCandidates: CandidateResult;
};


export type QuerySearchCandidatesArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  step?: InputMaybe<CandidateStep>;
};

export type SearchCandidatesQueryVariables = Exact<{
  step?: InputMaybe<CandidateStep>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchCandidatesQuery = { __typename?: 'Query', searchCandidates: { __typename?: 'CandidateResult', success: boolean, errors?: Array<string | null> | null, candidates?: Array<(
      { __typename?: 'Candidate' }
      & { ' $fragmentRefs'?: { 'CandidatesSelection_FragmentFragment': CandidatesSelection_FragmentFragment } }
    ) | null> | null } };

export type UpdateCandidateMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  update: CandidatePatch;
}>;


export type UpdateCandidateMutation = { __typename?: 'Mutation', updateCandidate: { __typename?: 'CandidateResult', success: boolean, errors?: Array<string | null> | null, candidates?: Array<(
      { __typename?: 'Candidate' }
      & { ' $fragmentRefs'?: { 'CandidatesSelection_FragmentFragment': CandidatesSelection_FragmentFragment } }
    ) | null> | null } };

export type CandidatesSelection_FragmentFragment = { __typename?: 'Candidate', step?: CandidateStep | null, id: string, email: string, name: string, phone: string, profile_url: string, time_interview: string } & { ' $fragmentName'?: 'CandidatesSelection_FragmentFragment' };

export const CandidatesSelection_FragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CandidatesSelection_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Candidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"step"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profile_url"}},{"kind":"Field","name":{"kind":"Name","value":"time_interview"}}]}}]} as unknown as DocumentNode<CandidatesSelection_FragmentFragment, unknown>;
export const SearchCandidatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchCandidates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"step"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CandidateStep"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchCandidates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"step"},"value":{"kind":"Variable","name":{"kind":"Name","value":"step"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CandidatesSelection_Fragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CandidatesSelection_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Candidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"step"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profile_url"}},{"kind":"Field","name":{"kind":"Name","value":"time_interview"}}]}}]} as unknown as DocumentNode<SearchCandidatesQuery, SearchCandidatesQueryVariables>;
export const UpdateCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CandidatePatch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CandidatesSelection_Fragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CandidatesSelection_Fragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Candidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"step"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"profile_url"}},{"kind":"Field","name":{"kind":"Name","value":"time_interview"}}]}}]} as unknown as DocumentNode<UpdateCandidateMutation, UpdateCandidateMutationVariables>;