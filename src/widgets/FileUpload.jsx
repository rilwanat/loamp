import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const FileUpload = ({ label, file, setFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]); // store first file
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
      },
      maxSize: 5 * 1024 * 1024, // 5 MB
    });

  return (
    <div className="flex flex-col py-2">
      <label className="text-black">{label + ': '}<span className="text-red-500 font-bold">*</span></label>

      <div
        {...getRootProps()}
        className={`mt-2 p-4 border-2 border-dashed rounded-lg cursor-pointer bg-softTheme
          ${isDragActive ? "border-theme bg-gray-50" : "border-gray-400"}`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p className="text-sm text-gray-700">
            ✅ {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </p>
        ) : (
          <p className="text-sm text-black text-center">
            Drag & drop file here, or <span className="text-theme font-semibold">choose file</span>
            <br />
            <span className="text-xs text-gray-400">
              Supported formats: PDF, JPG, PNG — Max 2MB
            </span>
          </p>
        )}
      </div>

      {fileRejections.length > 0 && (
        <p className="text-red-500 text-sm mt-1">
          ❌ File must be PDF, JPG, or PNG under 5MB
        </p>
      )}
    </div>
  );
};

export default FileUpload;
