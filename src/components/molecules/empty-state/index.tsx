import clsx from "clsx";
import Image from "next/image";

interface Props {
  type: "todo" | "done";
  messages: string[];
  className?: string;
}

export const EmptyState = (props: Props) => {
  const imageSrcLarge =
    props.type === "todo"
      ? "/icon/empty/Type=Todo_Size=Large.svg"
      : "/icon/empty/Type=Done_Size=Large.svg";

  const imageSrcSmall =
    props.type === "todo"
      ? "/icon/empty/Type=todo_Size=Small.svg"
      : "/icon/empty/Type=Done_Size=Small.svg";

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center mt-6 text-center",
        props.className
      )}
    >
      <Image
        src={imageSrcLarge}
        alt={`${props.type}-list-empty-large`}
        width={240}
        height={240}
        priority
        className="hidden sm:block h-auto"
      />
      <Image
        src={imageSrcSmall}
        alt={`${props.type}-list-empty-small`}
        width={120}
        height={120}
        className="block sm:hidden h-auto"
      />
      {props.messages.map((msg, idx) => (
        <p key={idx} className="font-bold text-slate-400">
          {msg}
        </p>
      ))}
    </div>
  );
};
