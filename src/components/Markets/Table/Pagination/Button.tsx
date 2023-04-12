import { RowData, Table } from '@tanstack/react-table';
import styles from './pagination.module.css';

// Define interface
interface IButton{
  table: Table<RowData>;
  isActive: boolean;
  value: number;
  action: () => void;
}

// The component responsible for displaying the pagination button
const Button: React.FC<IButton> = ({table, isActive, value, action}) => {
  return(
    <li className='page-item'>
      <button 
        className={`page-link ${styles.item} ${isActive ? styles.active : ''}`}
        onClick={action}
      >
        {value}
      </button>
    </li>
  )
}

export default Button;