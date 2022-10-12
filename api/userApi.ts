import axios from "axios";
const url = "https://cylender-app.vercel.app/user/";

export const updateUser = (id, updatedUser) =>
  axios.patch(`${url}/${id}`, updatedUser);
