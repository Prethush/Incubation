import axios from "axios";

const GET_ALL_SLOTS_API = "http://localhost:5555/api/admin/slots/";
const BOOK_SLOT_API = "http://localhost:5555/api/admin/book-slot/";
const getConfig = () => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

// get all slots
const getAllSlots = async () => {
  const config = getConfig();
  const response = await axios.get(GET_ALL_SLOTS_API, config);
  return response.data;
};

// book slot
const bookSlot = async (data) => {
  const config = getConfig();
  const response = await axios.put(BOOK_SLOT_API, data, config);
  return response.data;
};
const slotService = {
  getAllSlots,
  bookSlot,
};

export default slotService;
