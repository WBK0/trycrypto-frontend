import IWallet from "../../../../../interfaces/Wallet.interface";
import { Header, Wrapper, Flex, AssetContainer, CryptoSymbol, Quantity, LoginLink, LinkContainer } from "./assets.styles";

interface IAssets{
  wallet?: IWallet;
}

const Assets: React.FC<IAssets> = ({ wallet }) => {
  return(
    <Wrapper>
      <Flex>
        <Header>SPOT Assets</Header>
        {wallet ? Object.entries(wallet.spotBalance).map(([symbol, quantity]) => {
          if(quantity != 0){
            return (
              <AssetContainer key={symbol}>
                <CryptoSymbol>{symbol.replace('USDT', '')}</CryptoSymbol>
                <Quantity>{Number(quantity).toFixed(1)}</Quantity>
              </AssetContainer>
            );
          }
          })
          :
          <AssetContainer>
            <LinkContainer>
              <LoginLink to='/login'>Login</LoginLink> or <LoginLink to='/register'>Register</LoginLink>
            </LinkContainer>
          </AssetContainer>
         }
      </Flex>
    </Wrapper>
  )
}

export default Assets;