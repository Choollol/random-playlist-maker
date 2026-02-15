import {
  createRandomizedPlaylist,
  CreateRandomizedPlaylistOptions,
  getPlaylistNames,
} from "@/lib/playlistManagement";
import { Box, Button, Stack, TextField } from "@mui/material";
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

type FormData = CreateRandomizedPlaylistOptions;

const styles = createStyleGroup({
  form: (theme) => ({
    width: "50%",
    [theme.breakpoints.only("md")]: {
      width: "60%",
    },
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  }),
  twoInputContainer: {
    "& > *": {
      flexBasis: "50%",
    },
  },
  submitButton: {
    alignSelf: "center",
    width: 80,
  },
});

const CreatePlaylistForm = () => {
  const { register, handleSubmit, control } = useForm<FormData>();

  const arePlaylistsRetrieved = usePlaylistDataStore(
    (state) => state.arePlaylistsRetrieved,
  );

  const { setOverlayTitle, setOverlayMessage } = useOverlayMessageStore();

  const submitForm = (formData: FormData) => {
    console.log(formData);

    setOverlayTitle("Creating playlist...");
    createRandomizedPlaylist({
      ...formData,
      setMessageCallback: setOverlayMessage,
    });
  };

  return (
    <Stack
      component={(props) => <form {...props} />}
      onSubmit={handleSubmit(submitForm)}
      gap={2}
      sx={styles.form}
    >
      <TextField
        {...register("playlistTitle", { required: true })}
        defaultValue={DEFAULT_PLAYLIST_TITLE}
      />
      <Stack sx={styles.twoInputContainer} direction="row">
        <NumberField
          {...register("numPlaylistItems", { required: true })}
          id="outlined-required"
          label={`Enter a number between ${MIN_VIDEO_COUNT} and ${MAX_VIDEO_COUNT}`}
          defaultValue={DEFAULT_VIDEO_COUNT}
          min={MIN_VIDEO_COUNT}
          max={MAX_VIDEO_COUNT}
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
        options={arePlaylistsRetrieved ? getPlaylistNames() : []}
        renderInput={(params) => (
          <TextField {...params} label="Playlists to exclude" />
        )}
      />
      <Button type="submit" sx={styles.submitButton}>
        Submit
      </Button>
    </Stack>
  );
};

export default CreatePlaylistForm;
