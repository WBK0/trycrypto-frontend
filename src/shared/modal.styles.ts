import styled from "styled-components";

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
  width: 400px;
  min-height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const Close = styled.button`
  position: absolute;
  top: 6px;
  right: 5px;
  background-color: transparent;
  color: white;
  border: none;
  font-weight: bolder;
`