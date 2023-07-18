import { useEffect, useState } from "react"
import { Buttons, CloseButton, TBody, THead, Table, Td, Text, Th, Tr, Type } from "../../infoPanel.styles"
import api from "../../../../../../../services/api";
import { toast } from "react-toastify";
import IWallet from "../../../../../../../interfaces/Wallet.interface";
import { Status, StatusTh } from "./limitHistory.styles";

interface IHistoryOrders{
  symbol?: string;
  balance?: IWallet;
  fetchBalance: () => void;
}

interface IOrders{
  id: number;
  status: string;
  type: string;
  pair: string;
  quantity: number;
  price: number;
  leverage: number;
  takeProfit: number;
  stopLoss: number;
  startDate: string;
  endDate: string;
}

const HistoryOrders : React.FC<IHistoryOrders> = ({ symbol, balance, fetchBalance }) => {
  const [orders, setOrders] = useState<IOrders[]>([]);

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
      const response = await api.get('/api/derivatives/limit/history/pair/' + symbol?.toUpperCase());
      setOrders(response.data)
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
        orders.length >= 1 ?
        <Table>
          <THead>
            <Tr>
              <StatusTh>Status</StatusTh>
              <Th>Type</Th>
              <Th>Pair</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Leverage</Th>
              <Th>Take Profit</Th>
              <Th>Stop Loss</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
            </Tr>
          </THead>
          <TBody>
            {orders.map((item) => {
              const startDate = new Date(item.startDate).toLocaleString();
              let endDate;
              if(item.endDate){
                endDate = new Date(item.endDate).toLocaleString();
              }
              return(
              <Tr>
                <Status color={item.status}>
                  {
                    item.status == 'active' && <i className="bi bi-three-dots"></i> ||
                    item.status == 'filled' && <i className="bi bi-check"></i> ||
                    item.status == 'canceled' && <i className="bi bi-x"></i>
                  }
                </Status>
                <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3);'}>{item.type}</Type>
                <Td>{item.pair}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.price}</Td>
                <Td>{item.leverage}</Td>
                <Td>{item.takeProfit || 0}</Td>
                <Td>{item.stopLoss || 0}</Td>
                <Td>{startDate}</Td>
                <Td>{endDate || 'Not closed'}</Td>
              </Tr>
              )
            })}
          </TBody>
        </Table>
      :
      <Text>You don't have any open limit orders.</Text>
      }
      
    </>
  )
}

export default HistoryOrders;