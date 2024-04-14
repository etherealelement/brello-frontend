import { Typography } from 'antd';
import styles from "./styles.module.scss";

const {Title} = Typography;

type TitleProps = {
  children: React.ReactNode
  fontSize?: string;
  fontWeight?: string;
}

export const TitleComponent = ({children, fontSize,fontWeight}: TitleProps) => <Title className={styles.title} style={{fontSize,fontWeight}}>{children}</Title>