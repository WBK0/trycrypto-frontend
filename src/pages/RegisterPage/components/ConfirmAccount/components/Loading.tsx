import { Loader, LoadingContainer } from "../confirmAccount.styles";

// Loading component - renders the loading spinner on the confirm account step
const Loading = () => {
  return(
    <LoadingContainer>
      <Loader />
    </LoadingContainer>
  )
}

export default Loading;