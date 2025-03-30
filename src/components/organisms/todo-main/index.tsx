"use client";
import { todoApi } from "@/effect/todo-api/todoApi";
import { TodoList } from "@/types/todo-list/type";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

export const TodoMain = (props: Props) => {
  const api = todoApi();
  const [name, setName] = useState("");
  const [list, setList] = useState<TodoList[]>([]);
  const isActive = name.trim() !== "";

  const onRegisterClick = async () => {
    if (!name.trim()) return;
    await api.registerOne(name);
    setName("");
    await fetchTodos();
  };

  const onToggleCompletedClick = async (id: number, currentStatus: boolean) => {
    await api.isCompleted(id, !currentStatus);
    await fetchTodos();
  };

  const fetchTodos = async () => {
    const updated = await api.findAll();
    setList(updated);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const todos = list.filter((todo) => !todo.isCompleted);
  const dones = list.filter((todo) => todo.isCompleted);

  return (
    <div className={clsx("px-8 py-4 min-h-screen", props.className)}>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-1 h-14 px-4 border-2 rounded-full border-slate-900 bg-slate-100 outline-none shadow-[3px_3px_0_0_#0f172a] text-base"
        />
        <button
          onClick={onRegisterClick}
          disabled={!isActive}
          className={clsx(
            "flex items-center gap-1 px-5 min-w-[64px] border-2 rounded-full text-base outline-none font-bold transition",
            "border-slate-900 shadow-[3px_3px_0_0_#0f172a]",
            {
              "bg-slate-200 text-black": !isActive,
              "bg-violet-600 text-white": isActive,
            }
          )}
        >
          <Image
            src={
              isActive
                ? "/icon/plus/plus-white.svg"
                : "/icon/plus/plus-slate-900.svg"
            }
            alt="createButton"
            width={16}
            height={16}
          />
          <span className="hidden sm:inline">추가하기</span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="flex-1">
          <div className="inline-block bg-lime-300 text-green-700 px-6 py-1 hs-font text-lg rounded-full">
            TO DO
          </div>
          <ul className="space-y-3 mt-4">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center space-x-4 px-4 py-2 border-2 rounded-full"
                >
                  <button
                    onClick={() => onToggleCompletedClick(todo.id, false)}
                    className="w-8 h-8 rounded-full border-2 border-slate-900 bg-yellow-50 cursor-pointer"
                  ></button>
                  <span className="text-base text-slate-800">{todo.name}</span>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mt-6">
                <Image
                  src="/icon/empty/Type=Todo_Size=Large.svg"
                  alt="todo-list-empty-large"
                  width={240}
                  height={240}
                  className="hidden sm:block h-auto"
                />
                <Image
                  src="/icon/empty/Type=Todo_Size=Small.svg"
                  alt="todo-list-empty-small"
                  width={120}
                  height={120}
                  className="block sm:hidden h-auto"
                />
                <p className="font-bold text-slate-400 mt-2">할 일이 없어요.</p>
                <p className="font-bold text-slate-400">
                  TODO를 새롭게 추가해주세요!
                </p>
              </div>
            )}
          </ul>
        </div>
        <div className="flex-1">
          <div className="inline-block bg-green-700 text-amber-300 px-6 py-1 hs-font text-lg rounded-full">
            DONE
          </div>
          <ul className="space-y-3 mt-4">
            {dones.length > 0 ? (
              dones.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center space-x-4 px-4 py-2 border-2 rounded-full bg-violet-100"
                >
                  <button
                    onClick={() => onToggleCompletedClick(todo.id, true)}
                    className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src={"/icon//check/check-bold.svg"}
                      alt="check"
                      width={24}
                      height={24}
                    />
                  </button>
                  <span className="text-base text-slate-800 line-through">
                    {todo.name}
                  </span>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mt-6">
                <Image
                  src="/icon/empty/Type=Done_Size=Large.svg"
                  alt="done-list-empty-large"
                  width={240}
                  height={240}
                  className="hidden sm:block mx-auto mt-6 h-auto"
                />
                <Image
                  src="/icon/empty/Type=Done_Size=Small.svg"
                  alt="done-list-empty-small"
                  width={120}
                  height={120}
                  className="block sm:hidden mx-auto mt-6 h-auto"
                />
                <p className="font-bold text-slate-400">
                  아직 다 한 일이 없어요.
                </p>
                <p className="font-bold text-slate-400">
                  해야 할 일을 체크해보세요!
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
