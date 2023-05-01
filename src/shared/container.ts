import styled from 'styled-components'

type ContainerProps = {
  pr?: string;
  pl?: string;
}

export const Container = styled.div<ContainerProps>`
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding-right: ${props => props.pr || '0.75rem'};
  padding-left: ${props => props.pl || '0.75rem'};
  height: 100%;
`