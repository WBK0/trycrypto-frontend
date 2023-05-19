import { useEffect, useState } from "react";
import api from "../../../../../services/api";
import { SelectBar, SelectButton, THead, Table, Th, Tr, Wrapper } from "./infoPanel.styles";
import getData from "../../../../../components/Markets/services/getData";
import TableBody from "./components/TableBody";
import { IPositions } from "../../FuturesPage";



interface IPairPrice{
  [x: string]: number;
}

interface IInfoPanel{
  fetchBalance: () => void
  positions: IPositions[];
  fetchPositions: () => void;
}

const InfoPanel: React.FC<IInfoPanel> = ({ fetchBalance, positions, fetchPositions }) => {
  const [pairPrice, setPairPrice] = useState<IPairPrice>({})
useEffect(() => {
  setInterval(async () => {
    const response: IPairPrice[] = await getData('futures')
    let temp: Record<string, number> = {};
    for (let i = 0; i < response.length; i++) {
      const currentObject = response[i];
      temp[currentObject.pair] = currentObject.lastPrice
    }
    setPairPrice(temp)
  }, 4000);
}, [])
  
  
  
  useEffect(() => {
    fetchPositions()
  }, [])

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
            <Th>Actions</Th>
          </Tr>
        </THead>
        <TableBody positions={positions} pairPrice={pairPrice} fetchPositions={fetchPositions} fetchBalance={fetchBalance}/>
      </Table>
    </Wrapper>
  )
}

export default InfoPanel;