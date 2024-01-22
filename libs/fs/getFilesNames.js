import * as fsPromises from 'node:fs/promises';

export default async function (currentPathTwo) {
  const result = [];

  const data = await fsPromises.readdir(currentPathTwo, {
    withFileTypes: true,
  });

  for (let file of data) {
    if (file.isFile()) {
      result.push({ Name: file.name, Type: 'file' });
    } else if (file.isDirectory()) {
      result.push({ Name: file.name, Type: 'directory' });
    }
  }

  return result;
}
