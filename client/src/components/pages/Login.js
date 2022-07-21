import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, getUser, reset } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
// import Spinner from "../Spinner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isMessage } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    passwd: "",
  });
  const { email, passwd } = formData;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!user && isMessage) {
      toast.error(isMessage);
      dispatch(reset());
    }
    if (!user) {
      navigate("/");
    }
    if (user && user.isAdmin) {
      navigate("/admin-home");
    }
    if (user && !user.isAdmin) {
      navigate("/user-home");
    }
  }, [user, dispatch, navigate, isMessage]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !passwd) {
      toast.error("Enter all fields");
    } else if (!regex.test(email)) {
      toast.error("Email is invalid");
    } else {
      dispatch(loginUser(formData));
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="typeEmailX-2">
                    Email
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    name="passwd"
                    value={passwd}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="typePasswordX-2">
                    Password
                  </label>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <div className="mt-3">
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
