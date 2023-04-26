import styled from 'styled-components'

type ColProps = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  pr?: string;
  pb?: string;
  pl?: string;
  pt?: string;
  ml?: string;
};

export const Col = styled.div<ColProps>`
  padding-left: ${props => props.pl || '0x'};
  padding-right: ${props => props.pr || '12px'};
  padding-top: ${props => props.pt || '0px'};
  padding-bottom: ${props => props.pb || '12px'};
  margin-left: ${props => props.ml};
  width: ${props => props.xs + "%"};
  @media (min-width: 600px) {
    width: ${props => props.sm + "%"};
  }
  @media (min-width: 800px) {
    width: ${props => props.md + "%"};
  }
  @media (min-width: 1000px) {
    width: ${props => props.lg + "%"};
  }
  @media (min-width: 1200px) {
    width: ${props => props.xl + "%"};
  }
`