import React from 'react';
import { Typography } from 'antd';

const {Paragraph} = Typography;

type ParagraphProps = {
  children: React.ReactNode;
  fontSize?: string;
}

export const ParagraphComponent = ({children, fontSize}: ParagraphProps) => <Paragraph style={{fontSize}}>{children}</Paragraph>