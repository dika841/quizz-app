import { FC, ReactElement } from "react";

const Skeleton: FC = (): ReactElement => {
  return (
    <div className="w-full h-full">
      <div className="w-1/3 h-7 animate-pulse bg-gray-200 rounded-full"></div>
      <div className="w-1/5 h-6 animate-pulse bg-gray-200 rounded-full mt-8"></div>
      <div className="w-full h-5 animate-pulse bg-gray-200 rounded-full mt-6"></div>
      <div className="flex flex-col gap-y-2 mt-8">
        <div className="w-full h-8 animate-pulse bg-gray-200 rounded-md"></div>
        <div className="w-full h-8 animate-pulse bg-gray-200 rounded-md"></div>
        <div className="w-full h-8 animate-pulse bg-gray-200 rounded-md"></div>
        <div className="w-full h-8 animate-pulse bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default Skeleton;
