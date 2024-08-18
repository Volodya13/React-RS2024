export const handleImageUpload = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject('Failed to read file');
      }
    };
    reader.readAsDataURL(file);
  });
};
