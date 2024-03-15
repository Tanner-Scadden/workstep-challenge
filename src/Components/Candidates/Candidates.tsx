import { Grid } from "@mui/material";
import { CandidatesSearchProvider } from "./stores/CandidatesSearchStore";
import {
  CandidateFilterInput,
  CandidatesStepFilters,
} from "./CandidatesFilters";
import { CandidatesTable } from "./CandidatesTable";

export const Candidates = () => {
  return (
    <CandidatesSearchProvider>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <CandidatesStepFilters />
        </Grid>
        <Grid item xs={12} md={8} container spacing={2}>
          <CandidateFilterInput />
          <CandidatesTable />
        </Grid>
      </Grid>
    </CandidatesSearchProvider>
  );
};
