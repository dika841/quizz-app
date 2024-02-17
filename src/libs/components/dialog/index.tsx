import { FC, PropsWithChildren, ReactElement } from "react";

export const Dialog: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <section className="fixed justify-center items-center w-full top-0 left-0 right-0 bottom-0 h-screen flex bg-primary-black bg-opacity-50 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 backdrop-blur-sm ">
      <div className="relative w-full lg:w-30% md:w-[60%]">
        <div className="relative rounded-lg shadow w-full bg-white">
          <div className="p-6 space-y-8">{children}</div>
        </div>
      </div>
    </section>
  );
};
