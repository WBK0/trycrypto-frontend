import { useEffect, useState } from "react";
import api from "../../../../../services/api";
import { InputTd, Pnl, PnlText, PositionsPanel, SelectBar, SelectButton, TBody, THead, Table, Td, Th, Tr, Type, Wrapper } from "./infoPanel.styles";
import getData from "../../../../../components/Markets/services/getData";

const InfoPanel = () => {
  const [positions, setPositions] = useState([])
  const [pairPrice, setPairPrice] = useState({})
useEffect(() => {
  setTimeout(async () => {
    const response = await getData('futures')
    const mergedObject = {};
    let temp = {};
    for (let i = 0; i < response.length; i++) {
      
      const currentObject = response[i];
      const keys = Object.keys(currentObject);
      // const pair = 
      temp[currentObject.pair] = currentObject.lastPrice
      // temp[key] = currentObject[key];
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];        
      }
    }

    setPairPrice(temp)
  }, 4000);
}, [])
  
  const fetchPositions = async () => {
    const response = await api.get('/api/positions/futures', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    setPositions(response.data)
  }
  
  useEffect(() => {
    fetchPositions()
  }, [])
  console.log(positions)
  return(
    <Wrapper>
      <SelectBar>
        <SelectButton active={true}>Positions</SelectButton>
        <SelectButton active={false}>Transaction History</SelectButton>
      </SelectBar>
      <Table>
        <THead>
          <Tr>
            <Th>Type</Th>
            <Th>Pair</Th>
            <Th>Leverage</Th>
            <Th>Quantity</Th>
            <Th>Purchase Price</Th>
            <Th>Price</Th>
            <Th>PNL</Th>
            <Th>Take Profit</Th>
            <Th>Stop Loss</Th>
            <Th>Liquidation Price</Th>
            <Th>Close</Th>
          </Tr>
        </THead>
        <TBody>
          {positions.map((item) => {
            return(
              <Tr>
                <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3);'}>{item.type}</Type>
                <Td>{item.pair}</Td>
                <Td>{item.leverage}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.purchasePrice}</Td>
                <Td>{pairPrice[item.pair]}</Td>
                <Pnl><PnlText>{item.type == 'LONG' ? ((pairPrice[item.pair] - item.purchasePrice) * item.leverage).toFixed(2) : ((item.purchasePrice - pairPrice[item.pair]) * item.leverage).toFixed(2)} </PnlText><PnlText>+10%</PnlText></Pnl>
                <Td><InputTd defaultValue={item.takeProfit || 0}/></Td>
                <Td><InputTd defaultValue={item.stopLoss || 0}/></Td>
                <Td>{item.liquidationPrice.toFixed(2)}</Td>
                <Td><button>close</button></Td>
              </Tr>
            )
            
          })}
         
        </TBody>
      </Table>
    </Wrapper>
  )
}

export default InfoPanel;