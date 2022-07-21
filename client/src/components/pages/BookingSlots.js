import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getAllSlots } from "../../features/slots/slotSlice";
import Spinner from "../Spinner";
import SlotModal from "../SlotModal";
import { getForms } from "../../features/form/formSlice";
import { bookSlot } from "../../features/slots/slotSlice";

function BookingSlots() {
  const [slotModal, setSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isSlotBooked, setSlotBooked] = useState(false);
  const [bookedCompanyInfo, setBookedCompanyInfo] = useState(null);
  const dispatch = useDispatch();
  const { slots } = useSelector((state) => state.slot);
  const { forms } = useSelector((state) => state.form);
  useEffect(() => {
    dispatch(getAllSlots());
    dispatch(getForms());
  }, [dispatch]);

  const handleSlotModal = (id) => {
    setSelectedSlot(id);
    let slot = slots.find((slot) => slot._id === id);
    if (slot.isBooked) {
      setSlotBooked(true);
      setBookedCompanyInfo(slot);
    } else {
      setSlotBooked(false);
    }
    setSlotModal(true);
  };
  const handleModalClose = () => {
    setSlotModal(false);
    setSelectedCompany("");
  };
  const handleBookSlot = () => {
    console.log(selectedCompany, "Company", selectedSlot, "slot");
    if (selectedCompany) {
      const data = {
        formId: selectedCompany,
        slotId: selectedSlot,
      };
      dispatch(bookSlot(data));
      setSelectedCompany("");
      setSlotModal(false);
    }
  };
  if (!slots.length) {
    return <Spinner />;
  }

  return (
    <div>
      <Sidebar />

      <div className="container-fluid">
        <div className="mt-4">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {slots &&
              slots.map((slot, i) => {
                if (slot.isBooked) {
                  return (
                    <div
                      key={slot._id}
                      style={{
                        backgroundColor: "#8d021f",
                        width: "7rem",
                        height: "7rem",
                        margin: "1rem",
                        cursor: "pointer",
                        borderRadius: ".5rem",
                      }}
                      onClick={() => {
                        handleSlotModal(slot._id);
                      }}
                    ></div>
                  );
                } else {
                  return (
                    <div
                      key={slot._id}
                      style={{
                        backgroundColor: "#1560bd",
                        width: "7rem",
                        height: "7rem",
                        margin: "1rem",
                        cursor: "pointer",
                        borderRadius: ".5rem",
                      }}
                      onClick={() => {
                        handleSlotModal(slot._id);
                      }}
                    ></div>
                  );
                }
              })}
          </div>
        </div>
      </div>
      <SlotModal
        slotModal={slotModal}
        handleClose={handleModalClose}
        forms={forms}
        selectedSlot={selectedSlot}
        setSelectedCompany={setSelectedCompany}
        handleBookSlot={handleBookSlot}
        isSlotBooked={isSlotBooked}
        bookedCompanyInfo={bookedCompanyInfo}
      />
    </div>
  );
}

export default BookingSlots;
