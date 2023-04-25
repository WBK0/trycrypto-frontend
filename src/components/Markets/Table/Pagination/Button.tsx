import { PaginationButton } from './styles/pagination.styles';

// Define interface
interface IButton{
  isActive: boolean;
  value: number;
  action: () => void;
}

// The component responsible for displaying the pagination button
const Button: React.FC<IButton> = ({ isActive, value, action}) => {
  return(
      <PaginationButton 
        isActive={isActive}
        onClick={action}
      >
        {value}
      </PaginationButton>
  )
}

export default Button;