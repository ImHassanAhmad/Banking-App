export const fileToImageSrc = async (file: File): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event?.target?.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as a data URL (base64-encoded string)
    reader.readAsDataURL(file);
  });
};
