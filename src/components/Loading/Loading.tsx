import { useEffect } from 'react';
import { Loader, Wrapper } from './styles/Loading.styles';

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [])
  return(
    <Wrapper>
      <Loader />
    </Wrapper>
  ) 
}

export default Loading;