import { useIsSignedIn } from "@/hooks/useIsSignedIn";
import { useUserPreferencesStore } from "@/store/useUserPreferencesStore";
import { Save } from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";

export const SaveButton = () => {
  const isSignedIn = useIsSignedIn();

  const [isPending, saveUserPreferences] = useUserPreferencesStore(
    useShallow((state) => [state.isPending, state.saveUserPreferences]),
  );

  let tooltip: ReactNode;
  if (!isSignedIn) {
    tooltip = "Sign in to save your preferences";
  } else if (isPending) {
    tooltip = "Your preferences are pending...";
  } else {
    tooltip = "Your preferences will be saved automatically";
  }

  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton
          onClick={saveUserPreferences}
          disabled={!isSignedIn || isPending}
        >
          {isPending ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            <Save />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};
