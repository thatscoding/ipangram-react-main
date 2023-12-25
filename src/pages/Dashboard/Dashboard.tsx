import { useEffect, useState } from "react";
import DHeader from "../../components/DashboardHeader";
import UserList from "../../components/UserList";
import { useUserInfo } from "../../context/userContext";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../services/user.api";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userInfo } = useUserInfo();

  useEffect(() => {
    const isAuth = async () => {
      const res = await UserProfile(userInfo?.token);
      console.log(res);
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
      <DHeader name="Dashboard" />
      <UserList />
    </div>
  );
}

export default Dashboard;
