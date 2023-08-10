import { THead, Th, Tr, TypeTh } from "../../../table.styles";

// TableHead component - renders the table head
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <TypeTh>Type</TypeTh>
        <Th>Pair</Th>
        <Th>Quantity</Th>
        <Th>Price</Th>
        <Th>Total cost</Th>
        <Th>Date</Th>
      </Tr>
    </THead>
  )
}

export default TableHead;