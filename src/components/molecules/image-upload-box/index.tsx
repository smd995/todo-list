import clsx from "clsx";
import Image from "next/image";

interface Props {
  imgUrl: string;
  onImageChange: (file: File) => void;
  className?: string;
}

export const ImageUploadBox = (props: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) props.onImageChange(file);
  };

  return (
    <div
      className={clsx(
        "relative md:max-w-[384px] h-[312px] sm:w-full border-dashed border border-slate-300 bg-slate-50 rounded-3xl flex items-center justify-center",
        props.className
      )}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <label
        htmlFor="file-input"
        className="relative w-full h-full cursor-pointer flex items-center justify-center"
      >
        {props.imgUrl ? (
          <Image
            src={props.imgUrl}
            alt="uploaded"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            className="object-cover rounded-3xl"
          />
        ) : (
          <Image
            src="/icon/image-placeholder/img.svg"
            alt="image-placeholder"
            width={64}
            height={64}
          />
        )}

        <div
          className={clsx(
            "absolute bottom-4 right-4 flex items-center justify-center rounded-full w-[64px] h-[64px]",
            props.imgUrl
              ? "border-2 border-slate-900 bg-slate-900/50"
              : "bg-slate-200"
          )}
        >
          {props.imgUrl ? (
            <Image
              src={"/icon/edit/edit.svg"}
              alt="imageActivated"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src="/icon/plus/plus-slate-500.svg"
              alt="createButton"
              width={18}
              height={18}
            />
          )}
        </div>
      </label>
    </div>
  );
};
