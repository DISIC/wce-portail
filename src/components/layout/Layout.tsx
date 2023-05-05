import React, { ReactNode } from 'react';
import styles from './Layout.module.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
import {
  Display,
  headerFooterDisplayItem,
} from '@codegouvfr/react-dsfr/Display';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header headerFooterDisplayItem={headerFooterDisplayItem} />
      <main>
        <Outlet />
      </main>
      <Footer headerFooterDisplayItem={headerFooterDisplayItem} />
      <Display />
    </div>
  );
}
