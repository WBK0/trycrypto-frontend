import { useEffect, useState } from "react";
import api from "../../../../../../services/api";
import { TBody, THead, Table, TableWrapper, Td, Th, Tr, Wrapper } from "../transactionHistory/transactionHistory.styles";
import { CancelButton, EmptyOrdersHeader, MoreOrders, OrdersHeader, OrdersLink } from "./limitOrders.styles";
import { toast } from "react-toastify";
import IWallet from "../../../../../../interfaces/Wallet.interface";
import TableHead from "./components/TableHead/TableHead";
import TableBody from "./components/TableBody/TableBody";

// Interface for the limit orders
export interface IOrders{
  id: number;
  type: string;
  pair: string;
  quantity: number;
  price: number;
}

// LimitOrders interface
interface ILimitOrders{
  wallet?: IWallet;
  symbol?: string;
  fetchBalance: () => void;
}

// LimitOrders component - renders the limit orders table
const LimitOrders: React.FC<ILimitOrders> = ({ wallet, symbol, fetchBalance }) => {
  // Initialising the state
  const [limitOrders, setLimitOrders] = useState<IOrders[]>([])

  // Function to get the limit orders from the api
  const getOrders = async () => {
    try {
      const result = await api.get('/api/spot/limit/orders/pair/' + symbol?.toUpperCase())
      setLimitOrders(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  // UseEffect to get the limit orders on component mount
  useEffect(() => {
    getOrders();
  }, [wallet, symbol])

  return(
    <Wrapper>
      {Array.isArray(limitOrders) && limitOrders.length == 0 || !limitOrders 
      ? <EmptyOrdersHeader>Currently nothing to display, trade the cryptocurrency pair with limit orders to add to the orders list</EmptyOrdersHeader>
      :
      <TableWrapper>
        <Table>
          <TableHead />
          <TableBody 
            limitOrders={limitOrders}
            fetchBalance={fetchBalance}
          />
        </Table>
        <MoreOrders>
          <OrdersHeader>Wanna see all orders?</OrdersHeader>
          <OrdersLink to='/positions/spot/orders'>See more</OrdersLink>
        </MoreOrders>
      </TableWrapper>
      }
    </Wrapper>
  )
}

export default LimitOrders;