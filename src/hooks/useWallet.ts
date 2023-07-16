import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AxiosError } from 'axios';
import IWallet from '../interfaces/Wallet.interface';
import AuthContext from '../contexts/AuthContext';

const useWallet = () => {
  const [balance, setBalance] = useState<IWallet>();
  const [error, setError] = useState<Error | AxiosError>();
  const {isLoggedIn} = useContext(AuthContext)

  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/wallet/balance');
      setBalance(response.data);
    } catch (error) {
      const err = error as AxiosError
      setError(err);
    }
  };

  useEffect(() => {
    setBalance(undefined)
    fetchBalance();
  }, [isLoggedIn]);

  return { balance, error, fetchBalance };
};

export default useWallet;