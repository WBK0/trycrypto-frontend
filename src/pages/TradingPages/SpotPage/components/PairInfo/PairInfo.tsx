import { Info, Title, Wrapper } from './pairInfo.styles';
import { Row } from '../../../../../shared/row';
import { Col } from '../../../../../shared/col';

interface IPairInfo{
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

const PairInfo: React.FC<IPairInfo> = ({ data }) => {
  return(
    <Wrapper>
      <Row alignItems='center' height='65px' pt='10px' pb='10px'>
        <Col md={16.66} xs={33.33} pb='0px' pr='0px'>
          <Title>PRICE</Title>
          <Info>{Number(data.c).toFixed(data.c <= 15 ? 5 : 2)}$</Info>
        </Col>
        <Col md={16.66} xs={33.33} pb='0px' pr='0px'>
          <Title>24H CHANGE</Title>
          <Info>{Number(data.p).toFixed(data.c <= 15 ? 5 : 2)}$ {Number(data.P).toFixed(2)}%</Info>
        </Col>
        <Col md={16.66} xs={33.33} pb='0px' pr='0px'>
          <Title>24H HIGH</Title>
          <Info>{Number(data.h).toFixed(data.c <= 15 ? 5 : 2)}$</Info>
        </Col>
        <Col md={16.66} xs={33.33} pb='0px' pr='0px'>
          <Title>24H LOW</Title>
          <Info>{Number(data.l).toFixed(data.c <= 15 ? 5 : 2)}$</Info>
        </Col>
        <Col md={16.66} xs={33.33} pb='0px' pr='0px'>
          <Title>OPEN PRICE</Title>
          <Info>{Number(data.o).toFixed(data.c <= 15 ? 5 : 2)}$</Info>
        </Col>
        <Col md={16.66} xs={33.33} pb='0px' pr='0px'>
          <Title>24H VOLUME</Title>
          <Info>{Number(data.q * 0.000001).toFixed(2)}M</Info>
        </Col>
      </Row>
  </Wrapper>
  )
}

export default PairInfo;