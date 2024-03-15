import * as v from "valibot";
import { CandidateSchema } from "../constants/candidateSchemas";

export const getCandidates = async () => {
  const res = await fetch(
    "https://my-json-server.typicode.com/workstep/react-challenge-data/candidates"
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      "message" in data && typeof data.message === "string"
        ? data.message
        : "Failed to fetch candidates"
    );
  }

  // Make it feel more like a real API call
  await new Promise((res) => setTimeout(res, 500));

  try {
    return v.parse(v.array(CandidateSchema), data);
  } catch (e) {
    if (e instanceof v.ValiError) {
      console.error(`Parsing Issues:`, e.issues);
    }

    throw new Error("Server error. Please try again later.");
  }
};
