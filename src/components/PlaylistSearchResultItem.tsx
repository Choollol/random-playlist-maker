import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

import { FlattenedPlaylistItem } from "@/lib/types/searchTypes";

interface Props {
  item: FlattenedPlaylistItem;
}

export const PlaylistSearchResultItem = ({ item }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText>{item.videoTitle}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List sx={{ paddingLeft: 2 }}>
          <ListItem>Video title: {item.videoTitle}</ListItem>
          <ListItem>Uploaded by: {item.channelTitle}</ListItem>
          <ListItem>Included in: {item.playlistTitles.join(", ")}</ListItem>
        </List>
      </Collapse>
      <Divider />
    </>
  );
};
