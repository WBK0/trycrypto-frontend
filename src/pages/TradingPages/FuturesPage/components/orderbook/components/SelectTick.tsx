import { Select, Option } from "../orderBook.styles";

interface ISelectTick{
  price: number;
  setTickSize: (value: number) => void;
  tickSize: number;
}

const SelectTick: React.FC<ISelectTick> = ({ price, setTickSize, tickSize }) => {
  return(
    <Select onChange={(e) => setTickSize(Number(e.target.value))} value={tickSize}>
      {price <= 5 ?
        <Option value={0.0001}>
          0.0001
        </Option>
        : null
      }
      {price <= 10 ?
        <Option value={0.001}>
          0.001
        </Option>
        : null
      }
      {price <= 5000 ?
        <Option value={0.01}>
          0.01
        </Option>
        : null
      }
      
      {price >= 5 ?
        <Option value={0.1}>
          0.1
        </Option>
        : null
      }
      {price >= 25 ?
        <Option value={1}>
          1
        </Option>
        : null
      }
      {price >= 300 ?
        <Option value={10}>
          10
        </Option>
        : null
      }
      {price >= 5000 ?
        <Option value={100}>
          100
        </Option>
        : null
      }
    </Select>
  )
}

export default SelectTick;