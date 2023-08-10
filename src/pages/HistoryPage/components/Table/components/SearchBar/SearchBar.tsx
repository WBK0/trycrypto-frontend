import { useRef } from "react";
import { Input, InputWrapper, Loupe, Button, Form } from "./searchBar.styles";

// SearchBar interface
interface ISearchBar{
  setSearch: (value: string) => void;
  search: string;
  fetchData: () => void;
}

// The SearchBar component - renders the search bar
const SearchBar: React.FC<ISearchBar> = ({ search, setSearch, fetchData }) => {

  // Ref for the input
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click on loupe
  const handleClickLoupe = () => {
    if(inputRef.current){
      inputRef.current.focus();
    }
  }

  // Handle change on input
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