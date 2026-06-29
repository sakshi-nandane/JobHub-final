import axios from "axios";

export const searchJobs = async (
  title = "developer",
  location = "India"
) => {
  const response = await axios.get(
    "https://jsearch.p.rapidapi.com/search",
    {
      params: {
        query: `${title} in ${location}`,
        page: "1",
        num_pages: "3", // 3 pages ≈ 30 jobs
      },
      headers: {
        "X-RapidAPI-Key":
          process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host":
          "jsearch.p.rapidapi.com",
      },
    }
  );

  return response.data.data;
};

console.log("API KEY:", process.env.REACT_APP_RAPIDAPI_KEY);