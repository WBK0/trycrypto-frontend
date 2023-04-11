import styles from './loading.module.css'

const LoadingTable = () => {
  return(
    <div className={styles.loadingTable}>
      <div className="spinner-border text-light" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

export default LoadingTable;