import { theme } from "@/lib/styling/defaultStyling";
import { SxProps } from "@mui/material";

export type StyleProps = SxProps<typeof theme>;

interface Styles {
  [key: string]: StyleProps;
}

/**
 * A layer of abstraction around creating styles.
 *
 * ```typescript
 *
 *   const styles = createStyleGroup({
 *     someComponent: {
 *       someStyleProperty: "someValue",
 *     },
 *   });
 *
 * ```
 *
 * @param styles An object that contains all the custom styles for a specific component.
 * @returns The given object but with autocomplete for properties.
 */
export function createStyleGroup<const T extends Styles>(styles: T) {
  return styles;
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
  overrideStyles: StyleProps,
) {
  return { ...baseStyles, ...overrideStyles } as StyleProps;
}
