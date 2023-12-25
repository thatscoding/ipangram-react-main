import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.log(error);
  return (
    <div>
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="font-bold text-5xl mb-6">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </div>
  );
}
