import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
}

export const Header = (props: Props) => {
  return (
    <div
      className={clsx(
        "w-full border-b border-slate-200 bg-white",
        props.className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center px-8 py-3">
        <Image
          src="/logo/Size=Large.svg"
          alt="Home"
          width={151}
          height={40}
          priority
          className="hidden md:block"
        />

        <Image
          src="/logo/Size=Small.svg"
          alt="Home"
          width={71}
          height={40}
          priority
          className="block md:hidden"
        />
      </div>
    </div>
  );
};
