import { Button } from "@mui/material";
import { FormEvent } from "react";

const CreatePlaylistForm = () => {
  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    console.log("submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreatePlaylistForm;
