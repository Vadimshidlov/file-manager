function extractStrings(str) {
  const regex = /"([^"]*)"|'([^']*)'/g;
  const matches = str.match(regex);
  // console.log(matches, `matches`);

  return matches.map((match) => match.replace(/"/g, ""));
}

export default function pathResolver(path) {
  console.log(path, "path");
  let isPathHasQuote = false;
  let coutesCount = 0;

  // let firstPathHasQuotes = false;
  // let secondPathHasQuotes = false;
  // const potentialQuoteIndex = path.indexOf(' ') + 1;

  const quotes = ["'", "`", '"'];

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
      const args = path.split(" ");

      return [args[1], args[2]];
    }
  }

  if (isPathHasQuote && coutesCount === 2) {
    let firstPathHasQuotes = false;
    let secondPathHasQuotes = false;

    let firstQuotePathSpaceIndex = path.indexOf(" ");

    let firstPathQoutes = path[firstQuotePathSpaceIndex + 1];

    if (quotes.includes(firstPathQoutes)) {
      firstPathHasQuotes = true;
    }

    if (firstPathHasQuotes) {
      const firstQuoteIndex = firstQuotePathSpaceIndex + 1;
      let lastQuoteIndex;

      for (let i = path.length - 1; i >= 0; i -= 1) {
        const currentSymbol = path[i];

        if (quotes.includes(currentSymbol)) {
          lastQuoteIndex = i;

          break;
        }
      }

      const quotesPath = path.slice(firstQuoteIndex + 1, lastQuoteIndex);
      const basicPath = path.slice(lastQuoteIndex + 2, path.length);

      return [quotesPath, basicPath];
    } else {
      let secondPathFirstQouteIndex;
      const firstSpaceIndex = path.indexOf(" ");

      for (let i = 0; i < path.length; i += 1) {
        const currentSymbol = path[i];

        if (quotes.includes(currentSymbol)) {
          secondPathFirstQouteIndex = i;

          break;
        }
      }

      const quotesPath = path.slice(
        secondPathFirstQouteIndex + 1,
        path.length - 1
      );
      const basicPath = path.slice(
        firstSpaceIndex + 1,
        secondPathFirstQouteIndex - 2
      );

      return [basicPath, quotesPath];
    }
  }

  /* if (firstPathHasQuotes) {
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
  } */

  // console.log(isPathHasQuote, "isPathHasQuote");
  // console.log(coutesCount, "coutesCount");

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

console.log(pathResolver(`rn "asd/ asdasd.txt" asdf/asde123/asd ds.txt`));

console.log(pathResolver(`rn asd/asdasd.txt "asdf/asde 123/asd ds.txt"`));

// console.log(pathResolver(`rn "asd/asd asd.txt" "asdf/asde 123/asd ds.txt"`));

// console.log(pathResolver(`rn asdasd/asd.txt asdasdasd/asdasdasd/123.txt`));
