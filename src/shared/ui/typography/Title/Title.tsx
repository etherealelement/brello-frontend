import { Typography } from 'antd';

const {Title} = Typography;

type TitleProps = {
  children: React.ReactNode
}

export const TitleComponent = ({children}: TitleProps) => <Title>{children}</Title>