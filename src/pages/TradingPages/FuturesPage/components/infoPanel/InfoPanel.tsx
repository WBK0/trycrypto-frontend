import { useEffect, useState } from "react";
import api from "../../../../../services/api";
import { SelectBar, SelectButton, THead, Table, Th, Tr, Wrapper } from "./infoPanel.styles";
import getData from "../../../../../components/Markets/services/getData";
import TableBody from "./components/TableBody";

export interface IPositions{
  type: string;
  pair: string;
  leverage: number;
  quantity: number;
  purchasePrice: number;
  takeProfit?: number;
  stopLoss?: number;
  liquidationPrice: number;
}

interface IPairPrice{
  [x: string]: number;
}

const InfoPanel = () => {
  const [positions, setPositions] = useState<IPositions[]>([])
  const [pairPrice, setPairPrice] = useState<IPairPrice>({})
useEffect(() => {
  setTimeout(async () => {
    const response: IPairPrice[] = await getData('futures')
    console.log(response)
    let temp: Record<string, number> = {};
    for (let i = 0; i < response.length; i++) {
      const currentObject = response[i];
      temp[currentObject.pair] = currentObject.lastPrice
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
        <TableBody positions={positions} pairPrice={pairPrice} />
      </Table>
    </Wrapper>
  )
}

export default InfoPanel;