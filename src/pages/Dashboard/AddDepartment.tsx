import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserInfo } from "../../context/userContext";
import { HashLoader } from "react-spinners";
import { UserProfile } from "../../services/user.api";
import { useForm } from "react-hook-form";
import {
  addDepartment,
  getAllDepartments,
  updateDept,
} from "../../services/department.api";
import DHeader from "../../components/DashboardHeader";

type Inputs = {
  name: string;
};

function AddDepartment() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const [deptCategory, setDeptCategory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    const isAuth = async () => {
      try {
        const res = await UserProfile(userInfo?.token);
        setLoading(false);
        if (!res?.data.success) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    isAuth();

    console.log(error);
    const fetchCategory = async () => {
      try {
        const res = await getAllDepartments(userInfo?.token);
        setLoading(false);
        if (res?.data.success) {
          setDeptCategory(res?.data.docs);
        }
      } catch (error) {
        console.error("Error fetching department categories:", error);
      }
    };
    fetchCategory();
  }, [userInfo, navigate]);

  useEffect(() => {
    if (id) {
      const dept: any = deptCategory.find((d: any) => d._id === id);
      console.log("Department category:", deptCategory);
      console.log("Selected department:", dept);
      setValue("name", dept?.name);
    }
  }, [id, deptCategory]);

  const submitHandler = handleSubmit(async (data) => {
    setError("");
    setLoading(true);

    try {
      if (id) {
        const res = await updateDept(data, id, userInfo?.token);

        console.log("Add department response:", res);
        if (res?.data.success) {
          setLoading(false);
          navigate("/dashbard/departments");
          return;
        }

        alert("Name is already Exist.");
      } else {
        const res = await addDepartment(data, userInfo?.token);

        console.log("Add department response:", res);
        if (res?.data.success) {
          setLoading(false);

          navigate("/dashbard/departments");
        }
      }
    } catch (error: any) {
      console.error("Error adding department:", error);
      setError(error?.message);
    } finally {
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
      <DHeader name="Add Department" />
      <div className="">
        <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Add New Department
            </h2>
          </div>

          {error && (
            <h1 className="bg-red-200 text-red-500 font-semibold text-lg text-center py-2 px-4">
              {error}
            </h1>
          )}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Department
                </label>
                <div className="mt-2">
                  <input
                    id="department"
                    {...register("name")}
                    name="name"
                    type="text"
                    autoComplete="name"
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
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDepartment;
