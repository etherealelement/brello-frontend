import { createEvent, createStore, sample } from "effector";

export type SignInError = "InvalidEmail" | "UnknownError" | "RateLimit";

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
  filter: $isEmailValid,
});
