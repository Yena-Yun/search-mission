import React from "react";
import styled from "styled-components";
import SearchIcon from "../assets/icons/SearchIcon";
import PropTypes from "prop-types";

const StyledSearchSuggestionListItem = styled.li`
  background-color: ${(props) => (props.focus ? "#eeeeee;" : null)};
  line-height: 40px;
  display: flex;
  padding-left: 20px;
  cursor: pointer;

  div:first-child {
    margin-top: 1px;
    color: #a6afb7;
  }

  span {
    margin-left: 9px;
  }
`;

SearchSuggestionListItem.propTypes = {
  name: PropTypes.string.isRequired,
  focus: PropTypes.bool.isRequired,
  setSearchName: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  searchRef: PropTypes.object,
};

export default function SearchSuggestionListItem({
  name,
  focus,
  setSearchName,
  handleMouseOver,
  handleMouseOut,
  searchRef,
}) {
  const modalOutSideClick = (e) => {
    if (e.target) setSearchName(name);
  };

  return (
    <StyledSearchSuggestionListItem
      focus={focus}
      onClick={modalOutSideClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      ref={focus ? searchRef : null}
    >
      <SearchIcon />
      <span>{name}</span>
    </StyledSearchSuggestionListItem>
  );
}
