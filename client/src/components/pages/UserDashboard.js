import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../features/auth/authSlice";
// import {getForms} from "../../features/form/formSlice";

function UserDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user && user.isAdmin) {
      navigate("/admin-home");
    }
  }, [user, navigate]);
  return (
    <div style={{ fontSize: "3rem", textAlign: "center" }}>Hi {user?.name}</div>
  );
}

export default UserDashboard;
