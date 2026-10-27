import { Tune } from "@mui/icons-material";
import { Box, Checkbox, Select } from "@mui/material";
import { ComponentProps } from "react";

import { createStyleGroup } from "@/lib/styling/styling";
import { SearchFilters, UpdateFilter } from "@/lib/types/searchTypes";
import { getActiveFilterCount } from "@/lib/utils/searchUtils";

const styles = createStyleGroup({
  icon: {
    marginRight: 1,
  },
  useExcludedPlaylists: {
    marginLeft: 1,
    marginRight: 2,
  },
});

interface Props {
  filters: SearchFilters;
  updateFilter: UpdateFilter;
}

// Select needs at least 1 value to call renderValue
const DUMMY_VALUE = [1];

export const SearchFiltersDropdown = ({ filters, updateFilter }: Props) => {
  const handleExcludedPlaylistsChange: ComponentProps<typeof Checkbox>["onChange"] = (event) => {
    updateFilter({ type: "doUseExcludedPlaylists", value: event.target.checked });
  };

  return (
    <Select
      startAdornment={<Tune sx={styles.icon} />}
      renderValue={() => {
        const activeFilters = getActiveFilterCount(filters);
        return `${activeFilters} active filter${activeFilters === 1 ? "" : "s"}`;
      }}
      multiple
      value={DUMMY_VALUE}
    >
      <Box sx={styles.useExcludedPlaylists}>
        <Checkbox
          onChange={handleExcludedPlaylistsChange}
          checked={filters.doUseExcludedPlaylists}
        />
        Filter excluded playlists
      </Box>
    </Select>
  );
};
