"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { queryAsync } from "./data";
import { revalidatePath } from "next/cache";
import { newVersionCheck } from "./utils";
import path from "path";
import { createWriteStream, existsSync, createReadStream, statSync } from "fs";

import fs from "fs";
import unzipper from "unzipper";
import AdmZip from "adm-zip";

export async function authenticate(prevState, formData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createCategory(formData) {
  const name = formData.get("category");
  const main = formData.get("main");
  const page = formData.get("page");
  const query = `INSERT INTO ${main} (name) VALUES (?)`;
  try {
    await queryAsync(query, [name]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  revalidatePath(`/dashboard/${page}/category`);
}

export async function updateCMS(formData) {
  const version = await newVersionCheck();
  const response = await fetch(`http://localhost:3004/zip/${version}`);
  const arrayBuffer = await response.arrayBuffer();
  const zipBuffer = Buffer.from(arrayBuffer);
  const tempExtractPath = path.join(process.cwd(), "temp_extracted");
  try {
    if (!existsSync(tempExtractPath)) {
      fs.promises.mkdir(tempExtractPath);
    }
    const zipFilePath = path.join(tempExtractPath, `${version}.zip`);
    await fs.promises.writeFile(zipFilePath, zipBuffer);
    const fileSize = statSync(zipFilePath).size;
    console.log(fileSize);

    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(tempExtractPath, true);

    const nextFolderPath = path.join(process.cwd(), ".next");
    await fs.promises.rmdir(nextFolderPath, { recursive: true }); // Remove the .next folder
    await fs.promises.rename(path.join(tempExtractPath), nextFolderPath);

    exec("npm run start", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting server: ${error}`);
      } else {
        console.log("Server restarted successfully");
      }
    });
  } catch (error) {
    console.error("Error updating CMS:", error);
    return { success: false, error: "Failed to update CMS" };
  }
}
