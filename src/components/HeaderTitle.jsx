import React from "react";
import styled from "styled-components";

const StyledHeaderTitle = styled.div`
  font-size: 32px;
  font-weight: 650;
`;

export default function HeaderTitle() {
  return (
    <StyledHeaderTitle>
      국내 모든 임상시험 검색하고
      <br /> 온라인으로 참여하기
    </StyledHeaderTitle>
  );
}
