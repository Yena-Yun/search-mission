import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useSuggestionFocus from "../hooks/useSuggestionFocus";
import SearchIcon from "../assets/icons/SearchIcon";
import SearchButton from "./SearchButton";
import SearchSuggestionModal from "./SearchSuggestionModal";
import SearchSuggestionListItem from "./SearchSuggestionListItem";
import fetchResults from "../api/fetchResults";
import checkExpiredCache from "../utils/checkExpiredCache";
import { RegExp } from "../utils/RegExp";

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
`;

const SearchInput = styled.input`
  margin-top: 30px;
  height: 60px;
  width: 430px;
  border-radius: 40px;
  border: none;
  padding-left: 45px;
  padding-right: 90px;
  padding-top: 5px;
  font-size: 17px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  ::placeholder {
    font-size: 17px;
    color: #a6afb7;
  }

  :focus::placeholder {
    color: transparent;
  }
`;

const StyledSearchSuggestionList = styled.ul`
  margin-top: -10px;
  margin-left: -19px;

  & > span {
    margin-left: 19px;
  }
`;

SearchBar.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default function SearchBar({ openModal, setOpenModal }) {
  const searchRef = useRef(null);
  const [searchName, setSearchName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { changeIdxNum, focusIdx, setFocusIdx } = useSuggestionFocus(
    suggestions,
    setSearchName,
    setOpenModal,
    searchRef
  );

  const handleChange = async (e) => {
    const name = e.target.value;
    setSearchName(name);
    setFocusIdx(-2);
    setOpenModal(true);
  };

  useEffect(() => {
    const getCachedDataOrFetch = async () => {
      if (!searchName || RegExp(searchName)) return setSuggestions([]);

      checkExpiredCache();
      const caches = JSON.parse(localStorage.getItem(searchName));
      if (caches) return setSuggestions(caches.value);

      console.log("searchName: ", searchName);
      const searchResult = await fetchResults(searchName);
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
      <SearchIcon />
      <SearchButton />

      <SearchSuggestionModal openModal={openModal}>
        <StyledSearchSuggestionList>
          {suggestions?.length > 0 && searchName ? (
            suggestions?.map((suggestion, idx) => (
              <SearchSuggestionListItem
                key={suggestion.id}
                name={suggestion.name}
                focus={focusIdx === idx}
                handleMouseOver={() => setFocusIdx(idx)}
                handleMouseOut={() => setFocusIdx(-2)}
                setSearchName={setSearchName}
                searchRef={searchRef}
              />
            ))
          ) : (
            <span>검색어 없음</span>
          )}
        </StyledSearchSuggestionList>
      </SearchSuggestionModal>
    </StyledSearchBar>
  );
}
