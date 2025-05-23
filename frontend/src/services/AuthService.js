import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const updateProfile = (user) => {
  const token = JSON.parse(localStorage.getItem('user')).accessToken;
  return axios.put(API_URL + "update-profile", user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const deleteaccount = (user) => {
  const token = JSON.parse(localStorage.getItem('user')).accessToken;
  return axios.put(API_URL + "deleteaccount", user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  deleteaccount
}

export default AuthService;
