import { Box } from "@mui/material";
import { Candidates } from "./Components/Candidates/Candidates";

// Normally you'd have a router here, but for this example we're just rendering the Candidates component
export function App() {
  return (
    <Box p={3}>
      <Candidates />
    </Box>
  );
}
