import { THead, Th, Tr } from "../../transactionHistory.styles";

// TableHead component - renders the table head for the transaction history
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <Th width={16.66}>
          Type
        </Th>
        <Th width={16.66}>
          Pair
        </Th>
        <Th width={16.66}>
          Quantity
        </Th>
        <Th width={16.66}>
          Price
        </Th>
        <Th width={16.66}>
          Total price
        </Th>
        <Th width={16.66}>
          Date
        </Th>
      </Tr>
    </THead>
  )
}

export default TableHead;