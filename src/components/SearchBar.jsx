import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useSuggestionFocus from "../hooks/useSuggestionFocus";
import SearchIcon from "../assets/icons/SearchIcon";
import SearchButton from "./SearchButton";
import SearchSuggestionModal from "./SearchSuggestionModal";
import { fetchResults } from "../api/fetchResults";
import { setItemWithExpireTime } from "../utils/setItemWithExpireTime";
import checkExpiredCache from "../utils/checkExpiredCache";

const StyledSearchBar = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  position: relative;
  width: 450px;

  div:nth-child(2) {
    font-size: 18px;
    color: #a6afb7;
    position: absolute;
    left: 18px;
    top: 44px;
  }

  input:focus + div:nth-child(2) {
    display: none;
  }
`;

const SearchInput = styled.input`
  margin-top: 30px;
  height: 60px;
  width: 430px;
  border-radius: 40px;
  border: none;
  padding-left: 20px;
  padding-right: 90px;
  padding-top: 5px;
  font-size: 17px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  ::placeholder {
    font-size: 17px;
    color: #a6afb7;
    padding-left: 25px;
  }

  :focus::placeholder {
    color: transparent;
  }
`;

SearchBar.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default function SearchBar({ openModal, setOpenModal }) {
  const [searchName, setSearchName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { changeIdxNum, focusIdx, setFocusIdx } = useSuggestionFocus(
    suggestions,
    setSearchName
  );

  const handleChange = async (e) => {
    const name = e.target.value;
    setSearchName(name);
    setFocusIdx(-2);
  };

  useEffect(() => {
    const getCachedDataOrFetch = async () => {
      if (!searchName) return setSuggestions([]);

      checkExpiredCache();
      const caches = JSON.parse(localStorage.getItem(searchName));
      if (caches) return setSuggestions(caches.searchValue);

      const searchResult = await fetchResults(searchName);
      setItemWithExpireTime(searchName, searchResult);
      setSuggestions(searchResult);
    };

    const debounceFetch = setTimeout(() => {
      getCachedDataOrFetch();
    }, 500);

    return () => {
      clearTimeout(debounceFetch);
    };
  }, [searchName, caches]);

  return (
    <StyledSearchBar>
      <SearchInput
        type="text"
        placeholder="질환명을 입력해 주세요."
        onChange={handleChange}
        onKeyDown={changeIdxNum}
        value={searchName}
        onClick={() => setOpenModal(true)}
      />
      {openModal && <SearchIcon />}
      <SearchButton />
      <SearchSuggestionModal
        searchName={searchName}
        openModal={openModal}
        focusIdx={focusIdx}
        suggestions={suggestions}
        setSearchName={setSearchName}
      />
    </StyledSearchBar>
  );
}
