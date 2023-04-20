import styled from 'styled-components'

type RowProps = {
  justifyContent?: string;
  alignItems?: string;
  height?: string;
  mt?: string;
  ml?: string;
  mr?: string;
  mb?: string;
};

export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: ${props => props.height};
  justify-content: ${props => props.justifyContent || 'start'};
  align-items: ${props => props.alignItems || 'start'};
  margin-top: ${props => props.mt};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  margin-bottom: ${props => props.mb};
`