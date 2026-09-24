import { Save } from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";

import { useIsSignedIn } from "@/hooks/useIsSignedIn";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useUserPreferencesStore } from "@/store/useUserPreferencesStore";

export const SaveButton = () => {
  const isSignedIn = useIsSignedIn();

  const [isPending, saveUserPreferences] = useUserPreferencesStore(
    useShallow((state) => [state.isPending, state.saveUserPreferences]),
  );

  const isDatabaseInitialized = useInitializationStateStore((state) => state.isDatabaseInitialized);

  const disabled = !isSignedIn || isPending || !isDatabaseInitialized;

  let tooltip: ReactNode;
  if (!isSignedIn) {
    tooltip = "Sign in to save your preferences";
  } else if (isPending) {
    tooltip = "Your preferences are pending...";
  } else if (!isDatabaseInitialized) {
    tooltip = "Something went wrong while connecting to your preferences";
  } else {
    tooltip = "Your preferences will be saved automatically";
  }

  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton onClick={saveUserPreferences} disabled={disabled}>
          {isPending ? <CircularProgress color="inherit" size={24} /> : <Save />}
        </IconButton>
      </span>
    </Tooltip>
  );
};
