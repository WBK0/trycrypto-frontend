import { BookWrapper, SettingsBar } from "../../orderBook.styles";

interface ISettings{
  handleChangeView: (asks: number, bids: number) => void;
}

const Settings : React.FC<ISettings> = ({ handleChangeView }) => {
  return(
    <SettingsBar>
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
    </SettingsBar>
  )
}

export default Settings;