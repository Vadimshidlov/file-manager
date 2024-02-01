/* export default function pathResolver(path) {
  console.log(path, `path`);

  const pathsList = [];
  let isPathHasQuote;
  const potentialQuoteIndex = path.indexOf(" ") + 1;
  console.log(potentialQuoteIndex, `potentialQuoteIndex\n5`);

  if (typeof path === "string") {
    switch (path[potentialQuoteIndex]) {
      case "`":
        isPathHasQuote = true;

        break;
      case "'":
        isPathHasQuote = true;

        break;
      case '"':
        isPathHasQuote = true;

        break;

      default:
        isPathHasQuote = false;

        break;
    }
  }

  console.log(isPathHasQuote, `isPathHasQuote\n`);

  if (isPathHasQuote) {
    const args = path.split(" ");
    console.log(args, `args`);

    const firstPath = args[1].slice(1, args[1].length - 2);
    const secondPath = args[2].slice(1, args[1].length - 2);

    pathsList.push(firstPath, secondPath);
  } else {
    const args = path.split(" ");

    pathsList.push(args[1], args[2]);
  }

  return pathsList;
}

console.log(pathResolver(`rn "asd/asd asd.txt" "asdf/asde 123/asd ds.txt"`)); */

function extractStrings(str) {
  const regex = /"([^"]*)"|'([^']*)'/g;
  const matches = str.match(regex);
  console.log(matches, `matches`);

  return matches.map((match) => match.replace(/"/g, ""));
}

console.log(extractStrings(`rn "asd/asd asd.txt" "asdf/asde 123/asd ds.txt"`));
