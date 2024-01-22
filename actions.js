import * as fsPromises from "node:fs/promises";
import path from "path";

export default class Actions {
  async ls(currentPath) {
    console.log(path, `path that i pass into ls`);

    try {
      const getFilesNames = async (currentPathTwo) => {
        const result = [];

        const data = await fsPromises.readdir(currentPathTwo, {
          withFileTypes: true,
        });

        for (let file of data) {
          if (file.isFile()) {
            result.push(file.name);
          }

          /* if (file.isFile()) {
            result.push(file.name);
          } else if (file.isDirectory()) {
            const nestedFiles = await getFilesNames(
              path.join(currentPathTwo, file.name)
            );

            result.push(...nestedFiles);
          } */
        }

        return result;
      };

      const finalData = await getFilesNames(currentPath);

      console.table(finalData);
    } catch (error) {
      throw Error("FS operation failed");
    }
  }
}
