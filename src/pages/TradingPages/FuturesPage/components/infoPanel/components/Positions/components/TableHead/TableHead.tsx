import { THead, Th, Tr } from "../../../../infoPanel.styles";

// TableHead component - renders the table head for positions table
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <Th>Type</Th>
        <Th>Pair</Th>
        <Th>Leverage</Th>
        <Th>Quantity</Th>
        <Th>Purchase Price</Th>
        <Th>Price</Th>
        <Th>PNL</Th>
        <Th>Take Profit</Th>
        <Th>Stop Loss</Th>
        <Th>Liquidation Price</Th>
        <Th>Actions</Th>
      </Tr>
    </THead>
  )
}

export default TableHead;