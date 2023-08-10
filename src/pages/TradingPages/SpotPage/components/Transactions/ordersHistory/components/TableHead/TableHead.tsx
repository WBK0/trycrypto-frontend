import { THead, Th, Tr } from "../../../transactionHistory/transactionHistory.styles";

// TableHead component - renders the table head for the orders history 
const TableHead = () => {
  return(
  <THead>
      <Tr>
        <Th width={0}>Status</Th>
        <Th width={1}>Type</Th>
        <Th width={1}>Pair</Th>
        <Th width={1}>Quantity</Th>
        <Th width={1}>Price</Th>
        <Th width={1}>Total cost</Th>
        <Th width={1}>Open date</Th>
        <Th width={1}>Close date</Th>
      </Tr>
    </THead>
  )
}

export default TableHead;