import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;