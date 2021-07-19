import styled from 'styled-components'

const CommunityBox = styled.div`
    background: #FFFFFF;
    border-radius: 8px;
    padding: 16px;
    height: fit-content;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center ;
    list-style: none;
  }
  li {
    width: 22%;
    height: 300px;
    padding: 10px;
    display: flex;
  }
  img {
    //object-fit: cover;
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: relative;
  }
  ul li a {
    display: inline;
    //height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #FFFFFF;
      font-size: 15px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background: linear-gradient(0deg,#00000073,transparent);
    }
    .smallTitle {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 20px;
    }
  }
`;

export default CommunityBox