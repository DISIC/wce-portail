import React, { useState } from 'react';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import styles from './Home.module.css';
import AuthModal from './AuthModal';
import CalendarModalComponent from './CalendarModal';

interface AuthModalProps {
  roomName: string;
  email: string;
  isWhitelisted: boolean | null;
  setEmail: (mail: string) => void;
  sendEmail: (mail: string) => void;
  setIsWhitelisted: (e: any) => void;
  setRoomName: (e: any) => void;
  joinConference: (e: any) => void;
  authenticated: boolean | null;
}

function HomeForm(props: AuthModalProps) {
  const [message, setMessage] = useState<JSX.Element | string>(<></>);
  const [messageType, setMessageType] = useState<string>('');

  const change = (e: string) => {
    verifyAndSetVAlue(e);
  };
  const pattern = new RegExp(
    '^(?=(?:[a-zA-Z0-9]*[a-zA-Z]))(?=(?:[a-zA-Z0-9]*[0-9]){3})[a-zA-Z0-9]{10,}$'
  );

  const verifyAndSetVAlue = (value: string) => {
    if (value) {
      if (pattern.test(value)) {
        setMessageType('valid');
        props.setRoomName(value);
        setMessage(
          <div className={styles.message}>
            <small className={styles.roomNameConditionValid}>
              {' '}
              Au moins 3 chiffres
            </small>
            <small className={styles.roomNameConditionValid}>
              {' '}
              Un minimum de 10 caractères
            </small>
            <small className={styles.roomNameConditionValid}>
              {' '}
              Des chiffres et des lettres sans accents uniquement
            </small>
          </div>
        );
      } else {
        setMessageType('error');
        props.setRoomName(value);
        const message = (
          <div className={styles.message}>
            {getCountOfDigits(value) >= 3 ? (
              <small className={styles.roomNameConditionValid}>
                {' '}
                Au moins 3 chiffres
              </small>
            ) : (
              <small className={styles.roomNameConditionNotValid}>
                {' '}
                Au moins 3 chiffres
              </small>
            )}
            {getCountCaracters(value) >= 10 ? (
              <small className={styles.roomNameConditionValid}>
                {' '}
                Un minimum de 10 caractères
              </small>
            ) : (
              <small className={styles.roomNameConditionNotValid}>
                {' '}
                Un minimum de 10 caractères
              </small>
            )}
            {isAlphaNumeric(value) ? (
              <small className={styles.roomNameConditionValid}>
                {' '}
                Des chiffres et des lettres sans accents uniquement
              </small>
            ) : (
              <small className={styles.roomNameConditionNotValid}>
                {' '}
                Des chiffres et des lettres sans accents uniquement
              </small>
            )}
          </div>
        );
        setMessage(message);
      }
    } else {
      setMessageType('');
      props.setRoomName(value);
      setMessage('');
    }
  };
  return (
    <div className={styles.HomeForm}>
      <h3>La WebConférence de l'État pour tous les agents publics</h3>
      <p>Audio, vidéo, chat, partage d'écran et de documents</p>
      <div className={styles.form}>
        <Input
          style={{ width: '100%' }}
          hintText=""
          label=""
          nativeInputProps={{
            value: props.roomName,
            placeholder: 'Saisissez un nom de conférence...',
            onChange: (e: any) => change(e.target.value),
          }}
        />
        <div className={styles.confButtons}>
          <AuthModal {...props} />
          <CalendarModalComponent {...props} />
        </div>
      </div>
      <p>{message}</p>
      <p>Actuellement, il y a 0 conférences et 0 participants.</p>
      <hr />
      <p>
        Il est recommandé de ne pas dépasser 40 participants par conférence pour
        optimiser le confort de vos différents échanges.
      </p>
    </div>
  );
}

function getCountOfDigits(str: string) {
  return str.replace(/[^0-9]/g, '').length;
}

function getCountCaracters(str: string) {
  return str.length;
}

function isAlphaNumeric(str: string) {
  const isAlphaNum = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$');
  return isAlphaNum.test(str);
}

export default HomeForm;
