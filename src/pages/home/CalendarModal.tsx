import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import api from '../../axios/axios';
import styles from './Home.module.css';

import { useState, useEffect } from 'react';



const { CalendarModal, openCalendarModal } = createModal({
  name: 'Calendar',
  isOpenedByDefault: false,
});


export default function CalendarModalComponent(){

  const handle = () => {
    openCalendarModal()
  }
  return (
    <>
      <CalendarModal title="">
        <h5>Vous êtes l’organisateur de la réunion ?</h5>
      </CalendarModal>
      <Button
            onClick={handle}
            className={styles.plusButton}
            priority="primary"
            size="medium"
          >
            +
    </Button>
    </>
  );
}
