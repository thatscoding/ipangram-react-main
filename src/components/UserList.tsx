import { Link } from "react-router-dom";
import { deleteEmployee, getAllEmployees } from "../services/employee.api";
import { useUserInfo } from "../context/userContext";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import Pagination from "./features/Pagination";
import Sort from "./features/Sort";
import Filter from "./features/Filter";

function UserList() {
  // search
  const [data, setData] = useState<any>({});
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [location, setlocation] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // search

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const { userInfo } = useUserInfo();

  useEffect(() => {
    const fetchCategory = async () => {
      // setLoading(true);
      const url = `?page=${page}&sort=${
        sort.order
      }&location=${location.toString()}&search=${search}`;
      console.log(url);

      const res = await getAllEmployees(url, userInfo?.token);
      console.log(res);

      setLoading(false);
      if (res?.data.success) {
        console.log(res);
        setData(res?.data.response);
        setEmployees(res?.data.response.user);
      }
    };
    fetchCategory();
  }, [userInfo, page, sort, location, search]);

  const handleDeleteEmployee = async (id: string) => {
    setLoading(true);
    const res = await deleteEmployee(id, userInfo?.token);
    if (res.success === false) {
      alert(res.error);
      setLoading(false);
      return;
    }
    if (res?.data.success) {
      const res = await getAllEmployees("", userInfo?.token);
      console.log(res);
      if (res?.data.success) {
        console.log(res);
        setData(res?.data.response);
        setEmployees(res?.data.response.user);
        setLoading(false);
      }
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
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div>
            <div
              id="dropdownAction"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            ></div>
          </div>
          <div className="flex justify-between w-full gap-4 px-4  items-center">
            <Sort sort={sort} setSort={setSort} />

            <div className="">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mx-4">
            <Filter
              allLocation={data.locations ? data.locations : []}
              setlocation={setlocation}
              location={location}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">S.no</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee: any, index: number) => {
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
                        <div className="text-base font-semibold capitalize">
                          {employee.name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {employee.email}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center capitalize">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 "></div>{" "}
                        {employee.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        to={`/dashbard/employees/${employee._id}`}
                      >
                        Edit
                      </Link>
                      |
                      <p
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        onClick={() => handleDeleteEmployee(employee._id)}
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
      <div className="py-8 w-full items-center justify-center">
        <Pagination
          page={page}
          limit={data.limit ? data.limit : 0}
          total={data.total ? data.total : 0}
          setPage={(page: any) => setPage(page)}
        />{" "}
      </div>
    </div>
  );
}

export default UserList;
