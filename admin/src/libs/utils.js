export const NOOP = () => {};

export const FileRead = (file) => {
  const reader = new FileReader();
  return new Promise((res) => {
    reader.onload = () => {
      return res(reader.result);
    };
    reader.readAsDataURL(file);
  });
};
