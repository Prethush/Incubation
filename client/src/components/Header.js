import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, getUser } from "../features/auth/authSlice";
import { useEffect } from "react";
import { getForms } from "../features/form/formSlice";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { forms } = useSelector((state) => state.form);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getForms());
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const openApplication = () => {
    let result = forms.some((form) => form.owner === user._id);
    console.log(result);
    if (result) {
      navigate("/user/application-status");
    } else {
      navigate("/user-application");
    }
  };
  if (!user || (user && user.isAdmin)) {
    return "";
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        {!user
          ? ""
          : user &&
            !user.isAdmin && (
              <Link className="navbar-brand" to="/user-home">
                Home
              </Link>
            )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ scrollHeight: "100px" }}
          ></ul>
          <ul
            className="navbar-nav  my-2 my-lg-0 navbar-nav-scroll"
            style={{ listStyle: "none" }}
          >
            {user && !user.isAdmin && (
              <li style={{ marginRight: "1rem" }}>
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "#fff",
                    padding: ".3rem .7rem",
                    borderRadius: ".3rem",
                    border: "none",
                  }}
                  onClick={openApplication}
                >
                  Application
                </button>
              </li>
            )}
            {user && (
              <li style={{ marginRight: "3rem" }}>
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "#fff",
                    padding: ".3rem .7rem",
                    borderRadius: ".3rem",
                    border: "none",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
