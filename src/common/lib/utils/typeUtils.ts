export function isDefined(a: unknown): a is NonNullable<unknown> {
  return a !== null && a !== undefined;
}
