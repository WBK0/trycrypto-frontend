import IWallet from "../../../../interfaces/Wallet.interface";
import { ContentRow, ContentWrapper, Header, HeaderWrapper, NoAssets, Pair, Quantity, Type, Wrapper } from "./cryptoAssets.styles";

interface ICryptoAssets{
  instrument: string;
  type?: 'long' | 'short';
  balance?: IWallet;
}

const CryptoAssets : React.FC<ICryptoAssets> = ({ instrument, type, balance }) => {
  console.log(balance?.futureBalance ? '1' : '0')
  return(
    <Wrapper>
      <HeaderWrapper>
        <Header>
          {instrument} assets
        </Header>
        <Type type={type}>
          {type}
        </Type>
      </HeaderWrapper>
      {balance && (
        <ContentWrapper>
          {Object.entries(instrument === 'spot' && balance.spotBalance ? balance.spotBalance : type && balance.futureBalance && balance.futureBalance[type] ? balance.futureBalance[type] : {}).map(([key, value]) => (
            value > 0 ?
            <ContentRow key={key}>
              <Pair>{key}</Pair>
              <Quantity>{value}</Quantity>
            </ContentRow>
            : 
            null
          ))}
          {
            instrument == 'spot' && !balance.spotBalance 
            ? <NoAssets>You don't have any cryptocurrencies on the spot market</NoAssets>
            : 
            instrument == 'futures' && !balance.futureBalance
            ? <NoAssets>You don't have any open {type?.toUpperCase()} positions on the futures market</NoAssets>
            : null
          }
        </ContentWrapper>
      )}
    </Wrapper>
  )
}

export default CryptoAssets;