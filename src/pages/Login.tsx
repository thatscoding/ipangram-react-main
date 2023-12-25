import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { LoginUser } from "../services/user.api";
import { useUserInfo } from "../context/userContext";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserInfo } = useUserInfo();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  const submitHandler = handleSubmit(async (data) => {
    console.log(data);

    setError("");
    if (!data.email && !data.password) {
      setLoading(false);
      return setError("All fields are required.");
    }

    setLoading(true);

    try {
      setError("");
      const res: any = await LoginUser(data);
      await console.log(res);
      if (res?.data.success) {
        const newData = { ...res?.data.data, token: res?.data.token };
        console.log(newData);
        localStorage.setItem("user", JSON.stringify(newData));
        setUserInfo(newData);

        navigate("/");
      } else {
        setError(
          "Error whiling login possibly you email and password not registered. "
        );
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error?.message);
      setError(error?.message);
      console.log(error);
      setLoading(false);
    }
  });

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && (
          <h1 className="bg-red-200 text-red-500 font-semibold text-lg text-center py-2 px-4">
            {error}
          </h1>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password")}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => submitHandler()}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Have an Account?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
