import { Icon, Wrapper, Text } from "./pathError.styles";

// PathError component - renders the path error
const PathError = () => {
  return(
    <Wrapper>
      <Icon>
        <i className="bi bi-exclamation-octagon-fill"></i>
      </Icon>
      <Text>The url address is not valid</Text>
    </Wrapper>
  )
}

export default PathError;