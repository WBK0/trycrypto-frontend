import IWallet from "../../../../interfaces/Wallet.interface";
import { ContentRow, ContentWrapper, Header, HeaderWrapper, Pair, Quantity, Type, Wrapper } from "./cryptoAssets.styles";

interface ICryptoAssets{
  instrument: string;
  type?: 'long' | 'short';
  balance?: IWallet;
}

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
          {Object.entries(instrument === 'spot' ? balance.spotBalance : type ? balance.futureBalance[type] : {}).map(([key, value]) => (
            value > 0 ?
            <ContentRow key={key}>
              <Pair>{key}</Pair>
              <Quantity>{value}</Quantity>
            </ContentRow>
            : 
            null
          ))}
        </ContentWrapper>
      )}
    </Wrapper>
  )
}

export default CryptoAssets;