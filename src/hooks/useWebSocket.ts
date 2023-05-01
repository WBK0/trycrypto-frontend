import { useEffect } from 'react';

interface IUseWebSocket {
  url: string;
  onOpen?: () => void;
  onMessage: (event: MessageEvent) => void;
}


function useWebSocket({ url, onOpen, onMessage }: IUseWebSocket) {
  useEffect(() => {
    const ws = new WebSocket(url);

    if (onOpen) {
      ws.addEventListener('open', onOpen);
    }

    ws.addEventListener('message', (event) => {
      onMessage(event);
    });

    return () => {
      ws.close();
    };
  }, [url, onMessage, onOpen]);

  return null;
}

export default useWebSocket;