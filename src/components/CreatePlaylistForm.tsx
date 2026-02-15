import {
  createRandomizedPlaylist,
  CreateRandomizedPlaylistOptions,
  getPlaylistNames,
} from "@/lib/playlistManagement";
import { Button, TextField } from "@mui/material";
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

type FormData = CreateRandomizedPlaylistOptions;

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
    <form onSubmit={handleSubmit(submitForm)}>
      <TextField
        {...register("playlistTitle", { required: true })}
        defaultValue={DEFAULT_PLAYLIST_TITLE}
      />
      <NumberField
        {...register("numPlaylistItems", { required: true })}
        defaultValue={DEFAULT_VIDEO_COUNT}
        min={MIN_VIDEO_COUNT}
        max={MAX_VIDEO_COUNT}
      />
      <SelectWrapper
        {...register("privacyStatus")}
        values={Object.values(PrivacyStatus)}
        defaultValue={DEFAULT_PRIVACY_LEVEL}
      />
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
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreatePlaylistForm;
