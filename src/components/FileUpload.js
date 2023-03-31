import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AiFillExclamationCircle } from "react-icons/ai";
import ModalImage from "react-modal-image";
import toast from "react-hot-toast";
import { VscFilePdf } from "react-icons/vsc";
import Button from "./Button";

const FileUpload = ({
  fileState,
  className = "",
  title = "",
  url = "",
  pdf = false,
}) => {
  const [file, setFile] = fileState;
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (file === null) return;
    if (file) {
      if (
        (pdf && file.type === "application/pdf") ||
        (!pdf &&
          (file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/png"))
      ) {
        setFileName(file.name);
      } else {
        pdf
          ? toast.error("Please upload a valid PDF file")
          : toast.error("Please upload a valid image file");
      }
    }
  }, [file]);

  useEffect(() => {
    console.log(`URL: ${url}`);
    setFileName(
      url && url.length > 0 ? (
        <div className="flex items-center space-x-2">
          {pdf ? (
            url
          ) : (
            <div>
              <ModalImage
                className="w-12 h-12 rounded-full"
                small={url}
                large={url}
                alt="Image URL"
              />
            </div>
          )}
        </div>
      ) : (
        "No file chosen"
      )
    );
  }, [url]);

  return (
    <div
      className={`${className} flex flex-col font-poppins items-start justify-center space-y-2 w-full overflow-x-hidden my-2`}
    >
      <div className="flex space-x-2 items-center w-full">
        <div
          className={` px-4 py-2 w-full rounded-lg bg-clip-padding bg-no-repeat  first-letter:transition ease-in-out m-0 focus:outline-none focus:border-cloud flex flex-row items-center justify-between space-x-2`}
        >
          <div className="w-full flex items-center space-x-6">
            <label className="bg-gray-700 text-white p-3 rounded-lg w-fit whitespace-nowrap shadow-lg">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  e.preventDefault();
                  setFile(e.target.files[0]);
                }}
              />
              <FiUpload />
            </label>
          </div>
          {fileName === "No file chosen" || !pdf ? (
            <p className="whitespace-pre-wrap text-slate-700 w-full">{fileName}</p>
          ) : (
            <Button
              text={<p className="text-sm">{fileName}</p>}
              handleClick={() =>
                url
                  ? window.open(url, "_blank")
                  : window.open(URL.createObjectURL(file), "_blank")
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
