import React from 'react';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import styles from './Home.module.css';

function HomeForm() {
  return (
    <div className={styles.HomeForm}>
      <h3>La WebConférence de l'État pour tous les agents publics</h3>
      <p>Audio, vidéo, chat, partage d'écran et de documents</p>
      <div className={styles.ButtonForm}>
        <Input
          //   style={{ height: '10px' }}
          hintText=""
          label=""
          nativeInputProps={{
            placeholder: 'https://',
          }}
        />
        <Button
          style={{ height: '10px', marginTop: '8px', marginLeft: '10px' }}
          iconId="fr-icon-checkbox-circle-line"
          iconPosition="left"
          priority="primary"
          size="medium"
        >
          Label button
        </Button>
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
