import fs from "fs";
import { IUser } from "../interfaces";

export default async function writeDataToFile(
  filename: string,
  content: IUser[]
) {
  try {
    await fs.promises.writeFile(filename, JSON.stringify(content), "utf8");
  } catch (error) {
    console.log(error);
  }
}
