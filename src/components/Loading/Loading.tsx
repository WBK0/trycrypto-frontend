import { useEffect } from 'react';
import { Loader, Wrapper } from './styles/Loading.styles';
import Navbar from '../../layout/Navbar/Navbar';

interface ILoading{
  withNavbar?: boolean;
}

const Loading : React.FC<ILoading> = ({ withNavbar }) => {
  useEffect(() => {
    if(withNavbar !== true){
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, [])
  return(
  <>
    <Wrapper withNavbar={withNavbar}>
      <Loader />
    </Wrapper>
    </>
  ) 
}

export default Loading;