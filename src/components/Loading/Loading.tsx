import { useEffect } from 'react';
import { Loader, Wrapper } from './styles/Loading.styles';

// Loading interface
interface ILoading{
  withNavbar?: boolean;
}

// Loading component - renders the loading screen
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