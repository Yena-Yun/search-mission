import axios from "axios";

const SearchApi = axios.create({
  method: "GET",
  baseURL: "https://api.clinicaltrialskorea.com/api/v1/search-conditions",
});

SearchApi.interceptors.request.use((config) => {
  console.info("calling api");
  return config;
});

SearchApi.interceptors.response.use((response) => {
  if (response.status !== 200) {
    throw new Error("api 호출이 실패하였습니다.");
  }
  if (response.data.length === 0) {
    console.info("api 호출이 실패하였습니다.");
  }

  const url = new URLSearchParams(`${response.config.url}`);
  const key = url.get("name");

  localStorage.setItem(
    key,
    JSON.stringify({
      value: response.data,
      expiresAt: Date.now() + 1000 * 60 * 5, // 5분
    })
  );

  return response.data;
});

export default SearchApi;
