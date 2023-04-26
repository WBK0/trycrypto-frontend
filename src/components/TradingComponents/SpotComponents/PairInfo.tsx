import { Info, Title, Wrapper } from './styles/pairInfo.styles';
import { Row } from '../../../shared/row';
import { Col } from '../../../shared/col';

interface IPairInfo{
  data: IData;
}

interface IData{
  c: number;
  p: number;
  P: number;
  h: number;
  l: number;
  o: number;
  q: number;
}

const PairInfo: React.FC<IPairInfo> = ({ data }) => {
  return(
    <Wrapper>
      <Row alignItems='center' height='65px'>
        <Col xs={16.667} pb='0px'>
          <Title>PRICE</Title>
          <Info>{Number(data.c).toFixed(2)}$</Info>
        </Col>
        <Col xs={16.667} pb='0px'>
          <Title>24H CHANGE</Title>
          <Info>{Number(data.p).toFixed(2)}$ {Number(data.P).toFixed(2)}%</Info>
        </Col>
        <Col xs={16.667} pb='0px'>
          <Title>24H HIGH</Title>
          <Info>{Number(data.h).toFixed(2)}$</Info>
        </Col>
        <Col xs={16.667} pb='0px'>
          <Title>24H LOW</Title>
          <Info>{Number(data.l).toFixed(2)}$</Info>
        </Col>
        <Col xs={16.667} pb='0px'>
          <Title>OPEN PRICE</Title>
          <Info>{Number(data.o).toFixed(2)}$</Info>
        </Col>
        <Col xs={16.667} pb='0px'>
          <Title>24H VOLUME</Title>
          <Info>{Number(data.q * 0.000001).toFixed(2)}M</Info>
        </Col>
      </Row>
  </Wrapper>
  )
}

export default PairInfo;