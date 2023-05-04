import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useSuggestionFocus from "../hooks/useSuggestionFocus";
import SearchIcon from "../assets/icons/SearchIcon";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import SearchSuggestionModal from "./SearchSuggestionModal";
import useSearchSuggestions from "../hooks/useSearchSuggestions";

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

SearchBar.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default function SearchBar({ openModal, setOpenModal }) {
  const { searchName, handleChange, setSearchName, suggestions } =
    useSearchSuggestions();
  const { changeIdxNum, focusIdx, focusResult } =
    useSuggestionFocus(suggestions);

  return (
    <StyledSearchBar>
      <SearchInput
        searchName={searchName}
        handleChange={handleChange}
        changeIdxNum={changeIdxNum}
        focusResult={focusResult}
        setSearchName={setSearchName}
        setOpenModal={setOpenModal}
      />
      {searchName.length > 0 ? null : <SearchIcon />}
      <SearchButton />
      {openModal ? (
        <SearchSuggestionModal
          focusIdx={focusIdx}
          suggestions={suggestions}
          setSearchName={setSearchName}
        />
      ) : null}
    </StyledSearchBar>
  );
}
