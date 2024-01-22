export default function filesSortCallback(a, b) {
  if (a.Type === b.Type) {
    return a.Name.localeCompare(b.Name);
  }

  return a.Type === 'directory' ? -1 : 1;
}
