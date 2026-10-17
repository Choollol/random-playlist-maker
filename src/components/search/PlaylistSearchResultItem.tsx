import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

import { YoutubeVideoLink } from "@/components/YoutubeVideoLink";
import { createStyleGroup } from "@/lib/styling/styling";
import { FlattenedPlaylistItem } from "@/lib/types/searchTypes";

const styles = createStyleGroup({
  rowButtonText: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  },
});

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
        <ListItemText slotProps={{ primary: { sx: styles.rowButtonText } }}>
          {item.videoTitle}
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List sx={{ paddingLeft: 2 }}>
          <ListItem>Video title: {item.videoTitle}</ListItem>
          <ListItem>Uploaded by: {item.channelTitle}</ListItem>
          <ListItem>Included in: {item.playlistTitles.join(", ")}</ListItem>
          <ListItem>
            <YoutubeVideoLink videoId={item.videoId} />
          </ListItem>
        </List>
      </Collapse>
      <Divider />
    </>
  );
};
