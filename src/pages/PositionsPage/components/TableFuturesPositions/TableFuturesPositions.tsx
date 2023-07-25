import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { Actions, CloseButton, NoOpened, Pnl, PnlText, SubSwitch, SubTd, SubTh, SubTr, TBody, THead, Table, TableWrapper, Td, Th, ThActions, Tr, UpdateButton, Wrapper } from "../tableSpotOrders.styles";
import CloseModal from "./Modals/CloseModal";
import UpdateModal from "./Modals/UpdateModal";

export interface IFuturesPositions{
  id: number;
  type: string;
  pair: string;
  purchasePrice: number;
  quantity: number;
  takeProfit: number;
  stopLoss: number;
  liquidationPrice: number;
  leverage: number;
}

interface ITableFuturesPositions {
  prices: {
    [pair: string]: {
      lastPrice: number;
    };
  };
}

const TableFuturesPositions: React.FC<ITableFuturesPositions> = ({prices}) => {
  const [futuresPositions, setFuturesPositions] = useState<IFuturesPositions[]>([])
  const [showSubTable, setShowSubTable] = useState(0);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [modalItem, setModalItem] = useState<IFuturesPositions>()

  const handleShow = (id: number) => {
    if(id == showSubTable){
      setShowSubTable(0)
    }else{
      setShowSubTable(id)
    }
  }

  const handleCloseModal = () => {
    setShowCloseModal(false)
  }

  const handleUpdateModal = () => {
    setShowUpdateModal(false)
  }


  const getFuturesPositions = async () => {
    try {
      const response = await api.get('/api/positions/futures');
      setFuturesPositions(response.data)
    } catch (error) { 
      console.log(error)
    }
  }

  const closeModal = async (item: IFuturesPositions) => {
    setShowCloseModal(true);
    setModalItem(item);
  }

  const updateModal = async (item: IFuturesPositions) => {
    setShowUpdateModal(true);
    setModalItem(item);
  }

  useEffect(() => {
    getFuturesPositions();
  }, [])

  return(
    <Wrapper>
      <TableWrapper>
        <Table>
          <THead>
            <Tr>
              <Th></Th>
              <Th>Type</Th>
              <Th>Pair</Th>
              <Th>Quantity</Th>
              <Th>Purchase price</Th>
              <Th>Pair price</Th>
              <Th>PNL</Th>
              <ThActions>Actions</ThActions>
            </Tr>
          </THead>
          <TBody>
            {futuresPositions.map((item) => {
              return(<>
              <Tr>
                <SubSwitch onClick={() => handleShow(item.id)} width="30px">{showSubTable == item.id ? '-' : '+'}</SubSwitch>
                <Td width="60px" color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Td>
                <Td width="100px">{item.pair}</Td>
                <Td width="140px">{item.quantity} {item.pair.replace("USDT", "")}</Td>
                <Td width="160px">{Number(item.purchasePrice).toFixed(4)} USDT</Td>
                <Td width="150px">{Number(prices[item.pair.toUpperCase()]?.lastPrice).toFixed(4)} USDT</Td>
                <Td width="150px">
                  <Pnl color={item.purchasePrice <= prices[item.pair.toUpperCase()]?.lastPrice ? item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)' : item.type == 'SHORT' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>
                    <PnlText>{item.type == 'LONG' ? ((prices[item.pair.toUpperCase()]?.lastPrice - item.purchasePrice) * item.leverage * item.quantity).toFixed(2) : ((item.purchasePrice - prices[item.pair.toUpperCase()]?.lastPrice) * item.leverage * item.quantity).toFixed(2)} </PnlText>
                    <PnlText>{item.type == 'LONG' ? ((prices[item.pair.toUpperCase()]?.lastPrice / item.purchasePrice * 100 - 100) * item.leverage).toFixed(2) : -((prices[item.pair.toUpperCase()]?.lastPrice / item.purchasePrice * 100 - 100) * item.leverage ).toFixed(2)}%</PnlText>
                  </Pnl>
                </Td>
                <Actions width="100px">
                  <UpdateButton onClick={() => updateModal(item)}>
                    Update
                  </UpdateButton>
                  <CloseButton onClick={() => closeModal(item)}>
                    Close
                  </CloseButton>
                </Actions>
              </Tr>
              {showSubTable == item.id
              && 
                <Tr>
                  <Td colSpan={1} style={{padding: '0px'}}>
                    <Table>
                      <THead>
                        <SubTr>
                          <SubTh></SubTh>
                        </SubTr>
                      </THead>
                      <TBody>
                        <SubTr>
                          <SubTd></SubTd>
                        </SubTr>
                      </TBody>
                    </Table>
                  </Td>
                  <Td colSpan={7} style={{padding: '0px'}}>
                    <Table>
                      <THead>
                        <SubTr>
                          <SubTh>Leverage</SubTh>
                          <SubTh>Take profit</SubTh>
                          <SubTh>Stop loss</SubTh>
                          <SubTh>Liquidation</SubTh>
                        </SubTr>
                      </THead>
                      <TBody>
                        <SubTr>
                          <SubTd width="150px">{item.leverage}</SubTd>
                          <SubTd width="150px">{item.takeProfit || 0} USDT</SubTd>
                          <SubTd width="150px">{item.stopLoss || 0} USDT</SubTd>
                          <SubTd width="150px">{Number(item.liquidationPrice).toFixed(4)} USDT</SubTd>
                        </SubTr>
                      </TBody>
                    </Table>
                  </Td>
                </Tr>
              }
                </>
              )
            })}
          </TBody>
        </Table>
        {
          futuresPositions.length == 0
          ? <NoOpened>You don't have any open positions in the futures market</NoOpened>
          : null
        }
      </TableWrapper>
      {showCloseModal && modalItem && (
        <CloseModal onClose={handleCloseModal} fetchPositions={getFuturesPositions} modalItem={modalItem} pairPrice={prices[modalItem.pair.toUpperCase()]?.lastPrice} />
      )}
      {showUpdateModal && modalItem && (
        <UpdateModal onClose={handleUpdateModal} modalItem={modalItem} pairPrice={prices[modalItem.pair.toUpperCase()]?.lastPrice} fetchPositions={getFuturesPositions}/>
      )}
    </Wrapper>
  )
}

export default TableFuturesPositions;