import { List } from "@mui/material";
import { ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props<T> {
  items: T[];
  showMoreCount: number;
  renderItem: (item: T) => ReactNode;
}

export function InfiniteScrollList<T>({ items, showMoreCount, renderItem }: Props<T>) {
  const [itemsShown, setItemsShown] = useState(showMoreCount);

  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setItemsShown(showMoreCount);
    setPrevItems(items);
  }

  const showMoreItems = () => {
    setItemsShown(itemsShown + showMoreCount);
  };

  return (
    <List
      component={InfiniteScroll}
      dataLength={itemsShown}
      next={showMoreItems}
      hasMore={itemsShown < items.length}
      loader={null}
    >
      {items.slice(0, itemsShown).map(renderItem)}
    </List>
  );
}
