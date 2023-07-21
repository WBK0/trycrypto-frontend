import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Info, Leverage, LeverageTh, Loader, Loading, Pair, PairTh, Pnl, PnlText, TBody, THead, Table, TableWrapper, Td, Th, Tr, Type, TypeTh, DateTd, DateTh, StatusTh, StatusTd } from "../../table.styles";
import api from "../../../../../../services/api";

interface IData{
  id: number;
  status: string;
  type: string;
  pair: string;
  quantity: number;
  leverage: number;
  price: number;
  takeProfit: number;
  stopLoss: number;
  startDate: string;
  endDate: string;
}

const TableFuturesOrders = () => {
  const [data, setData] = useState<IData[]>([])
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);

  const elementRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    setLoading(false);
    function handleScroll() {
      
      if (
        elementRef.current &&
        !isAll &&
        search == '' &&
        Number((elementRef.current.scrollTop + elementRef.current.clientHeight).toFixed(0)) === elementRef.current.scrollHeight
      ) {
        setLoading(true)
        fetchMore();
      } else if(
        elementRef.current &&
        !isAll &&
        search !== '' &&
        Number((elementRef.current.scrollTop + elementRef.current.clientHeight).toFixed(0)) === elementRef.current.scrollHeight
      ){
        setLoading(true)
        fetchMoreSearch();
      }
    }

    if (elementRef.current) {
      elementRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [data, search]);

  const fetchMore = async () => {
    try {
      console.log('fetchmore')
      const response = await api.get(`/api/derivatives/limit/history/from/${data[data.length - 1].id}`);
      if(response.data.length < 20){
        setIsAll(true);
      }
      setData(prev => prev.concat(response.data));
    } catch (error) {
      console.log(error)  
    }
  }

  const fetchMoreSearch = async () => {
    try {
      console.log(search)
      const response = await api.get(`/api/derivatives/limit/history/pair/${search.toUpperCase()}/from/${data[data.length - 1].id}`);
      if(response.data.length < 20){
        setIsAll(true);
      }
      setData(prev => prev.concat(response.data));
    } catch (error) {
      console.log(error)  
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      setIsAll(false);
      setData([]);
      let url;
      search == ''
      ? url = 'api/derivatives/limit/history/'
      : url = `api/derivatives/limit/history/pair/${search.toUpperCase()}`
      const response = await api.get(url);
      console.log(response.data)
      setData(response.data)
      if(response.data.length < 20){
        setIsAll(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  useEffect(() => {
    fetchData();
  }, [])

  return(
   <>
    <SearchBar setSearch={setSearch} search={search} fetchData={fetchData}/>
      <TableWrapper>
        <Table>
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
          <TBody ref={elementRef}>
            
            {data && data.map((item) => {
              const startDate = new Date(item.startDate).toLocaleString();
              let endDate;
              if(item.endDate){
                endDate = new Date(item.endDate).toLocaleString();
              }
              
              return(
                <Tr key={item.id}>
                  <StatusTd color={item.status}>
                    {
                      item.status == 'active' && <i className="bi bi-three-dots"></i> ||
                      item.status == 'filled' && <i className="bi bi-check"></i> ||
                      item.status == 'canceled' && <i className="bi bi-x"></i>
                    }
                  </StatusTd>
                  <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Type>
                  <Pair>{item.pair}</Pair>
                  <Td>{item.quantity}</Td>
                  <Td>{item.price}</Td>
                  <Leverage>{item.leverage}X</Leverage>
                  <Td>{item.takeProfit || 0}</Td>
                  <Td>{item.stopLoss || 0}</Td>
                  <DateTd>{startDate}</DateTd>
                  <DateTd>{endDate || 'Not closed yet'}</DateTd>
                </Tr>
              )
            })} 
            {loading && !isAll
            ? 
            <Tr>
              <Loading>
                <Loader />
              </Loading>
            </Tr>
            : null
            }
            {
              isAll 
              ?
              <Tr>
                <Info>
                  We dont find more history futures data
                </Info>
              </Tr>
              : null
            }
          </TBody>
        </Table>
      </TableWrapper>
   </> 
  )
}

export default TableFuturesOrders;