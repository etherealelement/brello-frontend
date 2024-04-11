import { Typography } from 'antd';
import styles from "./styles.module.scss";

const {Title} = Typography;

type TitleProps = {
  children: React.ReactNode
  fontSize?: string;
}

export const TitleComponent = ({children, fontSize}: TitleProps) => <Title className={styles.title} style={{fontSize}}>{children}</Title>