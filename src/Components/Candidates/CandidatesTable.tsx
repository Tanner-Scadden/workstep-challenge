import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCandidates } from "./resources/getCandidates";
import {
  Grid,
  Link,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { useCandidatesSearchStore } from "./stores/CandidatesSearchStore";
import { Candidate } from "./constants/candidateSchemas";
import {
  CANDIDATE_STEP_OPTIONS,
  CandidateStep,
} from "./constants/candidateConstants";
import {
  UpdateCandidateOptions,
  updateCandidate,
} from "./resources/updateCandidates";

const RowLoadingSkeleton = () => {
  return (
    <Grid
      container
      item
      role="row"
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: theme.spacing(1),
      })}
      alignItems="center"
    >
      {" "}
      <Skeleton height={50} width="100%" />
    </Grid>
  );
};

type CandidateRowProps = {
  candidate: Candidate;
  handleUpdate: (options: UpdateCandidateOptions) => void;
  mutating: boolean;
};

const CandidateRow = ({
  candidate,
  handleUpdate,
  mutating,
}: CandidateRowProps) => {
  return (
    <Grid
      container
      item
      role="row"
      key={candidate.id}
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: theme.spacing(1),
      })}
      alignItems="center"
    >
      <Grid item role="cell" xs={4}>
        <Typography
          component={Link}
          noWrap
          href={`/candidates/${candidate.id}`}
          display="block"
        >
          {candidate.name}
        </Typography>
      </Grid>
      <Grid item role="cell" xs={4}>
        <Typography>
          {new Date(candidate.time_interview).toLocaleDateString([], {
            weekday: "short",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Grid>
      <Grid item role="cell" xs={4}>
        <Select
          fullWidth
          onChange={(e) =>
            handleUpdate({
              id: candidate.id,
              payload: { ...candidate, step: e.target.value as CandidateStep },
            })
          }
          value={candidate.step || ""}
          displayEmpty
          size="small"
          disabled={mutating}
          renderValue={(selected) => {
            if (!selected) {
              return <em>Choose Step...</em>;
            }

            return selected;
          }}
        >
          <MenuItem disabled value="">
            <em>Choose Step</em>
          </MenuItem>
          {CANDIDATE_STEP_OPTIONS.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

const CandidatesBody = () => {
  const [store] = useCandidatesSearchStore();

  // Normally this would be making a call to the API to handle sorting/filters/pagination on the server. But for this example, we're just doing it in the client.
  const { data, isLoading, error } = useQuery({
    queryKey: ["candidates"],
    queryFn: getCandidates,
    select(data) {
      let clonedData = structuredClone(data);

      if (store.filter) {
        clonedData = clonedData.filter((candidate) =>
          candidate.name.toLowerCase().includes(store.filter!.toLowerCase())
        );
      }

      if (store.step) {
        clonedData = clonedData.filter(
          (candidate) => candidate.step === store.step
        );
      }

      return clonedData;
    },
  });

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (options: UpdateCandidateOptions) => {
      const data = await updateCandidate(options);
      return data;
    },
    onSuccess(_data, variables) {
      queryClient.setQueryData(["candidates"], (oldData: Candidate[]) => {
        return oldData.map((candidate) => {
          if (candidate.id === variables.id) {
            return variables.payload;
          }

          return candidate;
        });
      });
    },
  });

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  if (isLoading || !data) {
    return (
      <Grid item container spacing={1} flexDirection="column" role="rowgroup">
        <RowLoadingSkeleton />
        <RowLoadingSkeleton />
        <RowLoadingSkeleton />
        <RowLoadingSkeleton />
        <RowLoadingSkeleton />
      </Grid>
    );
  }

  return (
    <Grid item container spacing={1} flexDirection="column" role="rowgroup">
      {data.map((candidate) => (
        <CandidateRow
          key={candidate.id + candidate.name}
          candidate={candidate}
          handleUpdate={mutate.mutate}
          mutating={mutate.isPending}
        />
      ))}
    </Grid>
  );
};

export const CandidatesTable = () => {
  return (
    <Grid item container spacing={1}>
      <Grid
        item
        container
        role="row"
        spacing={1}
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Grid item xs={4} role="columnheader">
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={4} role="columnheader">
          <Typography>Date Interviewed</Typography>
        </Grid>
      </Grid>
      <CandidatesBody />
    </Grid>
  );
};
