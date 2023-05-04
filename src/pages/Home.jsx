import React, { useRef, useState } from "react";

import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import HeaderTitle from "../components/HeaderTitle";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cae9ff;
  text-align: center;
  line-height: 48px;
  height: 100vh;
  width: 100vw;
  margin-top: 50px;
  padding-top: 75px;
`;

export default function Home() {
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };

  return (
    <StyledHome ref={modalRef} onClick={modalOutSideClick}>
      <HeaderTitle />
      <SearchBar openModal={openModal} setOpenModal={setOpenModal} />
    </StyledHome>
  );
}
