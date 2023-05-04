import SearchApi from "./SearchApi";

const fetchResults = async (searchName) => {
  const result = await SearchApi.get(`?name=${searchName}`);

  return result;
};

export default fetchResults;
