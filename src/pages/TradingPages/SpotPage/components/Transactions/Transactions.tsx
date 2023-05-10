import { useContext, useState } from "react";
import IWallet from "../../../../../interfaces/Wallet.interface";
import TransactionHistory from "./transactionHistory/TransactionHistory";
import { HeadingSelect, SelectButton, Wrapper } from "./transactions.styles";
import AuthContext from "../../../../../contexts/AuthContext";
import LoginView from "./loginView/loginView";
import LimitOrders from "./limitOrders/LimitOrders";

interface ITransaction{
  wallet?: IWallet;
  symbol?: string
}

const Transactions: React.FC<ITransaction> = ({ wallet, symbol }) => {
  const [transactionView, setTransactionView] = useState<Number>(0);

  const { isLoggedIn } = useContext(AuthContext);

  const HandleChangeView = (view: Number) => {
    setTransactionView(view);
  }

  return(
    <Wrapper>
      <HeadingSelect>
        <SelectButton active={transactionView == 0 ? true : false} onClick={() => HandleChangeView(0)}>Transaction History</SelectButton>
        <SelectButton active={transactionView == 1 ? true : false} onClick={() => HandleChangeView(1)}>Orders History</SelectButton>
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
                <LimitOrders />
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