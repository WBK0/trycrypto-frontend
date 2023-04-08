import styles from './pagination.module.css';

interface IButton{
  table: any;
  isActive: boolean;
  value: any;
  action: any;
}

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