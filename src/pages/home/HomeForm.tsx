import React, { useState } from 'react';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import styles from './Home.module.css';

function HomeForm() {
  const [newConfButtons, setNewConfButtons] = useState(false);
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
            placeholder: 'https://',
          }}
        />
        <div className={styles.confButtons}>
          <Button
            className={styles.button}
            priority="primary"
            size="medium"
            onClick={() => setNewConfButtons(prev => !prev)}
          >
            Nouvelle conférence
          </Button>
          {newConfButtons ? (
            <span className={styles.confButtonsStretch}>
              <Button
                className={styles.button}
                priority="primary"
                size="medium"
              >
                Démarrer une conférence
              </Button>
              <Button
                className={styles.button}
                priority="primary"
                size="medium"
              >
                Générer une invitation
              </Button>
            </span>
          ) : null}
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
