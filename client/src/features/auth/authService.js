import axios from "axios";

const REGISTER_API = "http://localhost:5555/api/users/register/";
const LOGIN_API = "http://localhost:5555/api/users/login/";
const GET_USER = "http://localhost:5555/api/users/get-user";
// register user
const registerUser = async (userData) => {
  const response = await axios.post(REGISTER_API, userData);
  return response.data;
};

// login user
const loginUser = async (userData) => {
  const response = await axios.post(LOGIN_API, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// logout user
const logoutUser = () => {
  localStorage.removeItem("user");
};

// get user
const getUser = async () => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(GET_USER, config);
  return response.data;
};
const authService = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
};

export default authService;
