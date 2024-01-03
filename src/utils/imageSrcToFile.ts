export const imageSrcToFile = (
  imageSrc: string,
  fileName: string = 'image.jpg',
  fileType: string = 'image/jpeg'
): File => {
  const byteCharacters = atob(imageSrc?.split(',')[1]);
  const byteArray = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  return new File([new Blob([byteArray])], fileName, { type: fileType });
};
