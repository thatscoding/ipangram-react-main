import DHeader from "../../components/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../context/userContext";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userInfo } = useUserInfo();
  useEffect(() => {
    if (!userInfo) {
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [userInfo, navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <>
      <DHeader name="Employee Profile" />
      <div className="container mx-auto xl:max-w-6xl">
        <div className="pb-8">
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="border shadow-xl rounded-xl p-8">
              <div className="flex gap-4 items-center">
                <h1 className="font-bold text-lg">Name :</h1>
                <p className="capitalize">{userInfo.name}</p>
              </div>
              <div className="flex gap-4 items-center">
                <h1 className="font-bold text-lg">Age :</h1>
                <p className="capitalize">{userInfo.age}</p>
              </div>
              <div className="flex gap-4 items-center">
                <h1 className="font-bold text-lg">Mobile Number :</h1>
                <p className="capitalize">{userInfo.mobileNumber}</p>
              </div>
              <div className="flex gap-4 items-center">
                <h1 className="font-bold text-lg">Location :</h1>
                <p className="capitalize">{userInfo.location}</p>
              </div>
              <div className="flex gap-4 items-center">
                <h1 className="font-bold text-lg">Department :</h1>
                <p className="capitalize">{userInfo.department}</p>
              </div>
            </div>

            {/* <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}
