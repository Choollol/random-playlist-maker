import {
  createRandomizedPlaylist,
  CreateRandomizedPlaylistOptions,
  getPlaylistNames,
} from "@/lib/playlistManagement";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import NumberField from "./NumberField";
import {
  DEFAULT_PLAYLIST_TITLE,
  DEFAULT_PRIVACY_LEVEL,
  DEFAULT_VIDEO_COUNT,
  MAX_VIDEO_COUNT,
  MIN_VIDEO_COUNT,
} from "@/lib/utils/playlistUtils";
import { PrivacyStatus } from "@/lib/types/gapiTypes";
import SelectWrapper from "@/components/SelectWrapper";
import ControlledAutocomplete from "@/components/ControlledAutocomplete";
import { usePlaylistDataStore } from "@/store/usePlaylistDataStore";
import { useOverlayMessageStore } from "@/store/useOverlayMessageStore";
import { createStyleGroup } from "@/lib/styling/styling";
import useIsMobile from "@/hooks/useIsMobile";
import { useShallow } from "zustand/react/shallow";

type FormData = CreateRandomizedPlaylistOptions;

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
  } = useForm<FormData>({ mode: "onChange" });

  const arePlaylistsRetrieved = usePlaylistDataStore(
    (state) => state.arePlaylistsRetrieved,
  );

  const { setOverlayTitle, setOverlayMessage } = useOverlayMessageStore(
    useShallow((state) => ({
      setOverlayTitle: state.setOverlayTitle,
      setOverlayMessage: state.setOverlayMessage,
    })),
  );

  const isMobile = useIsMobile();

  const submitForm = (formData: FormData) => {
    console.log(formData);

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

      <Stack
        component={"form"}
        onSubmit={handleSubmit(submitForm)}
        sx={styles.form}
      >
        <TextField
          {...register("playlistTitle", { required: true })}
          defaultValue={DEFAULT_PLAYLIST_TITLE}
          label="Playlist name"
          error={!!errors.playlistTitle}
          required
        />

        <Stack
          sx={styles.twoInputContainer}
          direction={isMobile ? "column" : "row"}
        >
          <NumberField
            {...register("numPlaylistItems", { required: true })}
            label={`Number of videos (${MIN_VIDEO_COUNT}-${MAX_VIDEO_COUNT})`}
            defaultValue={DEFAULT_VIDEO_COUNT}
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
          renderInput={(params) => (
            <TextField {...params} label="Playlists to exclude" />
          )}
          slotProps={{ paper: { sx: styles.excludePlaylistPopper } }}
        />
        <Button type="submit" sx={styles.submitButton}>
          Create Playlist
        </Button>
      </Stack>
    </>
  );
};

export default CreatePlaylistForm;
