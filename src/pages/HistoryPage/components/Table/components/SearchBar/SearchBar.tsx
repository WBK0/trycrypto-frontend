import { useRef } from "react";
import { Input, InputWrapper, Wrapper, Loupe, Button } from "./searchBar.styles";

interface ISearchBar{
  setSearch: (value: string) => void;
  search: string;
}

const SearchBar: React.FC<ISearchBar> = ({ search, setSearch }) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickLoupe = () => {
    if(inputRef.current){
      inputRef.current.focus();
    }
  }

  const handleChange = (e: {target: {value: string}}) => {
    const value = e.target.value;
    setSearch(value);
  }

  return(
    <Wrapper>
      <InputWrapper>
        <Loupe onClick={handleClickLoupe}>
          <i className="bi bi-search"></i>
        </Loupe>
        <Input ref={inputRef} placeholder="Search for pairs" onChange={handleChange} value={search}/>
      </InputWrapper>
      <Button>Search</Button>
    </Wrapper>
  )
}

export default SearchBar;