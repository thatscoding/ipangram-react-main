import DHeader from "../../components/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../context/userContext";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { UserProfile } from "../../services/user.api";
import DeptList from "../../components/DeptList";

function Department() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, [userInfo]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div>
      <DHeader name="Departments" url="/dashbard/departments/new" />
      <DeptList />
    </div>
  );
}

export default Department;
