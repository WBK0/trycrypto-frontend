import { THead, Th, Tr } from "../../../../infoPanel.styles";

// TableHead component - renders the table head
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <Th>Type</Th>
        <Th>Pair</Th>
        <Th>Quantity</Th>
        <Th>Price</Th>
        <Th>Leverage</Th>
        <Th>Take Profit</Th>
        <Th>Stop Loss</Th>
        <Th>Actions</Th>
      </Tr>
    </THead>
  )
}

export default TableHead;