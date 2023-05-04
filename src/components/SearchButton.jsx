import React from "react";
import styled from "styled-components";
// import SearchIcon from "../assets/icons/SearchIcon";

const StyledSearchButton = styled.button`
  border: none;
  background-color: #017be8;
  color: white;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 7px;
  padding-left: 7px;
  position: absolute;
  right: 8px;
  top: 40px;

  cursor: pointer;

  div {
    font-size: 25px;
    color: white;
  }
`;

export default function SearchButton() {
  return <StyledSearchButton>{/* <SearchIcon /> */}</StyledSearchButton>;
}
