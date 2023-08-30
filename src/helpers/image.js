export const convertBase64ToFile = async (dataurl, filename) => {
  return fetch(dataurl)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((buf) => {
      return new File([buf], filename, { type: 'png' });
    });
};

export const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
