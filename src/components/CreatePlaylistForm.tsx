import {
  createRandomizedPlaylist,
  CreateRandomizedPlaylistOptions,
  retrievePlaylistData,
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
import { useEffect } from "react";
import { useGapiStateStore } from "@/store/useExternalScriptStore";

type FormData = CreateRandomizedPlaylistOptions;

const CreatePlaylistForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const isGapiLoaded = useGapiStateStore((state) => state.isGapiInitialized);

  const submitForm = (formData: FormData) => {
    console.log(formData);

    // createRandomizedPlaylist({
    //   playlistTitle: formData.playlistTitle,
    //   numPlaylistItems: formData.numPlaylistItems,
    //   privacyStatus: formData.privacyStatus,
    // });
  };

  useEffect(() => {
    if (isGapiLoaded) {
      retrievePlaylistData();
    }
  }, [isGapiLoaded]);

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
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreatePlaylistForm;
