import { StatusTh, THead, Th, Tr, TypeTh } from "../../../table.styles";

// TableHead component - renders the table head
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <StatusTh>Status</StatusTh>
        <TypeTh>Type</TypeTh>
        <Th>Pair</Th>
        <Th>Quantity</Th>
        <Th>Price</Th>
        <Th>Total cost</Th>
        <Th>Open date</Th>
        <Th>Close date</Th>
      </Tr>
    </THead>
  )
}

export default TableHead;