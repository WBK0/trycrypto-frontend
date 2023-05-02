import { useState, useEffect } from 'react';
import api from '../services/api';
import { AxiosError } from 'axios';
import IWallet from '../interfaces/Wallet.interface';

const useWallet = () => {
  const [balance, setBalance] = useState<IWallet>();
  const [error, setError] = useState<Error | AxiosError>();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.get('/api/wallet/balance', {
          withCredentials: true,
        });
        setBalance(response.data);
      } catch (error) {
        const err = error as AxiosError
        setError(err);
      }
    };

    fetchBalance();
  }, []);

  return { balance, error };
};

export default useWallet;