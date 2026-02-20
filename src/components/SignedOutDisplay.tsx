import SignInButton from "@/components/SignInButton";
import { createStyleGroup } from "@/lib/styling/styling";
import { Box, Stack, Typography } from "@mui/material";

const styles = createStyleGroup({
  pageContainer: {
    alignItems: "center",
    textAlign: "center",
    margin: "max(40px, 10%) 20px 0px 20px",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 700,
    gap: 3,
  },
  title: {
    marginBottom: 3,
  },
  bodyText: {
    fontSize: "1.5em",
  },
});

const SignedOutDisplay = () => {
  return (
    <Stack sx={styles.pageContainer}>
      <Box sx={styles.contentContainer}>
        <Typography variant="h3" sx={styles.title}>
          Welcome to
          <br /> PickSome Playlist Maker!
        </Typography>
        <Typography sx={styles.bodyText}>
          With this website, you can create randomized playlists with videos
          chosen from your personal YouTube playlist library.
        </Typography>
        <Typography sx={styles.bodyText}>
          Sign in with Google to get started!
        </Typography>
        <SignInButton />
      </Box>
    </Stack>
  );
};

export default SignedOutDisplay;
