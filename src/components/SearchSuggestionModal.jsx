import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSearchSuggestionModal = styled.div`
  background-color: white;
  width: 450px;
  min-height: 210px;
  max-height: 300px;
  position: absolute;
  top: 103px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: left;
  padding-left: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .modalText {
    color: #6a737b;
    font-size: 12px;
  }
`;

SearchSuggestionModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default function SearchSuggestionModal({ openModal, children }) {
  if (!openModal) return null;

  return (
    <StyledSearchSuggestionModal>
      <span className="modalText">추천 검색어</span>
      {children}
    </StyledSearchSuggestionModal>
  );
}
