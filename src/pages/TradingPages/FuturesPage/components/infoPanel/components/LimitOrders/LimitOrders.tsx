import { useEffect, useState } from "react"
import { Buttons, CloseButton, TBody, THead, Table, Td, Text, Th, Tr, Type } from "../../infoPanel.styles"
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";
import IWallet from "../../../../../../../interfaces/Wallet.interface";
import LoadingTable from "../../../../../../../components/Loading/LoadingTable";

interface ILimitOrders{
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
}

interface IOrders{
  id: number;
  type: string;
  pair: string;
  quantity: number;
  price: number;
  leverage: number;
  takeProfit: number;
  stopLoss: number;
}

const LimitOrders : React.FC<ILimitOrders> = ({ symbol, balance, fetchBalance }) => {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCloseOrder = async (id: number) => {
    try {
      const response = await api.get('/api/derivatives/limit/close/' + id);
      toast.success('Limit order canceled successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      fetchBalance();
    } catch (error) {
      console.error(error);
    }
  }

  const getOrders = async () => {
    try {
      const response = await api.get('/api/derivatives/limit/orders/pair/' + symbol?.toUpperCase());
      setOrders(response.data)
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getOrders();
  }, [balance, symbol])

  return(
    <>
      {
        loading 
        ? 
          <LoadingTable />
        :
          orders.length >= 1 
        ?
          <Table>
            <THead>
              <Tr>
                <Th>Type</Th>
                <Th>Pair</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Leverage</Th>
                <Th>Take Profit</Th>
                <Th>Stop Loss</Th>
                <Th>Actions</Th>
              </Tr>
            </THead>
            <TBody>
              {orders.map((item) => {
                return(
                <Tr>
                  <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3);'}>{item.type}</Type>
                  <Td>{item.pair}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.leverage}</Td>
                  <Td>{item.takeProfit || 0}</Td>
                  <Td>{item.stopLoss || 0}</Td>
                  <Buttons>
                    <CloseButton onClick={() => handleCloseOrder(item.id)}>Close</CloseButton>
                  </Buttons>
                </Tr>
                )
              })}
              
            </TBody>
          </Table>
        :
          <Text>
            You don't have any open limit orders.
          </Text>
      }
      
    </>
  )
}

export default LimitOrders;