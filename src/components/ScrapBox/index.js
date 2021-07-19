import styled from "styled-components"

const ScrapBox = styled.div`
    background: #FFFFFF;
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    .subTitle {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 20px;
    }
    input, textarea {
        width: 100%;
        background-color: #F4F4F4;
        color: #333333;
        border: 0;
        padding: 14px 16px;
        margin-bottom: 14px;
        border-radius: 10000px;
    ::placeholder {
        color: #333333;
        opacity: 1;
    }
    }
    button {
        border: 0;
        padding: 8px 12px;
        color: #FFFFFF;
        border-radius: 10000px;
        background-color: #6F92BB;
    }
    .scrapContainer {
        width: 100%;
        border-radius: 8px;
        display: flex;
        flex-flow: row wrap;
        align-items: start;
        padding: 10px;
        margin: 5px 0;
        &:nth-child(2n) {
            background-color: #D9E6F6;
        }
        &::nth-child(1n) {
            background-color: #F1F9FE;
        }
    }
    .author {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
    }
    img {
        width: 60px;
        border-radius: 50%;
    }
    p {
        padding-top: 5px;
    }
    span {
        padding: 10px;
    }
`

export default ScrapBox