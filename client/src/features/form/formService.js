import axios from "axios";

const CREATE_FORM_API = "http://localhost:5555/api/users/form/";
const GET_FORMS_DATA_API = "http://localhost:5555/api/admin/all-forms";
const CHANGE_STATE_PENDING_API =
  "http://localhost:5555/api/admin/form/update-pending/";
const CHANGE_STATE_APPROVED_API =
  "http://localhost:5555/api/admin/form/update-approved/";
const CHANGE_STATE_DECLINED_API =
  "http://localhost:5555/api/admin/form/update-declined/";

const getConfig = () => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

// create form
const createForm = async (data) => {
  const config = getConfig();
  const response = await axios.post(CREATE_FORM_API, data, config);
  return response.data;
};

// get all forms
const getForms = async () => {
  const config = getConfig();
  const response = await axios.get(GET_FORMS_DATA_API, config);
  return response.data;
};

// change form to pending state
const pendingState = async (id) => {
  const config = getConfig();
  const response = await axios.put(CHANGE_STATE_PENDING_API + id, {}, config);
  return response.data;
};
// change from status to approved
const approvedState = async (id) => {
  const config = getConfig();
  const response = await axios.put(CHANGE_STATE_APPROVED_API + id, {}, config);
  return response.data;
};
// change from status to declined
const declinedState = async (id) => {
  const config = getConfig();
  const response = await axios.delete(CHANGE_STATE_DECLINED_API + id, config);
  return response.data;
};
const formService = {
  createForm,
  getForms,
  pendingState,
  approvedState,
  declinedState,
};
export default formService;
