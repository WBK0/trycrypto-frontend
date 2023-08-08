import { THead, Th, ThActions, Tr } from "../../tableSpotOrders.styles";

// TableHead component - renders the table head
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <Th>Type</Th>
        <Th>Pair</Th>
        <Th>Quantity</Th>
        <Th>Order price</Th>
        <Th>Pair price</Th>
        <Th>Leverage</Th>
        <Th>Take profit</Th>
        <Th>Stop loss</Th>
        <ThActions>Actions</ThActions>
      </Tr>
    </THead>
  )
}

export default TableHead;