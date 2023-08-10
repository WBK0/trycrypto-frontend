import { useContext, useState } from "react";
import IWallet from "../../../../../interfaces/Wallet.interface";
import TransactionHistory from "./transactionHistory/TransactionHistory";
import { HeadingSelect, SelectButton, Wrapper } from "./transactions.styles";
import AuthContext from "../../../../../contexts/AuthContext";
import LoginView from "./loginView/loginView";
import LimitOrders from "./limitOrders/LimitOrders";
import OrdersHistory from "./ordersHistory/OrdersHistory";

// Transactions interface
interface ITransaction{
  wallet?: IWallet;
  symbol?: string;
  fetchBalance: () => void;
}

// Transactions component - renders the transactions component
const Transactions: React.FC<ITransaction> = ({ wallet, symbol, fetchBalance }) => {
  // Set the transaction view
  const [transactionView, setTransactionView] = useState<Number>(0);

  // Get the logged in state
  const { isLoggedIn } = useContext(AuthContext);

  // Handle change value of the transaction view
  const HandleChangeView = (view: Number) => {
    setTransactionView(view);
  }

  return(
    <Wrapper>
      <HeadingSelect>
        <SelectButton active={transactionView == 0 ? true : false} onClick={() => HandleChangeView(0)}>       
          <span>Transaction </span>
          <span>History</span>
        </SelectButton>
        <SelectButton active={transactionView == 1 ? true : false} onClick={() => HandleChangeView(1)}>
          <span>Active </span>
          <span>Orders</span>
        </SelectButton>
        <SelectButton active={transactionView == 2 ? true : false} onClick={() => HandleChangeView(2)}>
          <span>Orders </span>
          <span>History</span>
        </SelectButton>
      </HeadingSelect>
      {
        isLoggedIn ?
      (() => {
          switch (transactionView) {
            case 0:
              return(
                <TransactionHistory 
                  wallet={wallet} 
                  symbol={symbol}
                />
              )
            case 1:
              return(
                <LimitOrders 
                  wallet={wallet}
                  symbol={symbol}
                  fetchBalance={fetchBalance}
                />
              )
            case 2:
              return(
                <OrdersHistory 
                  wallet={wallet}
                  symbol={symbol}
                />
              )
            default:
              console.warn(`Unexpected step value: ${transactionView}`);
              return null
          }
        })()
      :
        <LoginView />
      }      
      
    </Wrapper>
  )
}

export default Transactions;