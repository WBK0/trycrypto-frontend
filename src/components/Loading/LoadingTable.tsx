import { Loader } from './styles/Loading.styles';
import { Wrapper } from './styles/LoadingTable.styles'

// LoadingTable component - renders the loading table
const LoadingTable = () => {
  return(
    <Wrapper>
      <Loader />
    </Wrapper>
  )
}

export default LoadingTable;