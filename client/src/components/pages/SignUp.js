import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../../features/auth/authSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isMessage } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwd: "",
    confirmPasswd: "",
  });

  // useEffect(() => {
  //   dispatch(reset());
  // }, []);
  useEffect(() => {
    if (!user && isMessage) {
      toast.error(isMessage);
    }
    if (!user && isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, user, isSuccess, navigate, isMessage]);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { name, email, passwd, confirmPasswd } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!name || !passwd || !email || !confirmPasswd) {
      toast.error("Enter all fields");
    } else if (!regex.test(email)) {
      toast.error("Email is invalid");
    } else if (passwd !== confirmPasswd) {
      toast.error("Password is incorrect");
    } else {
      dispatch(registerUser(formData));
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        name="passwd"
                        value={passwd}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        name="confirmPasswd"
                        value={confirmPasswd}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      value=" Register"
                    />
                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
