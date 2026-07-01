import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const searchJobs = async (title = "", location = "") => {
  const response = await axios.get(`${API_URL}/jobs`, {
    params: {
      title,
      location,
    },
  });

  return response.data;
};