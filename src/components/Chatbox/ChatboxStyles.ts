import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';

const slider = keyframes`
0%{
    height: 0vh;
}
  25%{
    height: 20vh;
  }
  50%{
    height: 40vh;
  }
  75%{
    height: 60vh;
  }
  100%{
    height:78vh;
  }
`
export const StyledContainer = styled.div`
width: 80vw;
padding: 10px;
height: 78vh;
border: 2px solid black;
margin: auto;
align-items: center;
border-radius: 15px;
background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
animation-name: ${slider};
animation-duration: 1.5s;
animation-timing-function: linear;
`;
export const StyledHeading = styled.h1`
text-align: center;
color: white;
font-family: Courier;
font-size: 50px;
`;


