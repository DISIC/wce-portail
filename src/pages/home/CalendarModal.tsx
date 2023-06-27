import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { useIsModalOpen } from '@codegouvfr/react-dsfr/Modal/useIsModalOpen';
import { Button } from '@codegouvfr/react-dsfr/Button';
import ICalendarLink from 'react-icalendar-link';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import axios from 'axios';
import styles from './Home.module.css';

import { useState, useEffect } from 'react';

function generateRoomName() {
  return (
    Math.random().toString(36).slice(2).toUpperCase() +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10)
  );
}

const modal = createModal({
  id: 'Calendar',
  isOpenedByDefault: false,
});

export default function CalendarModalComponent(props: any) {
  let roomName = props.roomName;
  const isOpen = useIsModalOpen(modal);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [copied, setCopied] = useState('Copier les Informations');
  const [disabled, setDisabled] = useState(false);

  console.log(`Modal is currently: ${isOpen ? 'open' : 'closed'}`);
  const handle = async () => {
    modal.open();
    if (!roomName) {
      roomName = generateRoomName();
      await props.setRoomName(roomName);
      await setCopied('Copier les Informations');
      await setDisabled(false);
    } else {
      await props.setRoomName(roomName);
      await setCopied('Copier les Informations');
      await setDisabled(false);
    }
  };

  const pattern = new RegExp(
    '^(?=(?:[a-zA-Z0-9]*[a-zA-Z]))(?=(?:[a-zA-Z0-9]*[0-9]){3})[a-zA-Z0-9]{10,}$'
  );

  useEffect(() => {
    if (pattern.test(roomName) && isOpen) {
      axios
        .get(
          `${
            import.meta.env.VITE_VOXAPI_URL
          }/api/v1/conn/jitsi/conference/code?conference=${roomName}@conference.${
            import.meta.env.VITE_JITSI_DOMAIN
          }&url=https://${import.meta.env.VITE_JITSI_DOMAIN}/${roomName}`
        )
        .then(res => {
          setPin(res.data.id);
        });
    }
  }, [roomName, isOpen]);

  useEffect(() => {
    if (pattern.test(roomName) && isOpen) {
      axios
        .get(
          `${
            import.meta.env.VITE_VOXAPI_URL
          }/api/v1/conn/jitsi/phoneNumbers?conference=${roomName}@conference.${
            import.meta.env.VITE_JITSI_DOMAIN
          }`
        )
        .then(res => {
          setPhoneNumber(res.data.numbers.FR[0]);
        });
    }
  }, [roomName, isOpen]);

  const event = {
    title: `Webconférence de l'État : ${roomName}`,
    description: `Lien vers la conférence: ${window.location}${roomName} Numéro de téléphone: ${phoneNumber} PIN: ${pin}`,
    startTime: '',
    endTime: '',
    location: `${window.location}${roomName}`,
    // attendees: [
    //   "Hello World <hello@world.com>",
    //   "Hey <hey@test.com>",
    // ]
  };

  return (
    <>
      <modal.Component title="">
        <br />
        <h6>Générer une invitation: {roomName}</h6>

        <p>
          Date de début :
          <Input
            label="Label champs de saisie"
            nativeInputProps={{
              type: 'date',
            }}
          />
          {/* <TextInput
            onBlur={function noRefCheck() {}}
            value={(dateTimeStart || '').toString().substring(0, 16)}
            onChange={handleChangeStart}
            type="datetime-local"
          /> */}
        </p>
        <p>
          Durée
          <Input
            label="Label champs de saisie"
            nativeInputProps={{
              type: 'date',
            }}
          />
          {/* {`(${duration.split(':')[0]}h ${duration.split(':')[1]}min)`} :{' '}
          <TextInput
            onBlur={function noRefCheck() {}}
            value={duration}
            onChange={handleChangeDuration}
            type="time"
          /> */}
        </p>
        <h6>Coordonnées téléphoniques de la conférence :</h6>
        <p>- Téléphone: {phoneNumber}</p>
        <p>- Code de la conférence: {`${pin}#`}</p>

        <div>
          <ICalendarLink
            event={event}
            className={styles.modalButton}
            filename={`WebConf de l'Etat - Conférence ${roomName}`}
          />
          {/* <Button
              // variant="contained"
              style={{ backgroundColor: '#0a76f6', textTransform: 'none' }}
            >
              Ajouter au calendrier
            </Button> */}
          {/* </ICalendarLink> */}
          <Button
            style={{ backgroundColor: '#0a76f6', textTransform: 'none' }}
            className={styles.modalButton}
            title="copy"
            // onClick={() => copyEvent()}
            // variant="contained"
          >
            Copier les informations
          </Button>
        </div>
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
