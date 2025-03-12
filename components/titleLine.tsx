import styles from "./titleLine.module.scss";

interface Props {
    title: string;
  }
  
export const TitleLine: React.FC<Props> = ({ title }) => {
    return (
        <h4 className={styles.titleLine}><span>{title}</span></h4>
    );
};