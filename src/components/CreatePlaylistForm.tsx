import { Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useEffectEvent } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import ControlledAutocomplete from "@/components/_common/ControlledAutocomplete";
import SelectWrapper from "@/components/_common/SelectWrapper";
import useIsMobile from "@/hooks/useIsMobile";
import { createRandomizedPlaylist } from "@/lib/playlistManagement";
import { createStyleGroup } from "@/lib/styling/styling";
import { PrivacyStatus } from "@/lib/types/gapiTypes";
import {
  DEFAULT_PLAYLIST_TITLE,
  DEFAULT_PRIVACY_LEVEL,
  DEFAULT_VIDEO_COUNT,
  MAX_VIDEO_COUNT,
  MIN_VIDEO_COUNT,
} from "@/lib/utils/playlistUtils";
import { useInitializationStateStore } from "@/store/useInitializationStateStore";
import { useOverlayMessageStore } from "@/store/useOverlayMessageStore";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { FormData, useUserPreferencesStore } from "@/store/useUserPreferencesStore";

import NumberField from "./_common/NumberField";

const FORM_GAP = 2;

const styles = createStyleGroup({
  title: {
    marginBottom: 8,
  },
  form: (theme) => ({
    gap: FORM_GAP,
    [theme.breakpoints.up("sm")]: {
      width: 600,
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  }),
  twoInputContainer: {
    gap: FORM_GAP,
    "& > *": {
      flexBasis: "50%",
    },
  },
  excludePlaylistPopper: {
    marginBottom: 2,
  },
  submitButton: {
    alignSelf: "center",
  },
});

const CreatePlaylistForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    subscribe,
    setValue,
    setValues,
  } = useForm<FormData>({ mode: "onChange" });

  const { formData, setFormData } = useUserPreferencesStore();
  const isDatabaseInitialized = useInitializationStateStore((state) => state.isDatabaseInitialized);

  const [
    arePlaylistsRetrieved,
    arePlaylistItemsRetrieved,
    getPlaylistNames,
    filterForExistingPlaylists,
  ] = usePlaylistDataStore(
    useShallow((state) => [
      state.arePlaylistsRetrieved,
      state.arePlaylistItemsRetrieved,
      state.getPlaylistNames,
      state.filterForExistingPlaylists,
    ]),
  );

  const { setOverlayTitle, setOverlayMessage } = useOverlayMessageStore(
    useShallow((state) => ({
      setOverlayTitle: state.setOverlayTitle,
      setOverlayMessage: state.setOverlayMessage,
    })),
  );

  const isMobile = useIsMobile();

  const loadSavedUserPreferences = useEffectEvent(() => {
    setValues(formData);
  });

  useEffect(() => {
    if (isDatabaseInitialized) {
      loadSavedUserPreferences();
    }
  }, [isDatabaseInitialized]);

  useEffect(() => {
    const unsubscribe = subscribe({
      formState: { values: true },
      callback: (data) => setFormData(data.values),
    });
    return () => unsubscribe();
  }, [subscribe, setFormData]);

  const filterOutNonexistentPlaylistNames = useEffectEvent(() => {
    setValue(
      "excludedPlaylistNames",
      filterForExistingPlaylists(formData.excludedPlaylistNames ?? []),
    );
  });

  useEffect(() => {
    if (arePlaylistsRetrieved) {
      filterOutNonexistentPlaylistNames();
    }
  }, [arePlaylistsRetrieved]);

  const submitForm = (formData: FormData) => {
    setOverlayTitle("Creating playlist...");
    createRandomizedPlaylist({
      ...formData,
      setMessageCallback: setOverlayMessage,
    });
  };

  return (
    <>
      <Typography variant="h2" sx={styles.title}>
        Create a playlist!
      </Typography>

      <Stack component={"form"} onSubmit={handleSubmit(submitForm)} sx={styles.form}>
        <TextField
          {...register("playlistTitle", { required: true })}
          defaultValue={DEFAULT_PLAYLIST_TITLE}
          label="Playlist name"
          error={!!errors.playlistTitle}
          required
        />

        <Stack sx={styles.twoInputContainer} direction={isMobile ? "column" : "row"}>
          <NumberField
            {...register("numPlaylistItems", { required: true })}
            onValueChange={(value) => setValue("numPlaylistItems", value ?? DEFAULT_VIDEO_COUNT)}
            label={`Number of videos (${MIN_VIDEO_COUNT}-${MAX_VIDEO_COUNT})`}
            value={formData.numPlaylistItems ?? DEFAULT_VIDEO_COUNT}
            min={MIN_VIDEO_COUNT}
            max={MAX_VIDEO_COUNT}
            error={!!errors.numPlaylistItems}
            required
          />

          <SelectWrapper
            {...register("privacyStatus")}
            values={Object.values(PrivacyStatus)}
            defaultValue={DEFAULT_PRIVACY_LEVEL}
          />
        </Stack>
        <ControlledAutocomplete
          name="excludedPlaylistNames"
          control={control}
          defaultValue={[]}
          multiple
          disableCloseOnSelect
          options={arePlaylistsRetrieved ? getPlaylistNames() : []}
          noOptionsText={arePlaylistsRetrieved ? undefined : "Loading playlists..."}
          renderInput={(params) => <TextField {...params} label="Playlists to exclude" />}
          slotProps={{ paper: { sx: styles.excludePlaylistPopper } }}
        />
        <Button type="submit" sx={styles.submitButton} disabled={!arePlaylistItemsRetrieved}>
          Create Playlist
        </Button>
      </Stack>
    </>
  );
};

export default CreatePlaylistForm;
