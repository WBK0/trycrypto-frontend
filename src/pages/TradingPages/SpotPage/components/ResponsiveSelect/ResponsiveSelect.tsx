import { SelectButton, Wrapper } from "./responsiveSelect.styles";

interface IResponsiveSelect{
  showResponsive: string;
  setShowResponsive: (value: string) => void;
}

const ResponsiveSelect: React.FC<IResponsiveSelect> = ({ showResponsive, setShowResponsive }) => {
  return(
    <Wrapper>
      {/* <div style={{overflowX: 'scroll', width: '300px', display: 'flex'}}> */}
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
      <SelectButton 
        active={showResponsive == 'market' ? true : false} 
        onClick={() => setShowResponsive('market')}>
        Other Markets
      </SelectButton>
      {/* </div> */}
      
    </Wrapper>
  )
}

export default ResponsiveSelect;