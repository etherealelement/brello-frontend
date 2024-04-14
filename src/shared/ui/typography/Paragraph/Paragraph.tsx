import { Typography } from "antd";
import React from "react";

const { Paragraph } = Typography;

type ParagraphProps = {
  children: React.ReactNode;
  fontSize?: string;
  className?: string;
};

export const ParagraphComponent = ({
  children,
  fontSize,
  className,
  ...props
}: ParagraphProps) => (
  <Paragraph style={{ fontSize, ...props }} className={className}>
    {children}
  </Paragraph>
);
