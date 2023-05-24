import { SelectButton, Wrapper } from "./responsiveSelect.styles";

interface IResponsiveSelect{
  showResponsive: string;
  setShowResponsive: (value: string) => void;
}

const ResponsiveSelect: React.FC<IResponsiveSelect> = ({ showResponsive, setShowResponsive }) => {
  return(
    <Wrapper>
      <SelectButton 
        active={showResponsive == 'chart' ? true : false} 
        onClick={() => setShowResponsive('chart')}>
        Chart
      </SelectButton>
      <SelectButton 
        active={showResponsive == 'orderBook' ? true : false} 
        onClick={() => setShowResponsive('orderBook')}>
        Order Book
      </SelectButton>
      <SelectButton 
        active={showResponsive == 'trades' ? true : false} 
        onClick={() => setShowResponsive('trades')}>
        Last Trades
      </SelectButton>     
    </Wrapper>
  )
}

export default ResponsiveSelect;