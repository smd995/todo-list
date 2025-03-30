"use client";

import { todoApi } from "@/effect/todo-api/todoApi";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
}

export const TodoDetail = (props: Props) => {
  const id = 5731;
  const isCompleted = true;

  const api = todoApi();

  const onToggleCompletedClick = async (id: number, currentStatus: boolean) => {
    await api.isCompleted(id, !currentStatus);
  };

  return (
    <div
      className={clsx(
        "max-w-5xl mx-auto px-8 py-4 min-h-screen",
        props.className
      )}
    >
      <div className="w-full px-4 py-2 rounded-2xl border-2 border-slate-900 flex items-center justify-center gap-4">
        <button
          onClick={() => onToggleCompletedClick(id, false)}
          className={clsx(
            "w-8 h-8 rounded-full border-2 border-slate-900 bg-yellow-50 cursor-pointer",
            isCompleted
              ? "bg-purple-200 text-purple-800"
              : "bg-white text-gray-800"
          )}
        ></button>
        <p className="text-xl font-bold underline decoration-[0.5px] underline-offset-4 text-slate-900">
          비타민 챙겨먹기
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="relative md:max-w-[384px] h-[312px] sm:w-full border-dashed border border-slate-300 bg-slate-50 rounded-3xl flex items-center justify-center">
          <Image
            src="/icon/image-placeholder/img.svg"
            alt="image-placeholder"
            width={64}
            height={64}
            className="opacity-50"
          />

          <button className="absolute bottom-4 right-4 flex items-center justify-center rounded-full bg-slate-200 w-[64px] h-[64px]">
            <Image
              src="/icon/plus/plus-slate-500.svg"
              alt="createButton"
              width={18}
              height={18}
            />
          </button>
        </div>
        <div className="relative h-[312px] sm:w-full rounded-3xl">
          <Image
            src={"/memo/memo.svg"}
            alt="memo-image"
            fill
            className="object-cover"
          />
          <p className="absolute top-3 left-1/2 -translate-x-1/2 z-10 font-extrabold text-amber-800">
            Memo
          </p>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-10 font-normal text-slate-800">
            오메가 3, 프로폴리스, 아연 챙겨먹기
          </p>
        </div>
      </div>
      <div className="flex justify-center md:justify-end gap-4 mt-4">
        <button className="flex items-center px-9 py-3 bg-slate-200 rounded-full border-2 border-slate-900 outline-none shadow-[3px_3px_0_0_#0f172a] gap-2">
          <Image
            src={"/icon/check/check.svg"}
            alt="check"
            width={16}
            height={16}
          />
          <span className="text-slate-900 font-bold">수정하기</span>
        </button>
        <button className="flex items-center px-9 py-3 bg-rose-500 rounded-full border-2 border-slate-900 outline-none shadow-[3px_3px_0_0_#0f172a] gap-2">
          <Image src={"/icon/x/X.svg"} alt="delete" width={16} height={16} />
          <span className="text-white font-bold">삭제하기</span>
        </button>
      </div>
    </div>
  );
};
