import styles from '../../styles/components/ProgressBar.module.css';

const Bar = ({ animationDuration, progress }) => (
  <div
    className={styles.progress_bar}
    style={{
      marginLeft: `${(-1 + progress) * 100}%`,
      transition: `margin-left ${animationDuration}ms linear`,
    }}
  ></div>
);

export default Bar;
