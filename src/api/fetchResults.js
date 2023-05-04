import axios from "axios";

export const fetchResults = async (searchName) => {
  try {
    const { data } = await axios.get(
      `/api/v1/search-conditions/?name=${searchName}`
    );
    console.info("calling api");
    return data.length > 0 ? data : [];
  } catch (error) {
    console.error(error);
    throw new Error("api 호출이 실패하였습니다.");
  }
};

export const instance = axios.create({
  baseURL: "",
  method: "GET",
});

instance.interceptors.request.use(() => {
  console.log("calling api");
});

instance.interceptors.response.use((response) => {
  if (response.status !== 200) {
    throw new Error("api 호출이 실패하였습니다.");
  }
  if (response.data.length === 0) {
    console.info("api 호출이 실패하였습니다.");
  }

  const url = new URLSearchParams(response.config.url);
  const key = url.get("name");

  // or localStorage.setItem ....
  sessionStorage.setItem(
    key,
    JSON.stringify({
      value: response.data,
      expiresAt: Date.now() + 1000 * 60 * 5, // 5분
    })
  );

  return response;
});

// function clearStorage() {
//   for (let key = 0; key < sessionStorage.length; key++) {
//     const keyName = sessionStorage.key(key);
//     const cachedKeyWord = JSON.parse(sessionStorage.getItem(`${keyName}`));
//     if (cachedKeyWord.expiresAt < Date.now()) {
//       sessionStorage.removeItem(`${keyName}`);
//     }
//   }
// }

// 1분마다 순찰
// setInterval(clearStorage, 1000 * 60);
