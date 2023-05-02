export default interface IWallet{
  currentBalance: number;
  spotBalance: {
    [pair: string]: number;
  };
  futureBalance: {
    long: {
      [pair: string]: number;
    }
    short: {
      [pair: string]: number;
    }
  }
}