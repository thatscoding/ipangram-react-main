import { Link } from "react-router-dom";
import { useUserInfo } from "../context/userContext";
import { useEffect, useState } from "react";
import { deleteDept, getAllDepartments } from "../services/department.api";
import { HashLoader } from "react-spinners";

function DeptList() {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const { userInfo } = useUserInfo();

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getAllDepartments(userInfo?.token);
      setLoading(false);
      if (res?.data.success) {
        console.log(res);
        setDepartments(res?.data.docs);
      }
    };
    fetchCategory();
  }, [userInfo]);

  const handleDeleteDept = async (id: string) => {
    setLoading(true);
    const res = await deleteDept(id, userInfo?.token);
    console.log(res);
    if (res?.data.success) {
      const res = await getAllDepartments(userInfo?.token);
      if (res?.data.success) {
        console.log(res);
        setDepartments(res?.data.docs);
        setLoading(false);
      }
    } else {
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:container mx-auto xl:max-w-6xl">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">S.no</div>
              </th>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                total Employees
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {departments?.map((dept: any, index: number) => {
              return (
                <>
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">{index + 1}</div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {/* <img
                        className="w-10 h-10 rounded-full"
                        src="/docs/images/people/profile-picture-1.jpg"
                        alt="Jese image"
                      /> */}
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {dept._id}
                        </div>
                        {/* <div className="font-normal text-gray-500">
                          {employee.email}
                        </div> */}
                      </div>
                    </th>
                    <td className="px-6 py-4 capitalize">{dept.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                        {dept.employees.length}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        to={`/dashbard/departments/${dept._id}`}
                      >
                        Edit
                      </Link>
                      |
                      <p
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        onClick={() => handleDeleteDept(dept._id)}
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeptList;
