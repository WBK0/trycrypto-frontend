import { DateTh, LeverageTh, PairTh, THead, Th, Tr, TypeTh } from "../../../../table.styles";

// TableHead component - renders the table head
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <TypeTh>Type</TypeTh>
        <PairTh>Pair</PairTh>
        <Th>Quantity</Th>
        <Th>Sold</Th>
        <LeverageTh>Leverage</LeverageTh>
        <Th>Purchase Price</Th>
        <Th>Selling Price</Th>
        <Th>PNL</Th>
        <DateTh>Date</DateTh>
      </Tr>
    </THead>
  )
}

export default TableHead;