import { FC } from "react";

import { IconMail01 } from "@/shared/assets/icons";
import { ImageGeometric } from "@/shared/assets/images";
import { ParagraphComponent } from "@/shared/ui";
import { Logo } from "@/shared/ui/logo";

import styles from "./styles.module.scss";

interface LayoutCommonProps {
  children?: React.ReactNode;
}
export const Layout: FC<LayoutCommonProps> = ({ children }): JSX.Element => {
  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Logo></Logo>
        </header>
        <section className={styles.form}>{children}</section>
        <footer className={styles.footer}>
          <ParagraphComponent fontSize="12px">
            &copy; Brello 2023
          </ParagraphComponent>
          <ParagraphComponent fontSize="12px" className={styles.help}>
            <img src={IconMail01} alt="" width={13} height={10} />
            help@brello.io
          </ParagraphComponent>
        </footer>
      </div>
      <div className={styles.geometric}>
        <img src={ImageGeometric} alt="geometric" />
      </div>
    </main>
  );
};
