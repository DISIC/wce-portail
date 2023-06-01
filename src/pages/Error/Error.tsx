import React, { useEffect } from 'react';
import styles from './Error.module.css';

type errorObj = {
  error: {
    message: string;
    error?: {
      status: string;
      stack: string;
    };
  };
};

export default function Error({ error }: errorObj) {
  return (
    <div className={styles.home}>
      <h1>{error.message}</h1>
      <h2>{error && error.error ? error.error.status : null}</h2>
      <pre>{error && error.error ? error.error.stack : null}</pre>
    </div>
  );
}
