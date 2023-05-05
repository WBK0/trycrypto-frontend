import { Col } from "../../../../../shared/col";
import { InfoData, InfoHeader, InfoWrapper, Price, Wrapper } from "./symbolInfo.style";

interface ISymbolInfo{
  data: {
    c: number;
    p: number;
    P: number;
    h: number;
    l: number;
    o: number;
    q: number;
  }
}

const SymbolInfo: React.FC<ISymbolInfo> = ({ data }) => {
  return(
    <Wrapper>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <Price>
            {data.c}
          </Price>
        </InfoWrapper> 
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>24H change</InfoHeader>
          <InfoData>{data.p}</InfoData>
        </InfoWrapper>
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>24H change</InfoHeader>
          <InfoData>{data.p}</InfoData>
        </InfoWrapper>
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>24H change</InfoHeader>
          <InfoData>{data.p}</InfoData>
        </InfoWrapper>
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>24H change</InfoHeader>
          <InfoData>{data.p}</InfoData>
        </InfoWrapper>
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>24H change</InfoHeader>
          <InfoData>{data.p}</InfoData>
        </InfoWrapper>
      </Col>
      
    </Wrapper>
  )
}

export default SymbolInfo;