import { useRef } from "react";
import { Input, InputWrapper, Loupe, Button, Form } from "./searchBar.styles";

interface ISearchBar{
  setSearch: (value: string) => void;
  search: string;
  fetchData: () => void;
}

const SearchBar: React.FC<ISearchBar> = ({ search, setSearch, fetchData }) => {

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
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputWrapper>
        <Loupe onClick={handleClickLoupe}>
          <i className="bi bi-search"></i>
        </Loupe>
        <Input ref={inputRef} placeholder="Search for pairs" onChange={handleChange} value={search}/>
      </InputWrapper>
      <Button onClick={fetchData}>Search</Button>
    </Form>
  )
}

export default SearchBar;