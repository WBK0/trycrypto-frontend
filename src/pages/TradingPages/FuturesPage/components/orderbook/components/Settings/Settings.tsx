import { BookWrapper, Books, SettingsBar } from "../../orderBook.styles";
import SelectTick from "../SelectTick/SelectTick";

// Settings interface
interface ISettings{
  price: number,
  setTickSize: (tickSize: number) => void,
  tickSize: number,
  handleChangeView: (asks: number, bids: number) => void
}

// Settings component - renders the settings component
const Settings : React.FC<ISettings> = ({ price, setTickSize, tickSize, handleChangeView }) => {
  return(
    <SettingsBar>
      <Books>
        <BookWrapper 
          color='white'
          data-tooltip-id="tooltip" 
          data-tooltip-content="Asks and bids view"
        >
          <i className='bi bi-book' onClick={() => handleChangeView(10, 10)} />
        </BookWrapper>
        <BookWrapper 
          color='#077703'
          data-tooltip-id="tooltip" 
          data-tooltip-content="Bids view"  
        >
          <i className='bi bi-book-half' onClick={() => handleChangeView(0, 20)} />
        </BookWrapper>
        <BookWrapper 
          color='#770303'
          data-tooltip-id="tooltip" 
          data-tooltip-content="Asks view"
        >
          <i className='bi bi-book-half' onClick={() => handleChangeView(20, 0)} />
        </BookWrapper>
      </Books>
    <SelectTick
      price={price}
      setTickSize={setTickSize} 
      tickSize={tickSize}
      
    />
    </SettingsBar>
  )
}

export default Settings;