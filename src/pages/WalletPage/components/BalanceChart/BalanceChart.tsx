import Chart from "react-google-charts";
import { Test, Wrapper } from "./balanceChart.styles";

const BalanceChart = () => {
  const data = [
    ["Day", "Balance"],
    ["01.06.2023", 10000],
    ["02.06.2023", 11700],
    ["03.06.2023", 12000],
    ["04.06.2023", 10500],
    ["05.06.2023", 9800],
    ["06.06.2023", 15000],
    ["07.06.2023", 21300],
  ];

  const options = {
    title: "Company Performance",
    curveType: "function",
    backgroundColor: '#0a0e15',
    hAxis: {
      textStyle:{color: '#FFF'},
    }, 
    vAxis: {
      textStyle:{color: '#FFF'}
    },
    titleTextStyle: {
      color: 'white'
    },
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
      <Test
          chartType="LineChart"
          data={data}
          options={options}
          width="100%"
          height="400px"
        />
    </Wrapper>
  )
}

export default BalanceChart;