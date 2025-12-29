import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface FormData {
  ignorePlaylistIdsText: string;
}

const CreatePlaylistForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const submitForm = (formData: FormData) => {
    console.log(formData.ignorePlaylistIdsText);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <TextField {...register("ignorePlaylistIdsText")} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreatePlaylistForm;
