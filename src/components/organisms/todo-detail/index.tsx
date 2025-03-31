"use client";

import { api } from "@/effect/todo-api/todoApi";
import { Todo, TodoRequest } from "@/types/todo-list/type";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  id: number;
}

export const TodoDetail = ({ className, id }: Props) => {
  const router = useRouter();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsLoading(true);
        const data = await api.findOne(id);
        setTodo(data);
        setName(data.name);
        setMemo(data.memo ?? "");
        setImgUrl(data.imageUrl);
        setIsCompleted(data.isCompleted);
      } catch (err) {
        setError("할 일을 불러오는 데 실패했어요.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const onToggleCompletedClick = async () => {
    if (!todo) return;
    await api.isCompleted(todo.id, !isCompleted);
    setIsCompleted(!isCompleted);
  };

  const onImageClick = async (file: File) => {
    const { url } = await api.uploadImage(file);
    setImgUrl(url);
  };

  const onEditClick = async () => {
    if (!todo) return;
    const request: TodoRequest = { name, memo, imageUrl: imgUrl, isCompleted };
    console.log(request);
    await api.updateOne(todo.id, request);
    router.push("/");
  };

  const onDeleteClick = async () => {
    if (!todo) return;
    await api.deleteOne(todo.id);
    router.push("/");
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
          onChange={(e) => setName(e.target.value)}
          className="text-xl font-bold underline decoration-[0.5px] underline-offset-4 text-slate-900 outline-none"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="relative md:max-w-[384px] h-[312px] sm:w-full border-dashed border border-slate-300 bg-slate-50 rounded-3xl flex items-center justify-center">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageClick(file);
            }}
          />
          <label
            htmlFor="file-input"
            className="relative w-full h-full cursor-pointer flex items-center justify-center"
          >
            {imgUrl ? (
              <Image
                src={imgUrl}
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
                imgUrl
                  ? "border-2 border-slate-900 bg-slate-900/50"
                  : "bg-slate-200"
              )}
            >
              {imgUrl ? (
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

        <div className="relative h-[312px] sm:w-full rounded-3xl">
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
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="absolute w-full h-60 p-6 resize-none overflow-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] z-10 font-normal text-slate-800 outline-none custom-scroll"
          />
        </div>
      </div>

      <div className="flex justify-center md:justify-end gap-4 mt-4">
        <button
          onClick={onEditClick}
          className="flex items-center px-9 py-3 bg-slate-200 rounded-full border-2 border-slate-900 outline-none shadow-[3px_3px_0_0_#0f172a] gap-2"
        >
          <Image
            src="/icon/check/check.svg"
            alt="check"
            width={16}
            height={16}
          />
          <span className="text-slate-900 font-bold">수정하기</span>
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
