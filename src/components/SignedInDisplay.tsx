import CreatePlaylistForm from "@/components/CreatePlaylistForm";
import RetrievePlaylists from "@/components/RetrievePlaylists";
import { createStyleGroup } from "@/lib/styling/styling";
import { Box } from "@mui/material";

const styles = createStyleGroup({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "80px 10px",
  },
});

const SignedInDisplay = () => {
  return (
    <Box sx={styles.container}>
      <RetrievePlaylists />
      <CreatePlaylistForm />
    </Box>
  );
};

export default SignedInDisplay;
