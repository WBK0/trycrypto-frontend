import { useEffect, useState } from "react";
import { Table, Text } from "../../infoPanel.styles";
import TableBody from "./components/TableBody/TableBody";
import { IPositions } from "../../../../FuturesPage";
import LoadingTable from "../../../../../../../components/Loading/LoadingTable";
import TableHead from "./components/TableHead/TableHead";
import useMarketData from "../../../../../../../hooks/useMarketData";

// PairPrice interface
interface IPairPrice{
  [x: string]: number;
}

// PositionsView interface
interface IPositionsView{
  positions: IPositions[];
  fetchPositions: () => void;
  fetchBalance: () => void;
  symbol?: string
}

// PositionsView component - renders the positions table
const PositionsView: React.FC<IPositionsView> = ({ positions, fetchPositions, fetchBalance, symbol }) => {
  // Initialising the state
  const [pairPrice, setPairPrice] = useState<IPairPrice>({})
  const [loading, setLoading] = useState(true)

  // Custom hook to get the getData function
  const { getData } = useMarketData('futures')

  // Use effect to get the pair price on component mount and every 4 seconds by interval
  useEffect(() => {
    getPairPrice();
    setInterval(async () => {
      getPairPrice()
    }, 4000);
  }, [])

  // Function to get the pair price from the api and set the state with the response data
  const getPairPrice = async () => {
    const response: IPairPrice[] = await getData('futures')
    let temp: Record<string, number> = {};
    for (let i = 0; i < response.length; i++) { 
      const currentObject = response[i];
      temp[currentObject.pair] = currentObject.lastPrice
    }
    setPairPrice(temp)
    setLoading(false)
  }
  
  return(
    <>
      {
        loading 
        ?
          <LoadingTable />
        :
        symbol && positions.filter((item) => item.pair.includes(symbol?.toUpperCase())).length >= 1 
        ? 
          <Table>
            <TableHead />
            <TableBody 
              positions={positions} 
              pairPrice={pairPrice} 
              fetchPositions={fetchPositions} 
              fetchBalance={fetchBalance}
              symbol={symbol}
            />
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