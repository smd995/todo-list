import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
}

export const TodoMain = (props: Props) => {
  return (
    <div className={clsx("p-8 bg-gray-50 min-h-screen", props.className)}>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          className="flex-1 h-14 px-4 border-2 rounded-full border-slate-900 bg-slate-100 outline-none shadow-[3px_3px_0_0_#0f172a] text-base"
        />
        <button className="border-2 px-4 bg-slate-200 border-slate-900 rounded-full text-base outline-none shadow-[3px_3px_0_0_#0f172a] font-bold">
          + 추가하기
        </button>
      </div>
      <div className="flex gap-8 mt-6">
        <div className="flex-1">
          <div className="inline-block bg-lime-300 text-green-700 px-6 py-1 hs-font text-lg rounded-full">
            TO DO
          </div>
          <ul className="space-y-3 mt-4">
            <li className="flex items-center space-x-4 px-4 py-2 border-2 rounded-full">
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-yellow-50"></div>
              <span className="text-base text-slate-800">비타민 챙겨먹기</span>
            </li>
            <li className="flex items-center space-x-4 px-4 py-2 border-2 rounded-full">
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-yellow-50"></div>
              <span className="text-base text-slate-800">맥주 마시기</span>
            </li>
            <li className="flex items-center space-x-4 px-4 py-2 border-2 rounded-full">
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-yellow-50"></div>
              <span className="text-base text-slate-800">운동하기</span>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <div className="inline-block bg-green-700 text-amber-300 px-6 py-1 hs-font text-lg rounded-full">
            DONE
          </div>
          <ul className="space-y-3 mt-4">
            <li className="flex items-center space-x-4 px-4 py-2 border-2 rounded-full bg-violet-100">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                <Image
                  src={"/icon/check_bold.svg"}
                  alt="check"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-base text-slate-800 line-through">
                은행 다녀오기
              </span>
            </li>
            <li className="flex items-center space-x-4 px-4 py-2 border-2 rounded-full bg-violet-100">
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                <Image
                  src={"/icon/check_bold.svg"}
                  alt="check"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-base text-slate-800 line-through">
                비타민 챙겨먹기
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
