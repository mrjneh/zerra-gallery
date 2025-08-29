import { cloneElement, type InputHTMLAttributes } from "react";
import type { ReactElement } from "react";

type props = {
  children: ReactElement<InputHTMLAttributes<HTMLInputElement>>;
  images: { file: File; url: string }[];
  setMainImage: React.Dispatch<
    React.SetStateAction<
      | {
          file: File;
          url: string;
        }
      | undefined
    >
  >;
  mainImage:
    | {
        file: File;
        url: string;
      }
    | undefined;
  setImages: React.Dispatch<
    React.SetStateAction<
      {
        file: File;
        url: string;
      }[]
    >
  >;
};

export default function UploadImg({
  children,
  images,
  setImages,
  mainImage,
  setMainImage,
}: props) {
  // const [images, setImages] = useState<{ file: File; url: string }[]>([]);

  function onAddFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).map((file) => {
      return { file: file, url: URL.createObjectURL(file) };
    });

    setImages((images) => [...images, ...files]);

    setMainImage(files[0]);
  }

  return (
    <>
      <div className="object-cover h-[16rem] w-[16rem] ">
        {mainImage !== undefined ? (
          <img src={mainImage.url} className="h-full w-full rounded-lg" />
        ) : (
          <div className="flex justify-center items-center p-9">
            <p>No image selected</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 content-center items-center gap-3 ">
        {/* <img src={mainImage} /> */}
        {images &&
          images.map((img, i) => {
            return (
              <img
                src={img.url}
                key={i}
                onClick={() => setMainImage(img)}
                className={`${
                  img === mainImage && "border border-[#201815]"
                } h-[4.4rem] w-[4.4rem] flex items-center justify-center rounded-lg cursor-pointer object-cover shadow-2xs`}
              />
            );
          })}
        {images.length < 4 ? (
          <label className="h-[4.4rem] w-[4.4rem] flex items-center justify-center border border-dashed rounded-lg cursor-pointer text-gray-400">
            +
            {/* <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => onAddFile(e)}
            /> */}
            {cloneElement<InputHTMLAttributes<HTMLInputElement>>(children, {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onAddFile(e),
            })}
          </label>
        ) : null}
      </div>
    </>
  );
}
