import clsx from "clsx";

interface Props {
  className?: string;
}

export const Button = (props: Props) => {
  return (
    <div className={clsx(props.className)}>
      <button></button>
    </div>
  );
};
