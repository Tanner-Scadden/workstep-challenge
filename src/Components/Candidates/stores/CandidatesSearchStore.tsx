import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { CandidateSchema } from "../constants/candidateSchemas";
import { useSearch } from "../../../hooks/useSearch";
import * as v from "valibot";
import { CandidateStep } from "../../../gql/graphql";

export type CandidatesSearchStore = {
  step: CandidateStep | null;
  filter: string | null;
};

export type CandidatesSearchUtils = {
  setStep: (step: CandidateStep | null) => void;
  setFilter(filter: string | null): void;
};

export type CandidatesSearchContext = [
  CandidatesSearchStore,
  CandidatesSearchUtils
];

export const candidatesSearchContext =
  createContext<CandidatesSearchContext | null>(null);

export const useCandidatesSearchStore = () => {
  const store = useContext(candidatesSearchContext);

  if (!store) {
    throw new Error(
      "useCandidatesSearchStore must be used within a CandidatesSearchProvider"
    );
  }

  return store;
};

type CandidatesSearchProviderProps = {
  children: ReactNode;
};

// This shouldn't really be needed in this case because it can all be done through the URL query. But an example of how we could organize the data through context.
// This is also very unperformant since everything under it gets rerendered on any change, instead of the specific listeners that we want. Should use a better state management library for this if needing more than just the URL query.
export const CandidatesSearchProvider = ({
  children,
}: CandidatesSearchProviderProps) => {
  const [search, setSearch] = useSearch();

  const [state, setState] = useState<CandidatesSearchStore>({
    step: (search.get("step") as CandidateStep) || null,
    filter: "",
  });

  useEffect(() => {
    // Resync the state with the URL query so it can be sharable and bookmarkable.
    const searchStep = search.get("step");
    if (!searchStep) {
      return;
    }

    const res = v.safeParse(CandidateSchema.entries.step, searchStep);
    const updatedState = {
      step: res.success ? res.output : null,
      filter: search.get("filter") || null,
    };

    setState(updatedState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const utils: CandidatesSearchUtils = {
    setStep(step) {
      setState((prev) => ({
        ...prev,
        step,
      }));

      setSearch({ step });
    },
    setFilter(filter) {
      setState((prev) => ({
        ...prev,
        filter,
      }));

      setSearch({ filter });
    },
  };

  return (
    <candidatesSearchContext.Provider
      value={[state, utils] satisfies CandidatesSearchContext}
    >
      {children}
    </candidatesSearchContext.Provider>
  );
};
