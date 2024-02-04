import * as nodePath from "path";

function extractStrings(str) {
  const regex = /"([^"]*)"|'([^']*)'|`([^`]*)`/g;
  const matches = str.match(regex);

  return matches.map((match) => match.replace(/["'`]/g, ""));
}

function singleQuotePath(path) {
  const quotes = ["'", "`", '"'];

  let firstPathHasQuotes = false;

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

    return [quotesPath, basicPath]
      .filter((el) => el !== "")
      .map((path) => {
        if (!nodePath.isAbsolute(path)) {
          const convertToAbsolutePath = nodePath.join(process.cwd(), path);

          return convertToAbsolutePath;
        }

        return path;
      });
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
      path.length - 1,
    );
    const basicPath = path.slice(
      firstSpaceIndex + 1,
      secondPathFirstQouteIndex - 1,
    );

    return [basicPath, quotesPath].map((path) => {
      if (!nodePath.isAbsolute(path)) {
        const convertToAbsolutePath = nodePath.join(process.cwd(), path);

        return convertToAbsolutePath;
      }

      return path;
    });
  }
}

export default function pathResolver(path) {
  try {
    try {
      let isPathHasQuote = false;
      let coutesCount = 0;

      const quotes = ["'", "`", '"'];

      for (let i = 0; i < path.length; i += 1) {
        const current = path[i];

        if (quotes.includes(current)) {
          isPathHasQuote = true;
          coutesCount += 1;
        }
      }

      if (!isPathHasQuote && path.split(" ").length === 2) {
        const pathFirstIndex = path.indexOf(" ") + 1;

        const singlePath = path.slice(pathFirstIndex);

        if (nodePath.isAbsolute(singlePath)) {
          return [singlePath];
        } else {
          const convertToAbsolutePath = nodePath.join(
            process.cwd(),
            singlePath,
          );

          return [convertToAbsolutePath];
        }
      }

      if ((isPathHasQuote && coutesCount === 4) || !isPathHasQuote) {
        if (coutesCount === 4) {
          const [pathOne, pathTwo] = extractStrings(path);

          return [pathOne, pathTwo].map((path) => {
            if (!nodePath.isAbsolute(path)) {
              const convertToAbsolutePath = nodePath.join(process.cwd(), path);

              return convertToAbsolutePath;
            }

            return path;
          });
        } else {
          const args = path.split(" ");

          return [args[1], args[2]].map((path) => {
            if (nodePath.isAbsolute(path)) {
              const convertToAbsolutePath = nodePath.join(process.cwd(), path);

              return convertToAbsolutePath;
            }

            return path;
          });
        }
      }

      if (isPathHasQuote && coutesCount === 2) {
        return singleQuotePath(path);
      }
    } catch (error) {
      throw new Error("\nInvalid input");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
