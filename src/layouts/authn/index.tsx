import { FC } from 'react';
import styles from './index.module.css';

interface LayoutCommonProps {
  children: React.ReactNode
}
export const index: FC<LayoutCommonProps> = ({children}): JSX.Element => {
  return <main className={styles.root}>
    <div className={styles.content}>
      <header>
        
      </header>
    </div>
  </main>;
};