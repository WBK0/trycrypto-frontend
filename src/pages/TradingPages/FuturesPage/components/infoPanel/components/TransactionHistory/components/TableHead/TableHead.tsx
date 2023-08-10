import { THead, Th, Tr } from "../../../../infoPanel.styles";

// TableHead component - renders the table head for TransactionHistory
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <Th>Type</Th>
        <Th>Pair</Th>
        <Th>Quantity</Th>
        <Th>Sold</Th>
        <Th>Leverage</Th>
        <Th>PurchasePrice</Th>
        <Th>SellingPrice</Th>
        <Th>PNL</Th>
        <Th>Date</Th>
      </Tr>
    </THead>
  )
}

export default TableHead;