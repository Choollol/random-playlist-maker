import { ReactNode } from "react";

export function joinElements(elements: ReactNode[], separator: ReactNode) {
  return elements.reduce((prev, curr) => [prev, separator, curr]);
}
