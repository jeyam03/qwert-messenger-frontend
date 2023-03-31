import imageCompression from "browser-image-compression";
import axios from "axios";

async function handleImageUpload(img) {
  const imageFile = img;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  return imageCompression(imageFile, options);
}

export const fetchUploadFile = async (file) => {
  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    await handleImageUpload(file).then((res) => {
      file = new File([res], res.name, { type: res.type });
    });
  }
  let data = new FormData();
  data.append("file", file);
  return axios.post("https://kriya-convenor.psgtech.ac.in/api/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};