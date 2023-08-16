/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, FocusEventHandler } from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import Tooltip from './Tooltip';

type PhotosUploaderProps = {
  images: File[];
  onImagesChange: (images: File[]) => void;
  error?: boolean | string | undefined;
  errorText?: boolean | string | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
};

const PhotosUploader = (props: PhotosUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    props.onImagesChange(selectedFiles);
  }, [selectedFiles]);

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (selectedFiles.length + newFiles.length > 10) {
        // toast({
        //   description: 'Maximum of 10 photos.',
        //   variant: 'destructive',
        // });
        return;
      }
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        if (file.size > 5 * 1024 * 1024) {
          // toast({
          //   description: 'File size exceeds maximum - 5MB.',
          //   variant: 'destructive',
          // });
          return;
        }
      }
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  }

  function handleDeleteClick(index: number) {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  }
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Photos</h3>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
        {selectedFiles.map((file, index) => (
          <div key={index} className="h-[100px] flex relative w-[100px]">
            <img
              src={URL.createObjectURL(file)}
              alt={`uploaded image ${index}`}
              className="rounded-lg min-w-[100px] max-w-[100px] h-[100px] object-cover"
            />
            <button
              data-tooltip-id="remove-photo"
              type="button"
              className="rounded-lg absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 hover:text-gray-500 transition-all duration-200 ease-in-out"
              onClick={() => handleDeleteClick(index)}
            >
              <BsTrash size={15} className="" />
            </button>
            <Tooltip id={'remove-photo'} content={'Remove'} />
          </div>
        ))}
        <div
          className={`bg-gray-50 w-[100px] border rounded-lg border-[#e6e4e4]  max:h-[100px] min-h-[100px]  flex flex-col items-center justify-center`}
        >
          <label
            className={`cursor-pointer flex-col bg-transparent text-brand-900 hover:text-brand_peach-900 text-xl rounded p-8 py-6 flex items-center justify-center transition-all duration-200 ease-in-out`}
          >
            <input
              type="file"
              className="w-full px-3 text-gray-700 bg-white border hidden"
              id="photos"
              name="photos"
              multiple
              onBlur={props.onBlur}
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileInputChange}
            />
            <MdOutlineAddToPhotos size={30} className="" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PhotosUploader;
