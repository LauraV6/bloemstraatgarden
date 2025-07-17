import styles from "./titleLine.module.scss";

// Types
interface TitleLineProps {
  title: string;
  className?: string;
}

export const TitleLine: React.FC<TitleLineProps> = ({ 
  title,
  className
}) => {
  const titleClass = [styles.titleLine, className].filter(Boolean).join(' ');

  return (
    <h4 className={titleClass}>
      <span>{title}</span>
    </h4>
  );
};