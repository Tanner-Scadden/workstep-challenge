import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { searchCandidates } from "./resources/searchCandidates";
import {
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { useCandidatesSearchStore } from "./stores/CandidatesSearchStore";
import { Candidate } from "./constants/candidateSchemas";
import { CANDIDATE_STEP_OPTIONS } from "./constants/candidateOptions";
import { updateCandidate } from "./resources/updateCandidates";
import {
  CandidateStep,
  UpdateCandidateMutationVariables,
} from "../../gql/graphql";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Replay } from "@mui/icons-material";

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
  handleUpdate: (options: UpdateCandidateMutationVariables) => void;
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
              id: +candidate.id,
              update: {
                name: candidate.name,
                email: candidate.email,
                phone: candidate.phone,
                time_interview: candidate.time_interview,
                profile_url: candidate.profile_url,
                step: e.target.value as CandidateStep,
              },
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

  const { data } = useSuspenseQuery({
    queryKey: ["candidates", store.filter, store.step],
    queryFn: () =>
      searchCandidates({
        step: store.step,
        name: store.filter,
      }),
  });

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (options: UpdateCandidateMutationVariables) => {
      const data = await updateCandidate(options);
      return data;
    },
    onSuccess(data, variables) {
      const searchId = String(variables.id);
      queryClient.setQueryData(
        ["candidates", store.filter, store.step],
        (oldData: Candidate[]) => {
          return oldData.map((candidate) => {
            if (candidate.id === searchId) {
              return { ...data, id: candidate.id };
            }

            return candidate;
          });
        }
      );
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "candidates",
      });
    },
    onError(error) {
      console.error(error);
      throw error;
    },
    throwOnError: true,
  });

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
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error, resetErrorBoundary }) => (
              <Grid item container alignItems="center" gap={2}>
                <Grid item xs={8}>
                  <Typography variant="body1" color="error">
                    <b>Error</b>: {error.message}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    onClick={resetErrorBoundary}
                    startIcon={<Replay />}
                  >
                    Go Back
                  </Button>
                </Grid>
              </Grid>
            )}
          >
            <Suspense
              fallback={
                <>
                  <RowLoadingSkeleton />
                  <RowLoadingSkeleton />
                  <RowLoadingSkeleton />
                  <RowLoadingSkeleton />
                  <RowLoadingSkeleton />
                </>
              }
            >
              <CandidatesBody />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Grid>
  );
};
