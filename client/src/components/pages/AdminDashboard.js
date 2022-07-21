import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getForms,
  toPendingState,
  toApprovedState,
  toDeclinedState,
} from "../../features/form/formSlice";
import Sidebar from "../Sidebar";
import FormModal from "../FormModal";
import { getUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { forms } = useSelector((state) => state.form);
  useEffect(() => {
    dispatch(getForms());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate("/user-home");
    }
    if (!user) {
      navigate("/");
    }
  }, []);
  const handlePendingForm = (id) => {
    console.log(id);
    dispatch(toPendingState(id));
  };
  const handleModalData = (id) => {
    setModalData(forms.filter((form) => form._id === id));
  };
  const handleModalOpen = (id) => {
    setShow(true);
    handleModalData(id);
  };
  const handleModalClose = () => {
    // setModalData({});
    setShow(false);
  };
  const handleApprovedForm = (id) => {
    dispatch(toApprovedState(id));
  };
  const handleDeclinedForm = (id) => {
    dispatch(toDeclinedState(id));
  };
  let submittedForms =
    forms && forms.length ? forms.filter((form) => form.status === "null") : [];
  let pendingForms =
    forms && forms.length
      ? forms.filter((form) => form.status === "pending")
      : [];
  return (
    <>
      <FormModal
        show={show}
        handleModalClose={handleModalClose}
        modalData={modalData.length ? modalData[0] : {}}
      />
      <Sidebar />
      <div className="container">
        <h2 className="mt-5 mb-4">New Applicant List</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company Name</th>
              <th scope="col">Company Address</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {submittedForms.map((form, i) => {
              return (
                <tr key={form._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{form.companyname}</td>
                  <td>{form.address}</td>
                  <td>
                    <button
                      onClick={() => handleModalOpen(form._id)}
                      style={{
                        backgroundColor: "blue",
                        color: "#fff",
                        padding: ".3rem .7rem",
                        borderRadius: ".3rem",
                        border: "none",
                        marginRight: "1rem",
                      }}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handlePendingForm(form._id)}
                      style={{
                        backgroundColor: "blue",
                        color: "#fff",
                        padding: ".3rem .7rem",
                        borderRadius: ".3rem",
                        border: "none",
                        marginRight: "1rem",
                      }}
                    >
                      Pending
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h2 className="mt-5 mb-4">Pending Applicant List</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Company Name</th>
                <th scope="col">Company Address</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {pendingForms.map((form, i) => {
                return (
                  <tr key={form._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{form.companyname}</td>
                    <td>{form.address}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "blue",
                          color: "#fff",
                          padding: ".3rem .7rem",
                          borderRadius: ".3rem",
                          border: "none",
                          marginRight: "1rem",
                        }}
                        onClick={() => handleModalOpen(form._id)}
                      >
                        Open
                      </button>
                      <button
                        onClick={() => handleApprovedForm(form._id)}
                        style={{
                          backgroundColor: "blue",
                          color: "#fff",
                          padding: ".3rem .7rem",
                          borderRadius: ".3rem",
                          border: "none",
                          marginRight: "1rem",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeclinedForm(form._id)}
                        style={{
                          backgroundColor: "red",
                          color: "#fff",
                          padding: ".3rem .7rem",
                          borderRadius: ".3rem",
                          border: "none",
                          marginRight: "1rem",
                        }}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
