import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SearchSuggestionListItem from "./SearchSuggestionListItem";

const StyledSearchSuggestionList = styled.ul`
  margin-top: -10px;
  margin-left: -19px;

  & > span {
    margin-left: 19px;
  }
`;

SearchSuggestionList.propTypes = {
  focusIdx: PropTypes.number.isRequired,
  suggestions: PropTypes.array.isRequired,
  setSearchName: PropTypes.func.isRequired,
};

export default function SearchSuggestionList({
  focusIdx,
  suggestions,
  setSearchName,
}) {
  return (
    <StyledSearchSuggestionList>
      {suggestions.length === 0 ? (
        <span>검색어 없음</span>
      ) : (
        suggestions.map((suggestion, idx) => (
          <SearchSuggestionListItem
            key={suggestion.id}
            name={suggestion.name}
            focus={focusIdx === idx}
            setSearchName={setSearchName}
          />
        ))
      )}
    </StyledSearchSuggestionList>
  );
}
