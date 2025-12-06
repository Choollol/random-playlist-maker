import { SxProps } from "@mui/material";

export type StyleProps = SxProps;

export interface Styles {
  [key: string]: StyleProps;
}

/**
 * Extends style props with overrides.
 *
 * ```typescript
 *
 *   const newStyles = extendStyles(styles.containerStyles, { width: isWide ? "100px" : "10px" });
 *
 * ```
 *
 * @param baseStyles Style with properties that may be overridden.
 * @param overrideStyles Style with additional properties that may override `baseStyles`'s properties.
 * @returns An object with the same structure as the input objects.
 */
export function extendStyles(
  baseStyles: StyleProps,
  overrideStyles: StyleProps
) {
  return { ...baseStyles, ...overrideStyles } as StyleProps;
}
