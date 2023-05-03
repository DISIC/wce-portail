import React from 'react';
import HomeForm from './HomeForm';
import HomeSlider from './HomeSlider';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <HomeForm />
      <HomeSlider />
    </div>
  );
}

export default Home;
