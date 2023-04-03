import styles from './loading.module.css'

const Loading = () => {
  return(
    <div className={styles.container}>
      <div className="spinner-border text-light" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

export default Loading;