import { useEffect, useState } from 'react';
import styles from './spot.module.css';

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
    <div className={styles.symbolInfo}>
      <div className="row align-items-center h-100" style={{margin: 0}}>
        <div className="d-flex flex-column align-items-start col-4 col-lg-2">
          <p className={`mb-0 ${styles.header}`}>PRICE</p>
          <p className={`mb-0 ${styles.info}`}>{Number(data.c).toFixed(2)}$</p>
        </div>
        <div className="d-flex flex-column align-items-start col-4 col-lg-2">
          <p className={`mb-0 ${styles.header}`}>24H CHANGE</p>
          <p className={`mb-0 ${styles.info}`}>{Number(data.p).toFixed(2)}$ {Number(data.P).toFixed(2)}%</p>
        </div>
        <div className="d-flex flex-column align-items-start col-4 col-lg-2">
          <p className={`mb-0 ${styles.header}`}>24H HIGH</p>
          <p className={`mb-0 ${styles.info}`}>{Number(data.h).toFixed(2)}$</p>
        </div>
        <div className="d-flex flex-column align-items-start col-4 col-lg-2">
          <p className={`mb-0 ${styles.header}`}>24H LOW</p>
          <p className={`mb-0 ${styles.info}`}>{Number(data.l).toFixed(2)}$</p>
        </div>
        <div className="d-flex flex-column align-items-start col-4 col-lg-2">
          <p className={`mb-0 ${styles.header}`}>OPEN PRICE</p>
          <p className={`mb-0 ${styles.info}`}>{Number(data.o).toFixed(2)}$</p>
        </div>
        <div className="d-flex flex-column align-items-start col-4 col-lg-2">
          <p className={`mb-0 ${styles.header}`}>24H VOLUME</p>
          <p className={`mb-0 ${styles.info}`}>{Number(data.q * 0.000001).toFixed(2)}M</p>
        </div>
      </div>
  </div>
  )
}

export default PairInfo;