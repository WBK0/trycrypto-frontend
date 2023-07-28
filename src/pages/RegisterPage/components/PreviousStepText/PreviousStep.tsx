import { Icon, Wrapper, Text } from "./previousStep.styles";

interface IPreviousStep{
  previousStep: () => void;
}

const PreviousStep : React.FC<IPreviousStep> = ({ previousStep }) => {
  return(
    <Wrapper onClick={previousStep}>
      <Icon className="bi bi-caret-left-fill">
      </Icon>
      <Text>
        Previous step
      </Text>
    </Wrapper>
  )
}

export default PreviousStep;