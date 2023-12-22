import fs from "fs";
import path from "path";

export const imgToBase64 = (fileName: string): string => {
  try {
    // Adjust the file path without the 'public' folder
    const filePath = path.join(process.cwd(), "public", fileName);

    // Read the image file synchronously
    const imageData = fs.readFileSync(filePath);

    // Convert the image data to base64 encoding
    const base64Data = imageData.toString("base64");

    // Create the base64-encoded URI
    const base64Uri = `data:image/${path
      .extname(filePath)
      .substring(1)};base64,${base64Data}`;

    return base64Uri;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error converting image to base64:", error);
    return "";
  }
};
