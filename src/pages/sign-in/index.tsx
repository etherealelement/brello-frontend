import { useUnit } from "effector-react";
import { FC } from "react";

import { $email, emailChanged, formSubmitted } from "./model";

export const SignInPage: FC = () => {
  const [email, handleEmail, handleSubmit] = useUnit([
    $email,
    emailChanged,
    formSubmitted,
  ]);
  return <div>index</div>;
};
