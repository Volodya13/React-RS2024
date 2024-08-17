export const handleImageUpload = (file: File): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject('Error reading file');
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
