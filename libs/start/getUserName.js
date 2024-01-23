export default function getUserName() {
  const startArgument = process.argv.slice(2);
  const startNameIndex = startArgument[0].indexOf("=");

  const userName = startArgument[0].slice(
    startNameIndex !== -1 ? startNameIndex + 1 : 0
  );

  return userName;
}
