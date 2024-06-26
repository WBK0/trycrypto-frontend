import { Col } from '../../../../shared/col';
import { Row } from '../../../../shared/row';
import { SearchInput } from './searchbar.styles';
import { Tooltip } from 'react-tooltip'

// Define interface
interface ISearchbar{
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

// The component responsible for displaying the table search
const Searchbar : React.FC<ISearchbar> = ({globalFilter, setGlobalFilter}) => {
  return(
    <Row justifyContent='end'>
      <Col xl={25} lg={30} md={40} sm={50} xs={80}>
        <SearchInput 
          value={globalFilter ?? ''} 
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          placeholder='Enter pair name'
          data-tooltip-id="tooltip" 
          data-tooltip-content="Click to select market instrument"
        />
      </Col>
    </Row>
    
  )
}

export default Searchbar;