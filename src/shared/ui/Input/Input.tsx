import {Input} from "antd";


type InputProps = {
  placeholder: string
  size: "large" | "middle" | "small"
}

export const TextField = ({placeholder, size}: InputProps) => <Input placeholder={placeholder} size={size} />;