import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import { Badge } from '@codegouvfr/react-dsfr/Badge';

import { useState, useEffect } from 'react';

import styles from './AuthModal.module.css';

const { AgentConnectModal, openAgentConnectModal } = createModal({
  name: 'AgentConnect',
  isOpenedByDefault: false,
});

interface AuthModalProps {
  roomName: string;
  email: string;
  isWhitelisted: boolean;
  setEmail: (mail: string) => void;
  sendEmail: (mail: string) => void;
  setIsWhitelisted: (e: any) => void;
  setRoomName: (e: any) => void;
}

export default function AuthModal({
  roomName,
  email,
  isWhitelisted,
  setEmail,
  sendEmail,
  setIsWhitelisted,
  setRoomName,
}: AuthModalProps) {
  const [msg, setMsg] = useState('');
  const [buttonMsg, setButtonMsg] = useState(
    'Recevoir le code de vérification par email'
  );
  const [isCheked, setIsChecked] = useState(false);

  function handle() {
    openAgentConnectModal();
  }

  // useEffect(() => {
  //   const mail = localStorage.getItem('email');
  //   const checked1 = localStorage.getItem('checked');
  //   const checked = checked1 === 'true';
  //   if (checked) {
  //     setEmail(mail);
  //   } else {
  //     setEmail('');
  //     localStorage.setItem('email', '');
  //   }
  //   setIsChecked(checked);
  //   setMsg(null);
  //   setButtonMsg('Recevoir le code de vérification par email');
  //   if (!isOpen) {
  //     setIsWhitelisted(null);
  //   }
  // }, []);

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
      <AgentConnectModal title="">
        <h5>Vous êtes l’organisateur de la réunion ?</h5>
        <p>
          <small>
            Nous avons besoin de vérifier votre identité afin de créer la
            conférence {roomName}.
          </small>
        </p>
        <button>
          <img
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
          label="Ou saissez votre adresse email professionnelle:"
          nativeInputProps={{
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
      </AgentConnectModal>
      <Button onClick={handle} className={styles.button}>
        Rejoindre ou créer
      </Button>
    </>
  );
}
