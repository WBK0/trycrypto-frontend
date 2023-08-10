import { THead, Th, Tr } from "../../../transactionHistory/transactionHistory.styles";

// TableHead component - renders the table head for limit orders
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <Th width={4}>Type</Th>
        <Th width={4}>Pair</Th>
        <Th width={4}>Quantity</Th>
        <Th width={4}>Price</Th>
        <Th width={1}>Actions</Th>
      </Tr>
    </THead>
  )
}

export default TableHead;