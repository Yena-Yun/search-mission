import { useState, useEffect } from "react";
import axios from "axios";
import useExpireTime from "./useExpireTime";

export default function useSearchSuggestions() {
  const sessionStorageCleared = useExpireTime();
  const [suggestions, setSuggestions] = useState([]);
  const [searchName, setSearchName] = useState("");

  const handleChange = async (e) => {
    const name = e.target.value;
    setSearchName(name);
  };

  useEffect(() => {
    const caches = JSON.parse(sessionStorage.getItem("cacheList"));
    const fetchResults = async () => {
      if (searchName !== "") {
        if (caches !== null && caches[searchName]) {
          setSuggestions(caches[searchName]);
        } else {
          const results = await axios
            .get(`/api/v1/search-conditions/?name=${searchName}`)
            .then(console.info("calling api"));
          const resultsSlice = results.data.slice(0, 7);
          const newCache = {
            ...caches,
            [searchName]: resultsSlice,
          };
          sessionStorage.setItem("cacheList", JSON.stringify(newCache));
          setSuggestions(resultsSlice);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchName, caches, sessionStorageCleared]);

  return {
    searchName,
    handleChange,
    setSearchName,
    suggestions,
  };
}
