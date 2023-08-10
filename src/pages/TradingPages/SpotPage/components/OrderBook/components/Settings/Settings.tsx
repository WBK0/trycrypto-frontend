import { BookWrapper, SettingsBar } from "../../orderBook.styles";

interface ISettings{
  handleChangeView: (asks: number, bids: number) => void;
}

const Settings : React.FC<ISettings> = ({ handleChangeView }) => {
  return(
    <SettingsBar>
      <BookWrapper color='white'>
        <i className='bi bi-book' onClick={() => handleChangeView(10, 10)} />
      </BookWrapper>
      <BookWrapper color='#077703'>
        <i className='bi bi-book-half' onClick={() => handleChangeView(0, 20)} />
      </BookWrapper>
      <BookWrapper color='#770303'>
        <i className='bi bi-book-half' onClick={() => handleChangeView(20, 0)} />
      </BookWrapper>
    </SettingsBar>
  )
}

export default Settings;