export function makeUpperCaseTitle(objectName: string) {
  const arr = objectName.split("");
  arr[0] = arr[0].toUpperCase();
  return arr.join("");
}
