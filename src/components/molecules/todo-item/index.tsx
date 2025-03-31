"use client";

import { TodoList } from "@/types/todo-list/type";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
  todo: TodoList;
  isDone: boolean;
  onToggle: (id: number, currentStatus: boolean) => void;
}

export const TodoItem = (props: Props) => {
  return (
    <li
      className={clsx(
        "flex items-center space-x-4 px-4 py-2 border-2 rounded-full",
        props.isDone && "bg-violet-100",
        props.className
      )}
    >
      <button
        onClick={() => props.onToggle(props.todo.id, props.isDone)}
        className={clsx(
          "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer",
          props.isDone
            ? "bg-violet-600"
            : "border-2 border-slate-900 bg-yellow-50"
        )}
      >
        {props.isDone && (
          <Image
            src={"/icon/check/check-bold.svg"}
            alt="check"
            width={24}
            height={24}
          />
        )}
      </button>
      <Link href={`/items/${props.todo.id}`}>
        <span
          className={clsx(
            "text-base text-slate-800 hover:underline",
            props.isDone && "line-through"
          )}
        >
          {props.todo.name}
        </span>
      </Link>
    </li>
  );
};
