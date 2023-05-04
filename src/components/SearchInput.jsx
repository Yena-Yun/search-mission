import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input`
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

SearchInput.propTypes = {
  searchName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  changeIdxNum: PropTypes.func.isRequired,
  focusResult: PropTypes.string.isRequired,
  setSearchName: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default function SearchInput({
  searchName,
  handleChange,
  changeIdxNum,
  focusResult,
  setSearchName,
  setOpenModal,
}) {
  useEffect(() => {
    setSearchName(focusResult);
  }, [focusResult, setSearchName]);

  return (
    <StyledInput
      type="text"
      placeholder="질환명을 입력해 주세요."
      onChange={handleChange}
      onKeyDown={changeIdxNum}
      value={searchName}
      onClick={() => setOpenModal(true)}
    />
  );
}
