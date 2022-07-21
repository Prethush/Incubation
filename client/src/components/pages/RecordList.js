import React from "react";
import Sidebar from "../Sidebar";
import { ProgressBar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getForms } from "../../features/form/formSlice";

function RecordList() {
  const dispatch = useDispatch();
  const { forms } = useSelector((state) => state.form);
  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <div className="container">
        <h2 className="mt-5 mb-4">Record List</h2>
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
                  <span style={{ width: "33%" }}>
                    Process Approved/Declined
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {forms &&
              forms.length &&
              forms.map((form, i) => {
                return (
                  <tr key={form._id}>
                    <th scope="row">{i + 1}</th>
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
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RecordList;
