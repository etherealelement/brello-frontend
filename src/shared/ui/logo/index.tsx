import { FC } from 'react';
import styles from "./styles.module.scss";
import { ImageLogomark } from '@/shared/assets/images';
import cn from "clsx";
import { TitleComponent } from '../typography/Title/Title';
interface Props {
  className?: string;
}
export const Logo: FC<Props> = ({className}): JSX.Element => {
  return <div className={cn(styles.root, className)}>
        <img className={styles.logomark} src={ImageLogomark} alt="logomark" />
        <TitleComponent fontSize="24px" fontWeight='700'>Brello</TitleComponent>
  </div>;
};