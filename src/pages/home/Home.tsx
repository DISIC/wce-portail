import React from 'react';
import HomeForm from './HomeForm';
import HomeSlider from './HomeSlider';
import styles from './Home.module.css';

interface AuthModalProps {
  roomName: string;
  email: string;
  isWhitelisted: boolean;
  setEmail: (mail: string) => void;
  sendEmail: (mail: string) => void;
  setIsWhitelisted: (e: any) => void;
  setRoomName: (e: any) => void;
}

function Home(props: AuthModalProps) {
  return (
    <div className={styles.home}>
      <HomeForm {...props} />
      <HomeSlider />
    </div>
  );
}

export default Home;
