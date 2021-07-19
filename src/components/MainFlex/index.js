import styled from "styled-components"

const MainFlex = styled.main`
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  grid-gap: 10px;
  
  @media(min-width: 860px) {
    max-width: 1110px;
    display: flex;
    justify-content: space-between;
  }
`

export default MainFlex
