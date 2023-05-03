import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cae9ff;
  text-align: center;
  line-height: 48px;
  height: 430px;
  width: 100vw;
  margin-top: 50px;
  padding-top: 75px;

  .headerText {
    font-size: 32px;
    font-weight: 650;
  }
`;

export default function Home() {
  return (
    <StyledHome>
      <span className="headerText">
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </span>
      <SearchBar />
    </StyledHome>
  );
}
