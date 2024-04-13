import { Typography } from "antd";
import React from "react";

const { Paragraph } = Typography;

type ParagraphProps = {
  children: React.ReactNode;
  fontSize?: string;
};

export const ParagraphComponent = ({
  children,
  fontSize,
  ...props
}: ParagraphProps) => (
  <Paragraph style={{ fontSize, ...props }}>{children}</Paragraph>
);
