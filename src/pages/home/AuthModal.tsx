import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import { Badge } from '@codegouvfr/react-dsfr/Badge';

import { useState } from 'react';

import styles from './AuthModal.module.css';

const { AgentConnectModal, openAgentConnectModal } = createModal({
  name: 'AgentConnect',
  isOpenedByDefault: false,
});

export default function AuthModal() {
  const [msg, setMsg] = useState('');
  const [buttonMsg, setButtonMsg] = useState(
    'Recevoir le code de vérification par email'
  );
  const [isCheked, setIsChecked] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(true);
  function handle() {
    openAgentConnectModal();
  }
  return (
    <>
      <AgentConnectModal title="">
        <h5>Vous êtes l’organisateur de la réunion ?</h5>
        <p>
          <small>
            Nous avons besoin de vérifier votre identité afin de créer la
            conférence {'roomName'}.
          </small>
        </p>
        <button>
          <img
            src="/static/media/ac-btn-bleu.svg"
            //onClick={() => agentConnect("roomName")}
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
          //value={email}
          //required
          label="Ou saissez votre adresse email professionnelle:"
          //onChange={e => mailchanger(e)}
        />
        <Checkbox
          options={[
            {
              label: 'se rappeler de mon adresse email',
              nativeInputProps: {
                name: 'checkboxes-1',
                value: 'value1',
              },
            },
          ]}
        />
        <Button
          className={styles.modalButtons}
          //onClick={() => mailSender(roomName)}
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
