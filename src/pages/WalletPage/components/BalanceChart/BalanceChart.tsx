import Chart from "react-google-charts";
import { SelectButton, SelectInterval, Wrapper } from "./balanceChart.styles";
import { useEffect, useState } from "react";

const BalanceChart = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [rightSide, setRightSide] = useState(0);
  const [leftSide, setLeftSide] = useState(0);

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
  
  const data = [
    ["Day", "Balance"],
    ["01.06", 10000],
    ["02.06", 11700],
    ["03.06", 12000],
    ["04.06", 10500],
    ["05.06", 9800],
    ["06.06", 15000],
    ["07.06", 21300],
    ["08.06", 25000],
    ["09.06", 24000],
    ["10.06", 22300],
    ["11.06", 27500],
    ["12.06", 19000],
    ["13.06", 16000],
    ["14.06", 14500],
    ["15.06", 11000],
    ["16.06", 3000],
    ["17.06", 12000],
    ["18.06", 18000],
    ["19.06", 23500],
    ["20.06", 28000],
    ["21.06", 45000],
    ["22.06", 52000],
    ["23.06", 4000],
    ["24.06", 7000],
    ["25.06", 20000],
    ["26.06", 26000],
    ["27.06", 40000],
    ["28.06", 41000],
    ["29.06", 43000],
    ["30.06", 45000]
  ];

  const options = {
    title: "Predicted balance",
    curveType: "function",
    backgroundColor: '#0a0e15',
    hAxis: {
      textStyle:{color: '#9e9e9e', fontSize: 14},
      showTextEvery: 4,
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
    
    
  };

  return(
    <Wrapper>
      <SelectInterval>
        <SelectButton active={true}>7D</SelectButton>
        <SelectButton active={false}>30D</SelectButton>
      </SelectInterval>
      <Chart
          chartType="AreaChart"
          data={data}
          options={options}
          width="100%"
          height="400px"
        />
    </Wrapper>
  )
}

export default BalanceChart;