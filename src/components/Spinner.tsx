import React from 'react';
import styled from 'styled-components';


const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(214, 230, 245, 0.925);

  div {
    font-size: 20px;
    font-weight: bold;
    color:#282c34;
  }
`;

const SpinnerImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover; /* 불필요한 크기 조정을 방지 */
`;

const Spinner = () => (
  <SpinnerWrapper>
    <div>데이터 로딩 중..</div>
    <SpinnerImage src="/spinning.gif" alt="Loading..." />
  </SpinnerWrapper>
);

export default Spinner;