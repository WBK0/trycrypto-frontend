import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 150px;
  padding-bottom: 150px;
`

export const Header = styled.h4`
  color: white;
  font-size: 40px;
  font-family: 'Gilroy-Heavy';
  margin-bottom: 50px;
`

export const Question = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 90px;
  padding: 5px 0px 5px 0px;
  font-family: 'Gilroy-Bold';
  cursor: pointer !important;

  &::before, &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgb(120, 120, 120);
  }

  &::before {
    top: 0px;
  }
`

export const Text = styled.span`
  color: rgb(210, 210, 210);
  font-size: 22px;
`

export const ShowAnswer = styled.span`
  font-size: 50px;
  color: rgb(230, 230, 230);
  padding-right: 20px;
`

interface IAnswer{
  showAnswer: boolean,
  answerId: number
}

export const Answer = styled.div<IAnswer>`
  color: rgb(150, 150, 150);
  padding: ${({ showAnswer }) => (showAnswer ? '10px' : "0px")};
  font-family: 'Gilroy-Medium';
  max-height: ${({ showAnswer, answerId }) => (showAnswer ? `${getScrollHeight(answerId) + 20}px` : "0")};
  opacity: ${({ showAnswer }) => (showAnswer ? "1" : "0")};
  overflow: hidden;
  transition: max-height 0.75s, opacity 0.75s, padding 0.75s;
  @media screen and (min-width: 800px){
    padding: ${({ showAnswer }) => (showAnswer ? '30px' : "0px")};
    max-height: ${({ showAnswer, answerId }) => (showAnswer ? `${getScrollHeight(answerId) + 60}px` : "0")};

  }
`

function getScrollHeight(id : number) {
  const element = document.getElementById(`temp-answer${id}`);
  return element ? element.scrollHeight : 0;
}