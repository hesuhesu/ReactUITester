import React from 'react';
import styled from 'styled-components';
import Cards from '../Home/SecondHome/Cards.tsx';

const SecondHome: React.FC = () => {

  return (
    <SecondHomeContainer>
      <h2>TECH</h2>
      <Cards/>
      <h2>STACK</h2>
    </SecondHomeContainer>
  );
};

export default SecondHome;

const SecondHomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 7vw;
    font-weight: bold;
    width: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;