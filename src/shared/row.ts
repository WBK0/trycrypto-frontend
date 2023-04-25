import styled from 'styled-components'

type RowProps = {
  justifyContent?: string;
  alignItems?: string;
  height?: string;
  mt?: string;
  ml?: string;
  mr?: string;
  mb?: string;
  pt?: string;
  pl?: string;
  pr?: string;
  pb?: string;
};

export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: ${props => props.height || '100%'};
  justify-content: ${props => props.justifyContent || 'start'};
  align-items: ${props => props.alignItems || 'start'};
  margin-top: ${props => props.mt};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  margin-bottom: ${props => props.mb};
  padding-top: ${props => props.pt};
  padding-left: ${props => props.pl};
  padding-right: ${props => props.pr};
  padding-bottom: ${props => props.pb};
`