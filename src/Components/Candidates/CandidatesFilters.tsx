import { Grid, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { CANDIDATE_STEP_OPTIONS } from "./constants/candidateConstants";
import { useDebounceCallback } from "@react-hook/debounce";
import { useCandidatesSearchStore } from "./stores/CandidatesSearchStore";
import { useSearch } from "../../hooks/useSearch";
import SearchIcon from "@mui/icons-material/Search";

export const CandidateFilterInput = () => {
  const [, { setFilter }] = useCandidatesSearchStore();
  const [search] = useSearch();

  const setDisplayFilter = useDebounceCallback(setFilter, 300);

  const updateFilter = (val: string) => {
    const updateValue = val === "" ? null : val;

    setDisplayFilter(updateValue);
  };

  return (
    <Grid item xs={12} md={6}>
      <TextField
        placeholder="Start typing to filter by name..."
        defaultValue={search.get("filter")}
        onChange={(e) => updateFilter(e.currentTarget.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export const CandidatesStepFilters = () => {
  const [store, { setStep }] = useCandidatesSearchStore();

  return (
    <Grid item xs={11} md={8}>
      <Tabs
        orientation="vertical"
        value={store.step}
        onChange={(_e, value) => setStep(value)}
      >
        <Tab label="All" value={null} />
        {CANDIDATE_STEP_OPTIONS.map((filter) => (
          <Tab key={filter} label={filter} value={filter} />
        ))}
      </Tabs>
    </Grid>
  );
};
