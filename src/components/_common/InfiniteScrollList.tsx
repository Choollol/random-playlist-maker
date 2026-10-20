import { List, Typography } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { createStyleGroup } from "@/lib/styling/styling";

const styles = createStyleGroup({
  list: {
    textAlign: "center",
  },
});

interface Props<T> {
  items: T[];
  showMoreCount: number;
  renderItem: (item: T) => ReactNode;
  sortItems?: (a: T, b: T) => number;
}

export function InfiniteScrollList<T>({ items, showMoreCount, renderItem, sortItems }: Props<T>) {
  const [itemsShown, setItemsShown] = useState(showMoreCount);

  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setItemsShown(showMoreCount);
    setPrevItems(items);
  }

  const showMoreItems = () => {
    setItemsShown(itemsShown + showMoreCount);
  };

  const itemsToRender = useMemo(() => {
    let result = items.slice(0, itemsShown);
    if (sortItems) {
      result = result.sort(sortItems);
    }
    return result;
  }, [items, itemsShown, sortItems]);

  return (
    <List
      sx={styles.list}
      component={InfiniteScroll}
      dataLength={itemsShown}
      next={showMoreItems}
      hasMore={itemsShown < items.length}
      loader={<Typography>Loading...</Typography>}
      endMessage={items.length > 0 ? <Typography>All results shown</Typography> : null}
    >
      {itemsToRender.map(renderItem)}
    </List>
  );
}
