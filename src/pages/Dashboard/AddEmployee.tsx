import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { RegisterUser, UserProfile } from "../../services/user.api";
import { useUserInfo } from "../../context/userContext";
import DHeader from "../../components/DashboardHeader";
import { deptById, getAllDepartments } from "../../services/department.api";
import { UpdateEmployee, employeeById } from "../../services/employee.api";

type Inputs = {
  name: string;
  age: number;
  email: string;
  mobileNumber: string;
  location: string;
  password: string;
  confirmPassword: string;
  department: string;
};
export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deptCategory, setDeptCategory] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const { userInfo } = useUserInfo();

  useEffect(() => {
    const isAuth = async () => {
      const res = await UserProfile(userInfo?.token);
      setLoading(false);
      if (!res?.data.success) {
        navigate("/");
      }
    };
    isAuth();

    const fetchCategory = async () => {
      const res = await getAllDepartments(userInfo?.token);
      setLoading(false);
      if (res?.data.success) {
        console.log(res);
        setDeptCategory(res?.data.docs);
      }
    };
    fetchCategory();
  }, [userInfo]);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        setLoading(true);
        const res = await employeeById(id, userInfo?.token);
        if (res?.data.success) {
          // console.log(res?.data.user);
          setValue("name", res?.data.user.name);
          setValue("age", res?.data.user.age);
          setValue("email", res?.data.user.email);
          setValue("mobileNumber", res?.data.user.mobileNumber);
          setValue("location", res?.data.user.location);

          const dept: any = await deptById(
            res?.data.user.department,
            userInfo?.token
          );
          console.log(dept);
          setValue("department", dept?.data.doc.name);

          setLoading(false);
        }
      };
      fetchEmployee();
    }
  }, []);

  console.log(deptCategory);

  const submitHandler = handleSubmit(async (data) => {
    console.log(data);

    setError("");

    if (
      (!id && !data.name) ||
      !data.age ||
      !data.mobileNumber ||
      !data.location ||
      !data.department ||
      (!data.email && !data.password && !data.confirmPassword)
    ) {
      setLoading(false);
      return setError("All fields are required.");
    }

    const Depart: any = deptCategory.find((d: any) => {
      if (d.name === data.department) {
        return d;
      }
    });
    console.log(Depart);
    // let { confirmPassword, ...newData } = data;
    // console.log(newData);

    const { confirmPassword, ...newData } = {
      ...data,
      department: Depart?._id,
    };
    console.log(newData);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(data.email);
    if (!isValidEmail) {
      setLoading(false);

      return setError("Email is not correct.");
    }

    if (data.password !== data.confirmPassword) {
      setLoading(false);

      return setError("Password doen't matched.");
    }

    setLoading(true);

    try {
      setError("");
      if (id) {
        let res = await UpdateEmployee(newData, id, userInfo?.token);
        console.log(res);
        if (res?.data.success) {
          setLoading(false);
          navigate("/dashbard/employees");
        } else {
          alert("Error whiling updating.");
          setLoading(false);
        }
      } else {
        console.log("register working");

        let res = await RegisterUser(newData);
        if (res.success === false) {
          setLoading(false);
          alert(res.error);
          return;
        }
        console.log(res);
        if (res?.data.success) {
          setLoading(false);
          navigate("/dashbard/employees");
        } else {
          alert("Error whiling creating.");
          setLoading(false);
        }
      }
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
      <DHeader name="Add Employee" />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>

            {error && (
              <h1 className="bg-red-200 text-red-500 font-semibold text-lg text-center py-2 px-4">
                {error}
              </h1>
            )}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("name")}
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="age"
                  className="pl-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("age")}
                    name="age"
                    id="age"
                    autoComplete="age"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    {...register("email")}
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("mobileNumber")}
                    name="mobileNumber"
                    id="mobileNumber"
                    autoComplete="mobileNumber"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  location
                </label>
                <div className="mt-2">
                  <input
                    id="location"
                    {...register("location")}
                    name="location"
                    type="text"
                    autoComplete="location"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Department
                </label>
                <div className="mt-2">
                  <select
                    id="department"
                    {...register("department")}
                    name="department"
                    autoComplete="department"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {deptCategory.map((dept: any, index) => (
                      <option key={index} className="pl-2">
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    {...register("password")}
                    name="password"
                    id="password"
                    autoComplete="password"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="confirmPassword"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div> */}
            </div>
          </div>
          <button
            type="submit"
            onClick={() => submitHandler()}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
