import axios from "axios";

const url = axios.create({ baseURL: "http://localhost:3500" });

url.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile').token)}`
  }

  return req
})

// Login With Google
const googleLogin = async (data) => {
  localStorage.setItem("profile", JSON.stringify({ ...data.data }));
  return data;
};

// Logout
const logout = () => {
  localStorage.removeItem("profile");
};

// Register User
const register = async (formData) => {
  const { data } = await url.post("/users/register", formData);
  localStorage.setItem("profile", JSON.stringify({ ...data }));
  return data;
};

// Login User
const login = async (formData) => {
  const { data } = await url.post("/users/login", formData);
  localStorage.setItem("profile", JSON.stringify({ ...data }));
  return data;
};

const authService = {
  googleLogin,
  logout,
  register,
  login,
};

export default authService;
