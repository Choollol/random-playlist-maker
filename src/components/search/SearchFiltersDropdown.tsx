import { Tune } from "@mui/icons-material";
import { Box, Checkbox, Select } from "@mui/material";
import { ComponentProps } from "react";

import { createStyleGroup } from "@/lib/styling/styling";
import { SearchFilters, UpdateSearchFilter } from "@/lib/types/searchTypes";
import { getActiveSearchFilterCount } from "@/lib/utils/searchUtils";

const styles = createStyleGroup({
  icon: {
    marginRight: 1,
  },
  checkboxRow: {
    marginLeft: 1,
    marginRight: 2,
  },
});

interface Props {
  searchFilters: SearchFilters;
  updateSearchFilter: UpdateSearchFilter;
}

// Select needs at least 1 value to call renderValue
const DUMMY_VALUE = [1];

export const SearchFiltersDropdown = ({ searchFilters, updateSearchFilter }: Props) => {
  const handleExcludedPlaylistsChange: ComponentProps<typeof Checkbox>["onChange"] = (event) => {
    updateSearchFilter({ type: "doUseExcludedPlaylists", value: event.target.checked });
  };
  const handleMatchExactChange: ComponentProps<typeof Checkbox>["onChange"] = (event) => {
    updateSearchFilter({ type: "matchExact", value: event.target.checked });
  };

  return (
    <Select
      startAdornment={<Tune sx={styles.icon} />}
      renderValue={() => {
        const activeFilters = getActiveSearchFilterCount(searchFilters);
        return `${activeFilters} active filter${activeFilters === 1 ? "" : "s"}`;
      }}
      multiple
      value={DUMMY_VALUE}
    >
      <Box sx={styles.checkboxRow}>
        <Checkbox
          onChange={handleExcludedPlaylistsChange}
          checked={searchFilters.doUseExcludedPlaylists}
        />
        Filter excluded playlists
      </Box>
      <Box sx={styles.checkboxRow}>
        <Checkbox onChange={handleMatchExactChange} checked={searchFilters.matchExact} />
        Only show exact matches
      </Box>
    </Select>
  );
};
