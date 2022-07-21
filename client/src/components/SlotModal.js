import { Modal, Form, Button } from "react-bootstrap";
import { getForms } from "../features/form/formSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function SlotModal({
  slotModal,
  handleClose,
  setSelectedCompany,
  handleBookSlot,
  isSlotBooked,
  bookedCompanyInfo,
}) {
  const dispatch = useDispatch();
  const { forms } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(getForms());
  }, [slotModal, dispatch]);

  return (
    <>
      <Modal
        show={slotModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSlotBooked ? (
            <>
              <h4>Comapany Name: {bookedCompanyInfo.companyName}</h4>
              <h4>Email: {bookedCompanyInfo.companyEmail}</h4>
            </>
          ) : (
            <>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setSelectedCompany(e.target.value)}
                style={{ marginBottom: "1.5rem" }}
              >
                <option></option>
                {forms &&
                  forms.map((form) => {
                    if (form.status === "approved" && !form.isSlotSelected) {
                      return (
                        <option key={form._id} value={form._id}>
                          {form.companyname}
                        </option>
                      );
                    }
                    return "";
                  })}
              </Form.Select>
              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={handleBookSlot}
              >
                Book Slot
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SlotModal;
