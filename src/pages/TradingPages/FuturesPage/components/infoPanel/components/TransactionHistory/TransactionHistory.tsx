import { Pnl, PnlText, TBody, THead, Table, Td, Th, Tr } from "../../infoPanel.styles";

const TransactionHistoryView = () => {
  return(
    <Table>
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
      <TBody>
        <Tr>
          <Td>LONG</Td>
          <Td>ETHUSDT</Td>
          <Td>6.4</Td>
          <Td>6.4</Td>
          <Td>50</Td>
          <Td>1813.13</Td>
          <Td>1813.32</Td>
          <Pnl>
            <PnlText>20$</PnlText>
            <PnlText>10%</PnlText>
          </Pnl>
          <Td>2023-05-22T17:18:50.782Z</Td>
        </Tr>
      </TBody>
      
    </Table>
  )
}

export default TransactionHistoryView;