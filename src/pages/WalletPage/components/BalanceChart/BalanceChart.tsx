import Chart from "react-google-charts";
import { Icon, NoDataError, SelectButton, SelectInterval, Wrapper } from "./balanceChart.styles";
import { useEffect, useState } from "react";
import api from "../../../../services/api";

const BalanceChart = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [rightSide, setRightSide] = useState(0);
  const [leftSide, setLeftSide] = useState(0);
  const [interval, setInterval] = useState(7);
  const [data, setData] = useState([["Day", "Balance"]])

  useEffect(() => {
    const handleResize = async() => {
      const width = await window.innerWidth;
      setScreenWidth(width);
      console.log(width)
      if (width <= 1000 && width > 450) {
        setRightSide(10);
        setLeftSide(70);
      }else if(width <= 450){
        setLeftSide(60);
        setRightSide(10);
      }else{
        setRightSide(50);
        setLeftSide(100);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getPredictedBalance = async () => {
    try {
      const response = await api.get('/api/wallet/predicted/last/' + interval);
      const responseData = response.data;
      const dataArray = responseData.sort((a: {date: string}, b: {date: string}) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((item: {date: string, balance: number}) => {
        const formattedDate = new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
        return [formattedDate.replace("/", "."), Number(item.balance.toFixed(2))];
      });
      
      setData(([["Day", "Balance"], ...dataArray]));
    
    } catch (error) {
      console.error(error)
    }
  }

  
  useEffect(() => {
    getPredictedBalance()
  }, [])
  
  const options = {
    title: "Predicted balance",
    curveType: "function",
    backgroundColor: '#0a0e15',
    hAxis: {
      textStyle:{color: '#9e9e9e', fontSize: 14},
      showTextEvery:  data.length <= 11 ? 1 : data.length <= 21 ? 2 : data.length <= 41 ? 4 : data.length <= 71 ? 7 : data.length <= 131 ? 13 : data.length <= 251 ? 25 : data.length <= 366 && 40,
    }, 
    vAxis: {
      textStyle:{color: '#9e9e9e'},
      gridlines: {
        color: "none"
      }
    },
    titleTextStyle: {
      color: 'white'
    },
    chartArea: {'left': leftSide, 'width': '100%', 'right': rightSide},
    // legendTextStyle: {
    //   color: 'white'
    // },
    colors: [
      'ecbe04',
    ],
    legend: { position: "none" },
    
    
  };        console.log(data)


  return(
    <Wrapper>
      <SelectInterval>
        <SelectButton active={interval == 7 ? true : false} onClick={() => setInterval(7)}>7D</SelectButton>
        <SelectButton active={interval == 30 ? true : false} onClick={() => setInterval(30)}>30D</SelectButton>
        <SelectButton active={interval == 90 ? true : false} onClick={() => setInterval(90)}>90D</SelectButton>
        <SelectButton active={interval == 365 ? true : false} onClick={() => setInterval(365)}>365D</SelectButton>
      </SelectInterval>
      {
        data.length == 1 
        ? 
        <NoDataError>
          <Icon><i className="bi bi-exclamation-octagon-fill"></i></Icon>
          There is no data to render the chart
        </NoDataError>
        : <Chart
        chartType="AreaChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
      />
      }
     
    </Wrapper>
  )
}

export default BalanceChart;