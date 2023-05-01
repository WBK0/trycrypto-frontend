import { SelectButton, Wrapper } from "./responsiveSelect.styles";

const ResponsiveSelect = ({ showResponsive, setShowResponsive }) => {
  return(
    <Wrapper>
      <SelectButton active={showResponsive == 'chart' ? true : false} onClick={() => setShowResponsive('chart')}>
        Chart
      </SelectButton>
      <SelectButton active={showResponsive == 'orderBook' ? true : false} onClick={() => setShowResponsive('orderBook')}>
        Order Book
      </SelectButton>
      <SelectButton active={showResponsive == 'trades' ? true : false} onClick={() => setShowResponsive('trades')}>
        Last Trades
      </SelectButton>
      <SelectButton active={showResponsive == 'market' ? true : false} onClick={() => setShowResponsive('market')}>
        Other Markets
      </SelectButton>
    </Wrapper>
  )
}

export default ResponsiveSelect;