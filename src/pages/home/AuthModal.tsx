import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import api from '../../axios/axios';

import { useState, useEffect } from 'react';

import styles from './AuthModal.module.css';

const modal = createModal({
  id: 'AgentConnect',
  isOpenedByDefault: false,
});

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

function roomNameConstraintOk(roomName: string) {
  /**
   * Verify if the room name is valid
   * @param {String} roomName The room name
   * @return {Boolean}        True if the room name is valid, false otherwise
   */
  const regex = new RegExp(
    '^(?=(?:[a-zA-Z0-9]*[a-zA-Z]))(?=(?:[a-zA-Z0-9]*[0-9]){3})[a-zA-Z0-9]{10,}$'
  );
  return regex.test(roomName);
}

export default function AuthModal({
  roomName,
  email,
  isWhitelisted,
  setEmail,
  sendEmail,
  setIsWhitelisted,
  setRoomName,
  joinConference,
  authenticated,
}: AuthModalProps) {
  const [msg, setMsg] = useState<string | null>('');
  const [buttonMsg, setButtonMsg] = useState(
    'Recevoir le code de vérification par email'
  );
  const [isCheked, setIsChecked] = useState(false);

  function handle() {
    if (!roomName) {
      const room = generateRoomName();
      setRoomName(room);
      api.get('/feedback/whereami').then(res => {
        if (res.data == 'internet') {
          if (!authenticated) {
            modal.open();
          }
          if (authenticated) {
            joinConference(room);
          }
        }
        if (res.data == 'rie') {
          joinConference(room);
        }
      });
    } else if (roomNameConstraintOk(roomName)) {
      api.get('/feedback/whereami').then(res => {
        if (res.data == 'internet') {
          if (!authenticated) {
            modal.open();
          }
          if (authenticated) {
            joinConference(roomName);
          }
        }
        if (res.data == 'rie') {
          joinConference(roomName);
        }
      });
    }
  }

  useEffect(() => {
    setIsWhitelisted(null);
    const mail = localStorage.getItem('email');
    const checked1 = localStorage.getItem('checked');
    const checked = checked1 === 'true';
    if (checked) {
      if (mail) {
        setEmail(mail);
      }
    } else {
      setEmail('');
      localStorage.setItem('email', '');
    }
    setIsChecked(checked);
    setMsg(null);
    setButtonMsg('Recevoir le code de vérification par email');
  }, []);

  const agentConnect = (room: string) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/login_authorize?room=${room}`, {
      redirect: 'manual',
    }).then(res => {
      if (res.type === 'opaqueredirect') {
        // redirect to login page
        window.location.href = res.url;
      } else {
        // handle normally / pass on to next handler
        window.location.href = res.url;
      }
    });
  };
  console.log('==========' + import.meta.env.VITE_BASE_URL);
  const onCheck = () => {
    setIsChecked(!isCheked);
    localStorage.setItem('checked', (!isCheked).toString());
  };

  const mailchanger = (e: any) => {
    setEmail(e.target.value);
    localStorage.setItem('email', e.target.value);
  };

  const mailSender = (e: any) => {
    sendEmail(e);
    setButtonMsg('Email non reçu ? Cliquez ici pour recevoir un nouvel email');
  };
  return (
    <>
      <modal.Component title="Vous êtes l’organisateur de la réunion ?">
        {/* <h5>Vous êtes l’organisateur de la réunion ?</h5> */}
        <p>
          <small>
            Nous avons besoin de vérifier votre identité afin de créer la
            conférence {roomName}.
          </small>
        </p>
        <button type="button">
          <span className={styles.hidden} id="input-desc-error">
            text
          </span>
          <img
            alt="agentConnect"
            src="/static/media/ac-btn-bleu.svg"
            onClick={() => agentConnect(roomName)}
          />
        </button>
        <p>
          <small>
            <a href="https://agentconnect.gouv.fr/">
              Qu'est ce que Agent Connect ?
            </a>
          </small>
        </p>
        <Input
          label={
            <span id="input3-desc-error">
              Ou saissez votre adresse email professionnelle:
            </span>
          }
          nativeInputProps={{
            'aria-describedby': 'input3-desc-error',
            'aria-labelledby': 'input3-desc-error',
            id: 'input3',
            value: email,
            onChange: e => mailchanger(e),
            required: true,
          }}
        />
        <Checkbox
          options={[
            {
              label: 'se rappeler de mon adresse email',
              nativeInputProps: {
                checked: isCheked,
                name: 'checkboxes-1',
                value: 'value1',
                onChange: () => onCheck(),
              },
            },
          ]}
        />
        <Button
          className={styles.modalButtons}
          onClick={() => mailSender(roomName)}
        >
          <span className={styles.hidden} id="input-desc-error">
            text
          </span>
          {buttonMsg}
        </Button>
        {msg}
        {isWhitelisted === false ? (
          <p>
            <Badge severity="error">
              votre adresse email n'est pas valide. Merci de saisir votre
              adresse email professionelle.
            </Badge>
          </p>
        ) : null}
        {isWhitelisted === true ? (
          <p>
            <Badge severity="success">Message envoyé.</Badge>
          </p>
        ) : null}
      </modal.Component>
      <Button onClick={handle} className={styles.button}>
        {roomName ? 'Rejoindre ou créer' : 'Générer un nom aléatoire'}
      </Button>
    </>
  );
}

function generateRoomName() {
  return (
    Math.random().toString(36).slice(2).toUpperCase() +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10)
  );
}
