import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { getForms } from "../features/form/formSlice";
import { getAllSlots } from "../features/slots/slotSlice";
import Spinner from "../components/Spinner";
import { ProgressBar } from "react-bootstrap";

function ApplicationStatus() {
  const dispatch = useDispatch();
  const { forms } = useSelector((state) => state.form);
  const { slots } = useSelector((state) => state.slot);
  const token = JSON.parse(localStorage.getItem("user")).token;
  const userId = decodeToken(token).id;

  useEffect(() => {
    dispatch(getForms());
    dispatch(getAllSlots());
  }, [dispatch]);
  if (!forms || !slots) {
    return <Spinner />;
  }

  let form = forms.find((form) => form.owner === userId);
  let userSlot = slots.find((slot) => slot.companyId === form._id);
  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Application Status</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Company Name</th>
            <th scope="col">Company Address</th>
            <th scope="col">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ width: "33%" }}> Registration Approved</span>
                <span style={{ width: "33%" }}>Under Process</span>
                <span style={{ width: "33%" }}>Process Approved/Declined</span>
              </div>
            </th>
            {userSlot && <th scope="col">Section Name</th>}
            {userSlot && <th scope="col">Slot No</th>}
          </tr>
        </thead>
        <tbody>
          <tr key={form._id}>
            <th scope="row">1</th>
            <td>{form.companyname}</td>
            <td>{form.address}</td>
            <td>
              <ProgressBar
                variant={
                  form.status === "null"
                    ? "info"
                    : form.status === "pending"
                    ? "warning"
                    : form.status === "declined"
                    ? "danger"
                    : "success"
                }
                now={
                  form.status === "null"
                    ? 33
                    : form.status === "pending"
                    ? 66
                    : 99
                }
              />
            </td>
            {userSlot && <td>{userSlot.sectionName}</td>}
            {userSlot && <td>{userSlot.slotNo}</td>}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationStatus;
