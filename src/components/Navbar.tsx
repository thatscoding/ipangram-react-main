import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useUserInfo } from "../context/userContext";
import { LogoutUser } from "../services/user.api";
import { HashLoader } from "react-spinners";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userInfo, clearUserInfo } = useUserInfo();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      console.log(userInfo);
      const res = await LogoutUser(userInfo?.token);
      console.log(res);
      if (res?.data.success) {
        await clearUserInfo();
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  let curUser = { ...userInfo };
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About Us
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Services
          </Link>
          {userInfo?.department === "manager" && (
            <Link
              to="/dashboard"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Dashboard
            </Link>
          )}
          {userInfo && (
            <>
              <Link
                to="/profile/1"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Profile
              </Link>
            </>
          )}
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact
          </Link>

          {curUser && userInfo && (
            <p className="text-sm font-semibold leading-6  capitalize text-green-600">
              {curUser.name}
            </p>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userInfo ? (
            <p
              onClick={() => handleLogout()}
              className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Logout
            </p>
          ) : (
            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden ease-linear duration-1000"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 ease-linear duration-1000" />
        <Dialog.Panel className="ease-linear duration-1000 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex flex-col pt=8 space-y-2 py-6">
                <Link
                  to="/dashboard"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Home
                </Link>

                <Link
                  to="/"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  About Us
                </Link>
                <Link
                  to="/"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Services
                </Link>

                {userInfo?.department === "manager" && (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
                {userInfo && (
                  <Link
                    to="/profile/1"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Profile
                  </Link>
                )}
                <Link
                  to="/"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Contact
                </Link>

                {curUser && userInfo && (
                  <p className="py-2  text-base font-semibold leading-6 capitalize text-green-600">
                    {curUser?.name}
                  </p>
                )}
              </div>
              <div className="py-6">
                {userInfo ? (
                  <p
                    onClick={() => handleLogout()}
                    className="w-40 text-center cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Logout
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/login"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Navbar;
