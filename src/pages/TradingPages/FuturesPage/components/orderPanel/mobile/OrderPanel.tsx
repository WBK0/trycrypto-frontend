import { Button, Wrapper } from "./orderPanel.styles";

const OrderPanelMobile = () => {
  return(
    <Wrapper>
      <Button color="green">
        BUY/LONG
      </Button>
      <Button color="red">
        SELL/SHORT
      </Button>
    </Wrapper>
  )
}

export default OrderPanelMobile;