import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { NoOpened,  Table, TableWrapper, Wrapper } from "../tableSpotOrders.styles";
import CloseModal from "./Modals/CloseModal";
import UpdateModal from "./Modals/UpdateModal";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";

// Interface for the Futures Positions
export interface IFuturesPositions{
  id: number;
  type: string;
  pair: string;
  purchasePrice: number;
  quantity: number;
  takeProfit: number;
  stopLoss: number;
  liquidationPrice: number;
  leverage: number;
}

// Table Futures Positions interface
interface ITableFuturesPositions {
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
}

// TableFuturesPositions component - renders the futures positions table
const TableFuturesPositions: React.FC<ITableFuturesPositions> = ({ prices }) => {
  // Initialising the state
  const [futuresPositions, setFuturesPositions] = useState<IFuturesPositions[]>([])
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [modalItem, setModalItem] = useState<IFuturesPositions>()

  // Function to handle closing the closing position modal 
  const handleCloseModal = () => {
    setShowCloseModal(false)
  }

  // Function to handle closing the update position modal
  const handleUpdateModal = () => {
    setShowUpdateModal(false)
  }

  // Function to get the futures positions from the api 
  const getFuturesPositions = async () => {
    try {
      const response = await api.get('/api/positions/futures');
      setFuturesPositions(response.data)
    } catch (error) { 
      console.log(error)
    }
  }

  // Function to open the close modal
  const openCloseModal = async (item: IFuturesPositions) => {
    setShowCloseModal(true);
    setModalItem(item);
  }

  // Function to open the update modal
  const openUpdateModal = async (item: IFuturesPositions) => {
    setShowUpdateModal(true);
    setModalItem(item);
  }

  // Function to get futures positions on the mount
  useEffect(() => {
    getFuturesPositions();
  }, [])

  return(
    <Wrapper>
      <TableWrapper>
        {
          futuresPositions.length == 0
          ? <NoOpened>You don't have any open positions in the futures market</NoOpened>
          : <Table>
              <TableHead />
              <TableBody
                prices={prices}
                futuresPositions={futuresPositions}
                openCloseModal={openCloseModal}
                openUpdateModal={openUpdateModal}
              />
            </Table>
          } 
      </TableWrapper>
      {showCloseModal && modalItem && (
        <CloseModal onClose={handleCloseModal} fetchPositions={getFuturesPositions} modalItem={modalItem} pairPrice={prices[modalItem.pair.toUpperCase()]?.lastPrice} />
      )}
      {showUpdateModal && modalItem && (
        <UpdateModal onClose={handleUpdateModal} modalItem={modalItem} pairPrice={prices[modalItem.pair.toUpperCase()]?.lastPrice} fetchPositions={getFuturesPositions}/>
      )}
    </Wrapper>
  )
}

export default TableFuturesPositions;