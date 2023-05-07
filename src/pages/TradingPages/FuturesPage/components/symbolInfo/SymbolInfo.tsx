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
          <InfoData>{Number(data.P).toFixed(2) + "% " + Number(data.p).toFixed(data.c <= 15 ? 5 : 2) + "$"}</InfoData>
        </InfoWrapper>
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>24H High</InfoHeader>
          <InfoData>{Number(data.h).toFixed(data.c <= 15 ? 5 : 2)}</InfoData>
        </InfoWrapper>
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>24H Low</InfoHeader>
          <InfoData>{Number(data.l).toFixed(data.c <= 15 ? 5 : 2)}</InfoData>
        </InfoWrapper>
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>Open price</InfoHeader>
          <InfoData>{Number(data.o).toFixed(data.c <= 15 ? 5 : 2)}</InfoData>
        </InfoWrapper>
      </Col>
      <Col xs={16.66} pr="0px" pb="0px">
        <InfoWrapper>
          <InfoHeader>24H volume</InfoHeader>
          <InfoData>{Number(data.q / 1000000).toFixed(2)}M</InfoData>
        </InfoWrapper>
      </Col>
      
    </Wrapper>
  )
}

export default SymbolInfo;