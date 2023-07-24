import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Info, Leverage, LeverageTh, Loader, Loading, Pair, PairTh, Pnl, PnlText, TBody, THead, Table, TableWrapper, Td, Th, Tr, Type, TypeTh, DateTd, DateTh } from "../../table.styles";
import api from "../../../../../../services/api";

interface IData{
  id: number;
  type: string;
  pair: string;
  quantityPosition: number;
  quantitySold: number;
  leverage: number;
  purchasePrice: number;
  sellingPrice: number;
  date: string;
}

const TableFutures = () => {
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
      const response = await api.get(`/api/history/futures/last/from/${data[data.length - 1].id}`);
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
      const response = await api.get(`/api/history/futures/last/${search.toUpperCase()}/from/${data[data.length - 1].id}`);
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
      const response = await api.get(`/api/history/futures/last/${search.toUpperCase()}`);
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
          <TBody ref={elementRef}>
            
            {data && data.map((item) => {
              const date = new Date(item.date).toLocaleString();
              const pnlAmount = Number(item.type == 'LONG' ? (item.quantitySold * item.sellingPrice - item.quantitySold * item.purchasePrice) * item.leverage : (item.quantitySold * item.purchasePrice - item.quantitySold * item.sellingPrice) * item.leverage).toFixed(2)
              const pnlPercent = item.type == 'LONG' ? ((item.sellingPrice / item.purchasePrice * 100 - 100) * item.leverage).toFixed(2) : -((item.sellingPrice / item.purchasePrice * 100 - 100) * item.leverage ).toFixed(2)
             
              return(
                <Tr key={item.id}>
                  <Type color={item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>{item.type.toUpperCase()}</Type>
                  <Pair>{item.pair}</Pair>
                  <Td>{item.quantityPosition}</Td>
                  <Td>{item.quantitySold}</Td>
                  <Leverage>{item.leverage}X</Leverage>
                  <Td>{Number(item.purchasePrice).toFixed(item.purchasePrice < 30 ? 4 : 2)} USDT</Td>
                  <Td>{Number(item.sellingPrice).toFixed(item.sellingPrice < 30 ? 4 : 2)} USDT</Td>
                  <Pnl color={item.purchasePrice <= item.sellingPrice ? item.type == 'LONG' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)' : item.type == 'SHORT' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'}>
                    <PnlText>{pnlAmount}$</PnlText>
                    <PnlText>{pnlPercent}%</PnlText>
                  </Pnl>
                  <DateTd>{date}</DateTd>
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
              isAll && data.length > 0
              ?
              <Tr>
                <Info>
                  We dont find more history futures data
                </Info>
              </Tr>
              : data.length == 0 &&
              <Tr>
                <Info>
                  Nothing found in the futures trade history
                </Info>
              </Tr>
            }
          </TBody>
        </Table>
      </TableWrapper>
   </> 
  )
}

export default TableFutures;