import axios from "axios";

// 1. authorize calls with authorization header
// 2. set url prefix to our server

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: "http://localhost:5000/api"
  });
};