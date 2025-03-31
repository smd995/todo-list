"use client";
import { EmptyState } from "@/components/molecules/empty-state";
import { TodoItem } from "@/components/molecules/todo-item";
import { useTodoList } from "@/hooks/useTodoList";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
}

export const TodoMain = (props: Props) => {
  const {
    name,
    setName,
    isActive,
    todos,
    dones,
    onRegisterClick,
    onToggleCompletedClick,
  } = useTodoList();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div
      className={clsx(
        "max-w-7xl mx-auto px-8 py-4 min-h-screen",
        props.className
      )}
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={handleChange}
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
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isDone={false}
                  onToggle={onToggleCompletedClick}
                />
              ))
            ) : (
              <EmptyState
                type="todo"
                messages={["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"]}
              />
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
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isDone={true}
                  onToggle={onToggleCompletedClick}
                />
              ))
            ) : (
              <EmptyState
                type="done"
                messages={[
                  "아직 다 한 일이 없어요.",
                  "해야 할 일을 체크해보세요!",
                ]}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
