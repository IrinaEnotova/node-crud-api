import fs from "fs";

export default async function writeDataToFile(filename, content) {
  try {
    await fs.promises.writeFile(filename, JSON.stringify(content), "utf8");
  } catch (error) {
    console.log(error);
  }
}
