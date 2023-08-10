import { THead, Th, Tr } from "../../../../infoPanel.styles";
import { StatusTh } from "../../limitHistory.styles";

// TableHead component - renders the table head
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <StatusTh>Status</StatusTh>
        <Th>Type</Th>
        <Th>Pair</Th>
        <Th>Quantity</Th>
        <Th>Price</Th>
        <Th>Leverage</Th>
        <Th>Take Profit</Th>
        <Th>Stop Loss</Th>
        <Th>Start Date</Th>
        <Th>End Date</Th>
      </Tr>
    </THead>
  )
}

export default TableHead;