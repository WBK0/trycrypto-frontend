import styles from './searchbar.module.css';

interface ISearchbar{
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

const Searchbar : React.FC<ISearchbar> = ({globalFilter, setGlobalFilter}) => {
  return(
    <div className='row d-flex justify-content-end'>
      <div className="col-xl-3 col-md-4 col-sm-6 col-8">
        <div className="mb-3 mt-3">
          <input 
            value={globalFilter ?? ''} 
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            className={`form-control form-control-lg bg-transparent text-light ${styles.input}`}
            placeholder='Wpisz nazwę pary'
          />
        </div>
      </div>
    </div>
    
  )
}

export default Searchbar;