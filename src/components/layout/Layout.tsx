import React, { ReactNode } from 'react';
import styles from './Layout.module.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {
  Display,
  headerFooterDisplayItem,
} from '@codegouvfr/react-dsfr/Display';

interface props {
  children: ReactNode;
}

export default function Layout({ children }: props) {
  return (
    <div className={styles.layout}>
      <Header headerFooterDisplayItem={headerFooterDisplayItem} />
      <main>{children}</main>
      <Footer headerFooterDisplayItem={headerFooterDisplayItem} />
      <Display />
    </div>
  );
}
