"use client";

import { ImageUploadBox } from "@/components/molecules/image-upload-box";
import { MemoEditor } from "@/components/molecules/memo-editor";
import { useTodoDetail } from "@/hooks/useTodoDetail";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
  id: number;
}

export const TodoDetail = ({ className, id }: Props) => {
  const {
    name,
    memo,
    imgUrl,
    isCompleted,
    isLoading,
    error,
    setName,
    setMemo,
    onImageClick,
    onEditClick,
    onDeleteClick,
    onToggleCompletedClick,
    todo,
  } = useTodoDetail(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  if (isLoading) return <div className="text-center py-10">불러오는 중...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!todo)
    return <div className="text-center py-10">할 일을 찾을 수 없어요.</div>;

  return (
    <div
      className={clsx("max-w-5xl mx-auto px-8 py-4 min-h-screen", className)}
    >
      <div
        className={clsx(
          "w-full px-4 py-2 rounded-2xl border-2 flex items-center justify-center gap-4",
          isCompleted ? "bg-violet-100" : "bg-white"
        )}
      >
        <button
          onClick={onToggleCompletedClick}
          className={clsx(
            "w-8 h-8 rounded-full border-2 cursor-pointer flex items-center justify-center",
            isCompleted ? "bg-violet-600" : "bg-yellow-50 border-slate-900"
          )}
        >
          {isCompleted ? (
            <Image
              src={"/icon//check/check-bold.svg"}
              alt="check"
              width={24}
              height={24}
            />
          ) : (
            ""
          )}
        </button>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          className="text-xl font-bold underline decoration-[0.5px] underline-offset-4 text-slate-900 outline-none"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <ImageUploadBox imgUrl={imgUrl} onImageChange={onImageClick} />

        <MemoEditor memo={memo} onChange={setMemo} />
      </div>

      <div className="flex justify-center md:justify-end gap-4 mt-4">
        <button
          onClick={onEditClick}
          disabled={!imgUrl || !memo.trim()}
          className={clsx(
            "flex items-center px-9 py-3 rounded-full border-2 border-slate-900 outline-none shadow-[3px_3px_0_0_#0f172a] gap-2",
            !imgUrl || !memo.trim()
              ? "bg-slate-200 cursor-not-allowed"
              : "bg-lime-300"
          )}
        >
          <Image
            src="/icon/check/check.svg"
            alt="check"
            width={16}
            height={16}
          />
          <span
            className={clsx(
              "text-slate-900 font-bold",
              !imgUrl || !memo.trim() ? "" : "text-slate-900"
            )}
          >
            수정하기
          </span>
        </button>
        <button
          onClick={onDeleteClick}
          className="flex items-center px-9 py-3 bg-rose-500 rounded-full border-2 border-slate-900 outline-none shadow-[3px_3px_0_0_#0f172a] gap-2"
        >
          <Image src="/icon/x/X.svg" alt="delete" width={16} height={16} />
          <span className="text-white font-bold">삭제하기</span>
        </button>
      </div>
    </div>
  );
};
