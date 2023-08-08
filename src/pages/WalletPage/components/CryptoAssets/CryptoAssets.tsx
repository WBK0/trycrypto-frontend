import IWallet from "../../../../interfaces/Wallet.interface";
import { ContentRow, ContentWrapper, Header, HeaderWrapper, NoAssets, Pair, Quantity, Type, Wrapper } from "./cryptoAssets.styles";

// Interface crypto assets
interface ICryptoAssets{
  instrument: string;
  type?: 'long' | 'short';
  balance?: IWallet;
}

// The CryptoAssets component - renders the user's crypto assets
const CryptoAssets : React.FC<ICryptoAssets> = ({ instrument, type, balance }) => {
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
          {/* Map through the user's assets and display them */}
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
            // If the user doesn't have any assets on the spot market, display a message
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