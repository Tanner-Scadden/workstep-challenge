import { Candidate, CandidateSchema } from "../constants/candidateSchemas";
import * as v from "valibot";

export type UpdateCandidateOptions = {
  id: number;
  payload: Candidate;
};

export const updateCandidate = async (options: UpdateCandidateOptions) => {
  const res = await fetch(
    `https://my-json-server.typicode.com/workstep/react-challenge-data/candidates/${options.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(options.payload),
    }
  );

  const data = await res.json();

  // Make it feel more like a real API call
  await new Promise((res) => setTimeout(res, 500));

  if (!res.ok) {
    throw new Error(
      "message" in data && typeof data.message === "string"
        ? data.message
        : "Failed to update candidate!"
    );
  }

  try {
    return v.parse(CandidateSchema, data);
  } catch (e) {
    if (e instanceof v.ValiError) {
      console.error(`Parsing Issues:`, e.issues);
    }

    throw new Error("Server error. Please try again later.");
  }
};
