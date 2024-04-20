import { useUnit } from "effector-react";
import { FC } from "react";

import { IconMail01 } from "@/shared/assets/icons";
import { ImageLogomark } from "@/shared/assets/images";
import { Logo } from "@/shared/ui/logo";

import {
  $email,
  $error,
  $finished,
  $pending,
  emailChanged,
  formSubmitted,
} from "./model";
import styles from "./styles.module.scss";

export const SignInPage: FC = () => {
  return (
    <>
      <main className={styles.root}>
        <div className={styles.content}>
          <header className={styles.header}>
            <Logo />
          </header>
          <section className={styles.form}>
            <img
              className={styles.logomark}
              src={ImageLogomark}
              alt="Brello logomark"
            />
            {$finished ? <LoginSucceded /> : <LoginForm />}

            {/*<Loading />

             Success path
            <FeaturedIcon
              className={styles.featuredIcon}
              color="primary"
              Icon={IconMail01}
            />
            <h1 className={styles.headline}>Check your email</h1>
            <p className={styles.description}>
              We sent a login link to{" "}
              <span className={styles.descriptionAccent}>
                olivia@untitledui.com
              </span>
            </p>
            <Button variant="link-gray" className={styles.buttonBack}>
              <IconArrowLeft className={styles.backIcon} />
              Back to login
            </Button>

             Fail path
            <FeaturedIcon
              className={styles.featuredIcon}
              color="error"
              Icon={IconAlertCircle}
            />
            <h1 className={styles.headline}>Some error happened</h1>
            <p className={styles.description}>With description</p>
            <Button variant="link-gray" className={styles.buttonBack}>
              <IconArrowLeft className={styles.backIcon} />
              Try again
            </Button>*/}
          </section>
          <footer className={styles.footer}>
            <p className={styles.info}>&copy; Brello 2023</p>
            <p className={styles.info}>
              <img src={IconMail01} alt="IconMail" /> help@brello.io
            </p>
          </footer>
        </div>
        <div className={styles.geometric} />
      </main>
    </>
  );
};

const LoginForm: FC = () => {
  const [email, error, pending] = useUnit([$email, $error, $pending]);
  const [handleEmail, handleSubmit] = useUnit([emailChanged, formSubmitted]);

  return (
    <>
      <h1 className={styles.headline}>Sign in</h1>
      <p className={styles.description}>Start your 30-day free trial.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          className={styles.input}
          name="email"
          disabled={pending}
          value={email}
          error={error ? errorText[error] : undefined}
          label="Email"
          placeholder="Enter your email"
          onValue={({ value }) => handleEmail(value)}
        />
        <Button loading={pending} className={styles.button} type="submit">
          Get started
        </Button>
      </form>
    </>
  );
};
