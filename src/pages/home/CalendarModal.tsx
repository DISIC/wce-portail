import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { useIsModalOpen } from '@codegouvfr/react-dsfr/Modal/useIsModalOpen';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import api from '../../axios/axios';
import styles from './Home.module.css';

import { useState, useEffect } from 'react';

const modal = createModal({
  id: 'Calendar',
  isOpenedByDefault: false,
});

export default function CalendarModalComponent() {
  const isOpen = useIsModalOpen(modal);

  console.log(`Modal is currently: ${isOpen ? 'open' : 'closed'}`);
  const handle = () => {
    modal.open();
  };
  return (
    <>
      <modal.Component title="">
        <h5>Vous êtes l’organisateur de la réunion ?</h5>
      </modal.Component>
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
