import { THead, Th, ThActions, Tr } from "../../tableSpotOrders.styles"

// TableHead component - renders the table head
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <Th></Th>
        <Th>Type</Th>
        <Th>Pair</Th>
        <Th>Quantity</Th>
        <Th>Purchase price</Th>
        <Th>Pair price</Th>
        <Th>PNL</Th>
        <ThActions>Actions</ThActions>
      </Tr>
    </THead>
  )
}

export default TableHead;