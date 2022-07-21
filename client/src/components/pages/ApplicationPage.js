import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createForm, reset } from "../../features/form/formSlice";
import { useNavigate } from "react-router-dom";

function ApplicationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, isSuccess } = useSelector((state) => state.form);
  const initialValues = {
    name: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phoneno: "",
    companyname: "",
    team: "",
    products: "",
    problem: "",
    solution: "",
    valueproposition: ",",
    competitors: "",
    revenuemodel: "",
    potentialmarketsize: "",
    marketplan: "",
    incubationtype: "",
    businessproposal: "",
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (form && isSuccess) {
      navigate("/user-home");
    }
  }, [form, isSuccess, navigate]);
  const [formData, setFormData] = useState(initialValues);
  const {
    name,
    address,
    city,
    state,
    email,
    phoneno,
    companyname,
    team,
    products,
    problem,
    solution,
    valueproposition,
    competitors,
    revenuemodel,
    potentialmarketsize,
    marketplan,
    incubationtype,
    businessproposal,
  } = formData;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log("aaa");
    e.preventDefault();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (
      !name ||
      !address ||
      !city ||
      !state ||
      !email ||
      !phoneno ||
      !companyname ||
      !team ||
      !products ||
      !problem ||
      !solution ||
      !valueproposition ||
      !competitors ||
      !revenuemodel ||
      !potentialmarketsize ||
      !marketplan ||
      !incubationtype ||
      !businessproposal
    ) {
      toast.error("Enter all fields");
    } else if (!regex.test(email)) {
      toast.error("Email is invalid");
    } else {
      dispatch(createForm(formData));
      toast.success("Your application is submitted");
    }
  };
  return (
    <div className="container col-md-6 card mt-5 p-5 ">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">
          <u> APPLICATION FOR INCUBATION </u>
        </h3>

        <div className="row mt-5 ">
          <div className="mb-2 col-md-6 col-12">
            <label className="mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2 col-md-6 col-12 ">
            <label className="mb-1">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter Address"
              value={address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row ">
          <div className="mb-2 col-md-6 col-12">
            <label className="mb-1">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="Enter City"
              value={city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 col-md-6 col-12">
            <label className="mb-1">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              placeholder="Enter State"
              value={state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-2 col-md-6 col-12">
            <label className="mb-1">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 col-md-6 col-12">
            <label className="mb-1">Phone No</label>
            <input
              type="number"
              name="phoneno"
              className="form-control"
              placeholder="Enter Phone No"
              value={phoneno}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-6 col-12">
            <label className="mb-1">Company Name</label>
            <input
              type="text"
              name="companyname"
              className="form-control"
              placeholder="Company Name"
              value={companyname}
              onChange={handleChange}
            />
          </div>

          {/* <div className="mb-1 col-md-3 col-12 mt-4"> */}
          {/* <img src="" alt="" /> */}
          {/* <input type="file" name="image" />
          </div> */}
        </div>
        <div className="mb-3 ">
          <label className="mb-1">Describe Your Team and Background</label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="team"
            value={team}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 ">
          <label className="mb-1">Describe Your Company and Products</label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="products"
            value={products}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 ">
          <label className="mb-1">
            Describe the problem you are trying to solve
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="problem"
            value={problem}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 ">
          <label className="mb-1">What is unique about your solution </label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="solution"
            value={solution}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 ">
          <label className="mb-1">
            {" "}
            what is your value proposition for the customer
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="valueproposition"
            value={valueproposition}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 ">
          <label className="mb-1">
            Who are your competitors and what is your competative advantage ?
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="competitors"
            value={competitors}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 ">
          <label className="mb-1">Explain your revenue model</label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="revenuemodel"
            value={revenuemodel}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 ">
          <label className="mb-1">
            What is the potential market size of the product ?
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="potentialmarketsize"
            value={potentialmarketsize}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 ">
          <label className="mb-1">
            How do you market or plan to market your product and services{" "}
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="marketplan"
            value={marketplan}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Types of incubation needed</p>
          <div className="form-check mv-3">
            <input
              className="form-check-input"
              type="radio"
              name="incubationtype"
              id="flexRadioDefault1"
              value="physical"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Physical Incubation
            </label>
          </div>
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="radio"
              name="incubationtype"
              id="flexRadioDefault2"
              value="virtual"
              onChange={handleChange}
            />

            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Virtual Incubation
            </label>
          </div>
        </div>
        <div className="mb-3 ">
          <label className="mb-1">Upload a detailed business proposal</label>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="businessproposal"
            value={businessproposal}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationPage;
