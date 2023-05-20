import { useEffect, useState } from "react";
import { THead, Table, Th, Tr, Text } from "../../infoPanel.styles";
import TableBody from "../TableBody";
import getData from "../../../../../../../components/Markets/services/getData";
import { IPositions } from "../../../../FuturesPage";

interface IPairPrice{
  [x: string]: number;
}

interface IPositionsView{
  positions: IPositions[];
  fetchPositions: () => void;
  fetchBalance: () => void;
}

const PositionsView: React.FC<IPositionsView> = ({ positions, fetchPositions, fetchBalance}) => {
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

  return(
    <>
      {
        positions.length >= 1 ? 
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
        :
        <Text>
          You don't have any open positions yet
        </Text>
      }
    </>
  )
}

export default PositionsView;