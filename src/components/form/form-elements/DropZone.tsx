"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { UseFormReturn, FieldValues } from "react-hook-form";
interface DropzoneProps {
  form: UseFormReturn<FieldValues>;
}

const DropzoneComponent: React.FC<DropzoneProps> = ({ form }) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = (acceptedFiles: File[]) => {
    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);
    form.setValue("Files", updatedFiles, { shouldValidate: true });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase() || "";
  };
  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    form.setValue("Files", newFiles, { shouldValidate: true });
  };

  useEffect(() => {
    form.register("Files", { required: false });
  }, [form]);

  const iconMap: { [key: string]: string } = {
    pdf: "/images/task/pdf.svg",
    doc: "/images/task/doc.svg",
    docx: "/images/task/docx.svg",
    xls: "/images/task/xls.svg",
    xlsx: "/images/task/xlsx.svg",
    jpg: "/images/task/jpg.svg",
    jpeg: "/images/task/jpg.svg",
    png: "/images/task/png.svg",
    gif: "/images/task/gif.svg",
    txt: "/images/task/txt.svg",
    zip: "/images/task/zip.svg",
    default: "/images/task/default.svg",
  };
  return (
    <ComponentCard title="Archivos">
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <div
          {...getRootProps()}
          className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
        ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }
      `}
          id="demo-upload"
        >
          {/* Hidden Input */}
          <input {...getInputProps()} />

          <div className="dz-message flex flex-col items-center m-0!">
            {/* Icon Container */}
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <svg
                  className="fill-current"
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                  />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
              {isDragActive
                ? "Suelta tus archivos aquí"
                : "Arrastra y suelta tus archivos aquí"}
            </h4>

            <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              Límite de 10 archivos con un peso máximo de 15Mb
            </span>

            <span className="font-medium underline text-theme-sm text-brand-500">
              Buscar archivos
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2">
          {files.length > 0 &&
            files.map((f, index) => {
              const ext = getFileExtension(f.name);
              const iconSrc = iconMap[ext] || iconMap["default"];
              return (
                <div
                  key={f.name + new Date()}
                  className="relative hover:border-gray-300 dark:hover:border-white/[0.05] flex w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-5 dark:border-gray-800 dark:bg-white/5 sm:w-auto"
                >
                  <div className="w-full h-10 max-w-10">
                    <Image
                      src={iconSrc}
                      width={40}
                      height={40}
                      className="w-full"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {f.name}
                    </p>
                    <span className="flex items-center gap-1.5">
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {ext.toUpperCase()}
                      </span>
                      <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 text-theme-xs dark:text-gray-400 underline"
                      >
                        Eliminar
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </ComponentCard>
  );
};

export default DropzoneComponent;
