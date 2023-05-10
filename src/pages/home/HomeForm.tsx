import React, { useState } from 'react';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import styles from './Home.module.css';
import AuthModal from './AuthModal';

function HomeForm() {
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
            placeholder: 'Saisissez un nom de conférence...',
          }}
        />
        <div className={styles.confButtons}>
          <AuthModal />
          <Button
            className={styles.plusButton}
            priority="primary"
            size="medium"
          >
            +
          </Button>
        </div>
      </div>
      <p>Actuellement, il y a 0 conférences et 0 participants.</p>
      <hr />
      <p>
        Il est recommandé de ne pas dépasser 40 participants par conférence pour
        optimiser le confort de vos différents échanges.
      </p>
    </div>
  );
}

export default HomeForm;
