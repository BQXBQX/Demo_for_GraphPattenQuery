export function isEqual<T>(arr1: Array<T>, arr2: Array<T>): boolean {
  return (
    arr1.length === arr2.length &&
    new Set(arr1).size === new Set(arr2).size &&
    Array.from(new Set<T>(arr1)).every((value) => arr2.includes(value))
  );
}
