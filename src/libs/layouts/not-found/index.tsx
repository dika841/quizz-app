import { MainLayout } from "../main-layout";
import { useRouteError } from "react-router-dom";
import { TRouteError } from "./type";

export const NotFound = () => {
  const error = useRouteError() as TRouteError;
  return (
    <MainLayout>
      <section
        className="flex flex-col justify-center items-center w-full h-screen text-white"
        id="error-page"
      >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <h1 className="font-bold text-2xl md:text-4xl text-white">
          {error.statusText || error.message}
        </h1>
      </section>
    </MainLayout>
  );
};
