import clsx from "clsx";
import Image from "next/image";

interface Props {
  memo: string;
  onChange: (value: string) => void;
  className?: string;
}

export const MemoEditor = (props: Props) => {
  return (
    <div
      className={clsx(
        "relative h-[312px] sm:w-full rounded-3xl",
        props.className
      )}
    >
      <Image
        src="/memo/memo.svg"
        alt="memo-image"
        fill
        className="object-cover"
        priority
      />
      <p className="absolute top-3 left-1/2 -translate-x-1/2 z-10 font-extrabold text-amber-800">
        Memo
      </p>
      <textarea
        value={props.memo}
        onChange={(e) => props.onChange(e.target.value)}
        className="absolute w-full h-60 p-6 resize-none overflow-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] z-10 font-normal text-slate-800 outline-none custom-scroll"
      />
    </div>
  );
};
