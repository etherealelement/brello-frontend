import { createEvent, createStore } from "effector";

export type SignInError = "InvalidEmail" | "UnknownError" | "RateLimit";

export const formSubmitted = createEvent();
export const emailChanged = createEvent<string>();
export const backToLoginPressed = createEvent();

export const $email = createStore("");
export const $error = createStore<SignInError | null>("InvalidEmail");
export const $pending = createStore(false);
export const $finished = createStore(false);

$email.on(emailChanged, (_, email) => email);
