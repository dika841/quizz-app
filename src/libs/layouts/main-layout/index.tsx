import { FC, PropsWithChildren, ReactElement } from "react";
import { Outlet } from "react-router-dom";
export const MainLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <main className="w-full min-h-screen px-8 bg-indigo-950">
      {children}
      <Outlet />
    </main>
  );
};
