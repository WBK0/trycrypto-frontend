import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 15px;
  left: 5%;
  right: 5%;
  width: 90%;
  display: flex;
  justify-content: space-between;
`

export const Button = styled.button`
  width: 47.5%;
  background-color: ${props => props.color};
  color: white;
  border: none;
  padding: 5px 10px 5px 10px;
  border-radius: 4px;
  font-weight: 600;
`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background-color: var(--theme-primary);
  border-radius: 8px;
  padding: 25px;
  padding-top: 45px;
  min-width: 100%;
  min-height: 400px;
  bottom: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

interface IButton {
  orderType: 'buy' | 'sell';
}
export const OrderButton = styled.button<IButton>`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 36px;
  border-radius: 6px;
  background-color: ${(props) => props.orderType === 'buy' ? 'rgb(7, 119, 3)' : '#B62216'};
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  &:hover{
    background-color: ${(props) => props.orderType === 'buy' ? 'rgb(7, 100, 3)' : '#951409'};
  }
`