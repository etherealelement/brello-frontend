import { attach, combine, createEvent, createStore, sample } from "effector";
import { not } from "patronum";

import { api } from "@/shared/api";

export type SignInError = "InvalidEmail" | "UnknownError" | "RateLimit";

const singInFx = attach({ effect: api.auth.signInWithEmailFx });

export const formSubmitted = createEvent();
export const emailChanged = createEvent<string>();
export const backToLoginPressed = createEvent();

export const $email = createStore("");
export const $error = createStore<SignInError | null>("InvalidEmail");
export const $pending = createStore(false);
export const $finished = createStore(false);

const $isEmailValid = $email.map(
  (email) => email.length > 5 && email.includes("@") && email.includes("."),
);

$email.on(emailChanged, (_, email) => email);

sample({
  clock: formSubmitted,
  source: combine({ email: $email }),
  filter: $isEmailValid,
  target: [singInFx, $error.reinit],
});

$finished.on(singInFx.done, () => true);

// Login finished

sample({
  clock: backToLoginPressed,
  target: [$finished.reinit, $email.reinit, $error.reinit],
});

// Handle errors
sample({
  clock: formSubmitted,
  filter: not($isEmailValid),
  fn: (): SignInError => "InvalidEmail",
  target: $error,
});

$error.on(singInFx.failData, (_, error) => {
  if (error.status === 429) {
    return "RateLimit";
  }
  return "UnknownError";
});
