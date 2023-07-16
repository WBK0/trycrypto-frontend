import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 200px;
`

export const MoreOrders = styled.div`
  color: white;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
`

export const OrdersHeader = styled.span`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`

export const OrdersLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 500;
  background-color: var(--font-yellow);
  padding: 4px 15px 4px 15px;
  border-radius: 6px;
  margin-top: 5px;
  &:hover{
    color: var(--font-yellow);
    background-color: transparent;
  }
  margin-bottom: 20px;
`

export const EmptyOrdersHeader = styled.span`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgb(150, 150, 150);
  font-weight: 500;
  padding-left: 12px;
  padding-right: 12px;
`

export const CancelButton = styled.button`
  border: none;
  background-color: rgb(182, 34, 22);
  color: white;
  padding: 3px 10px 3px 10px;
  font-weight: 500;
  font-size: 14px;
  border-radius: 5px;
`