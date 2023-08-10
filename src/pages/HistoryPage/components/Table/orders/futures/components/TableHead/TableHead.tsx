import { DateTh, LeverageTh, PairTh, StatusTh, THead, Th, Tr, TypeTh } from "../../../../table.styles";

// TableHead component - renders the table head
const TableHead = () => {
  return(
    <THead>
      <Tr>
        <StatusTh>Status</StatusTh>
        <TypeTh>Type</TypeTh>
        <PairTh>Pair</PairTh>
        <Th>Quantity</Th>
        <Th>Price</Th>
        <LeverageTh>Leverage</LeverageTh>
        <Th>Take profit</Th>
        <Th>Stop loss</Th>
        <DateTh>Open date</DateTh>
        <DateTh>End date</DateTh>
      </Tr>
    </THead>
  )
}

export default TableHead;