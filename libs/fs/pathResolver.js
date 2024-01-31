function extractStrings(str) {
  const regex = /"([^"]*)"|'([^']*)'/g;
  const matches = str.match(regex);
  // console.log(matches, `matches`);

  return matches.map((match) => match.replace(/"/g, ''));
}

export default function pathResolver(path) {
  let isPathHasQuote = false;
  let coutesCount = 0;

  let firstPathHasQuotes = false;
  let secondPathHasQuotes = false;
  // const potentialQuoteIndex = path.indexOf(' ') + 1;

  const quotes = ["'", '`', '"'];

  for (let i = 0; i < path.length; i += 1) {
    const current = path[i];

    if (quotes.includes(current)) {
      isPathHasQuote = true;
      coutesCount += 1;
    }
  }

  if ((isPathHasQuote && coutesCount === 4) || !isPathHasQuote) {
    if (coutesCount === 4) {
      const [pathOne, pathTwo] = extractStrings(path);

      return [pathOne, pathTwo];
    } else {
      const args = path.split(' ');

      return [args[1], args[2]];
    }
  }

  if (isPathHasQuote && coutesCount === 2) {
    let firstQuotePathSpaceIndex = path.indexOf(' ');

    let firstPathQoutes = path[firstQuotePathSpaceIndex + 1];

    if (quotes.includes(firstPathQoutes)) {
      firstPathHasQuotes = true;
    }
  }

  if (firstPathHasQuotes) {
    const res = [];

    const arr = path.split(' ');

    const firstPath = [];
    const secondPath = [];

    let start = false;

    arr.forEach((item) => {
      if (quotes.includes(item) && !start) {
        
      }
    });

    return res;
  }

  console.log(isPathHasQuote, 'isPathHasQuote');
  console.log(coutesCount, 'coutesCount');

  /* if (typeof path === 'string') {
    switch (path[potentialQuoteIndex]) {
      case '`':
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
  } */

  /* if (isPathHasQuote) {
    const [pathOne, pathTwo] = extractStrings(path);

    return [pathOne, pathTwo];
  } else {
    const args = path.split(' ');

    return [args[1], args[2]];
  } */
}

/* export default function pathResolver(path) {
  let isPathHasQuote;
  const potentialQuoteIndex = path.indexOf(' ') + 1;



  if (typeof path === 'string') {
    switch (path[potentialQuoteIndex]) {
      case '`':
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

  if (isPathHasQuote) {
    const [pathOne, pathTwo] = extractStrings(path);

    return [pathOne, pathTwo];
  } else {
    const args = path.split(' ');

    return [args[1], args[2]];
  }
} */

// console.log(pathResolver(`rn asd/asdasd.txt "asdf/asde 123/asd ds.txt"`));

console.log(pathResolver(`rn "asd/asd asd.txt" "asdf/asde 123/asd ds.txt"`));

console.log(pathResolver(`rn asdasd/asd.txt asdasdasd/asdasdasd/123.txt`));
