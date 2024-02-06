import React, { useState, useEffect } from 'react';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import styles from './Home.module.css';
import { Accordion } from '@codegouvfr/react-dsfr/Accordion';
import { Alert } from '@codegouvfr/react-dsfr/Alert';
import MuiAlert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import api from '../../axios/axios';
import { redirect, useNavigate } from 'react-router-dom';
import { fr } from '@codegouvfr/react-dsfr';
import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import CalendarModalComponent from './CalendarModal';
import Authstyles from './AuthModal.module.css';

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
  setButtons: (a: boolean) => void;
  buttons: boolean;
}

function HomeForm(props: AuthModalProps) {
  const [message, setMessage] = useState<JSX.Element | string>(<></>);
  const [messageType, setMessageType] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>('');
  const [buttonMsg, setButtonMsg] = useState(
    'Recevoir le code de vérification par email'
  );
  const [isCheked, setIsChecked] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href + props.roomName);
    setOpen(true);
  };
  const navigate = useNavigate();

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
            <Badge className={styles.badge} severity="success">
              Au moins 3 chiffres
            </Badge>
            <Badge className={styles.badge} severity="success">
              Un minimum de 10 caractères
            </Badge>
            <Badge className={styles.badge} severity="success">
              Des chiffres et des lettres sans accents
            </Badge>
            {/* <small className={styles.roomNameConditionValid}>
              
              Au moins 3 chiffres
            </small>
            <small className={styles.roomNameConditionValid}>
              
              Un minimum de 10 caractères
            </small>
            <small className={styles.roomNameConditionValid}>
              
              Des chiffres et des lettres sans accents
            </small> */}
          </div>
        );
      } else {
        setMessageType('error');
        props.setRoomName(value);
        const message = (
          <div className={styles.message}>
            {getCountOfDigits(value) >= 3 ? (
              <Badge className={styles.badge} severity="success">
                Au moins 3 chiffres
              </Badge>
            ) : (
              // <small className={styles.roomNameConditionValid}>
              //
              //   Au moins 3 chiffres
              // </small>
              <Badge className={styles.badge} severity="error">
                Au moins 3 chiffres
              </Badge>
              // <small className={styles.roomNameConditionNotValid}>
              //
              //   Au moins 3 chiffres
              // </small>
            )}
            {getCountCaracters(value) >= 10 ? (
              <Badge className={styles.badge} severity="success">
                Un minimum de 10 caractères
              </Badge>
            ) : (
              // <small className={styles.roomNameConditionValid}>
              //
              //   Un minimum de 10 caractères
              // </small>
              <Badge className={styles.badge} severity="error">
                Un minimum de 10 caractères
              </Badge>
              // <small className={styles.roomNameConditionNotValid}>
              //
              //   Un minimum de 10 caractères
              // </small>
            )}
            {isAlphaNumeric(value) ? (
              <Badge className={styles.badge} severity="success">
                Des chiffres et des lettres sans accents
              </Badge>
            ) : (
              // <small className={styles.roomNameConditionValid}>
              //
              //   Des chiffres et des lettres sans accents
              // </small>
              <Badge className={styles.badge} severity="error">
                Des chiffres et des lettres sans accents
              </Badge>
              // <small className={styles.roomNameConditionNotValid}>
              //
              //   Des chiffres et des lettres sans accents
              // </small>
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

  useEffect(() => {
    verifyAndSetVAlue(props.roomName);
  }, [props.roomName]);

  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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

  useEffect(() => {
    props.setIsWhitelisted(null);
    const mail = localStorage.getItem('email');
    const checked1 = localStorage.getItem('checked');
    const checked = checked1 === 'true';
    if (checked) {
      if (mail) {
        props.setEmail(mail);
      }
    } else {
      props.setEmail('');
      localStorage.setItem('email', '');
    }
    setIsChecked(checked);
    setMsg(null);
    setButtonMsg('Recevoir le code de vérification par email');
  }, []);

  const agentConnect = (room: string) => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/auth/login_authorize?room=${room}`,
      {
        redirect: 'manual',
      }
    ).then(res => {
      if (res.type === 'opaqueredirect') {
        window.location.href = res.url;
      } else {
        // handle normally / pass on to next handler
        window.location.href = res.url;
      }
    });
  };
  const onCheck = () => {
    setIsChecked(!isCheked);
    localStorage.setItem('checked', (!isCheked).toString());
  };

  const mailchanger = (e: any) => {
    props.setEmail(e.target.value);
    localStorage.setItem('email', e.target.value);
  };

  const mailSender = (e: any) => {
    props.sendEmail(e);
    setButtonMsg('Email non reçu ? Cliquez ici pour recevoir un nouvel email');
  };

  function handle(e: any) {
    e.preventDefault();
    if (!props.roomName) {
      const room = generateRoomName();
      props.setRoomName(room);
      if (roomNameConstraintOk(room)) {
        api.get('/feedback/whereami').then(res => {
          if (res.data.toLowerCase() == 'internet') {
            if (!props.authenticated) {
              modal.open();
            }
            if (props.authenticated) {
              props.joinConference(room);
            }
          }
          if (res.data.toLowerCase() !== 'internet') {
            props.joinConference(room);
          }
        });
      }
    } else if (roomNameConstraintOk(props.roomName)) {
      api
        .get('/roomExists/' + props.roomName)
        .then(res => {
          return navigate('/' + props.roomName);
        })
        .catch(err => {
          api.get('/feedback/whereami').then(res => {
            if (res.data.toLowerCase() == 'internet') {
              if (!props.authenticated) {
                return modal.open();
              }
              if (props.authenticated) {
                return props.joinConference(props.roomName);
              }
            }
            if (res.data.toLowerCase() !== 'internet') {
              return props.joinConference(props.roomName);
            }
          });
        });
    }
  }

  const AlertMui = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        onClose={event => handleClose(event, 'timeout')}
        severity="success"
        sx={{ width: '100%' }}
        elevation={6}
        ref={ref as any}
        variant="filled"
        {...props}
      >
        Le lien a été copié
      </MuiAlert>
    );
  });
  const handleKeypress = (e: any) => {
    //it triggers by pressing the enter key
    if (e.code === 'Enter') {
      handle(e);
    }
  };

  const up = '+';
  const down = '--';
  return (
    <div className={styles.HomeForm}>
      <h3>La WebConférence de l'État pour tous les agents publics</h3>
      <p>Audio, vidéo, chat, partage d'écran et de documents</p>
      <form className={styles.form}>
        <div className={styles.confButtons}>
          <Input
            style={{ width: '100%' }}
            hintText=""
            label={
              <span className={styles.hidden} id="input-desc-error">
                Champ de saisi du nom de la conférence
              </span>
            }
            nativeInputProps={{
              id: 'input',
              value: props.roomName,
              placeholder: 'Saisissez un nom de conférence...',
              onChange: (e: any) => change(e.target.value),
              onKeyPress: e => handleKeypress(e),
            }}
          />
          <Button
            className={styles.plusButton}
            onClick={() => {
              verifyAndSetVAlue(generateRoomName());
            }}
          >
            <ShuffleIcon />
          </Button>
        </div>
        <div className={styles.confButtons}>
          {/* <AuthModal {...props} setOpen={setOpen} buttons={props.buttons} /> */}
          <>
            <modal.Component title="Vous êtes l’organisateur de la réunion ?">
              <p>
                <small>
                  Nous avons besoin de vérifier votre identité afin de créer la
                  conférence {props.roomName}.
                </small>
              </p>
              <button type="button">
                <span className={Authstyles.hidden} id="input-desc-error">
                  text
                </span>
                <img
                  alt="agentConnect"
                  src="/static/media/ac-btn-bleu.svg"
                  onClick={() => agentConnect(props.roomName)}
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
                  value: props.email,
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
                className={Authstyles.modalButtons}
                onClick={() => mailSender(props.roomName)}
              >
                <span className={Authstyles.hidden} id="input-desc-error">
                  text
                </span>
                {buttonMsg}
              </Button>
              {msg}
              {props.isWhitelisted === false ? (
                <p>
                  <Badge severity="error">
                    votre adresse email n'est pas valide. Merci de saisir votre
                    adresse email professionelle.
                  </Badge>
                </p>
              ) : null}
              {props.isWhitelisted === true ? (
                <p>
                  <Badge severity="success">Message envoyé.</Badge>
                </p>
              ) : null}
            </modal.Component>
            <div className={Authstyles.buttons}>
              <Button
                type="submit"
                onClick={handle}
                className={Authstyles.button}
                disabled={roomNameConstraintOk(props.roomName) ? false : true}
              >
                Rejoindre ou créer
              </Button>
              <br />
              {props.buttons ? (
                <div id="Calendar">
                  <CalendarModalComponent {...props} />
                  <Button
                    className={Authstyles.button}
                    nativeButtonProps={{ id: 'copyButton' }}
                    onClick={copyLink}
                  >
                    Copier le lien
                  </Button>
                </div>
              ) : null}
            </div>
          </>
          <Button
            className={styles.plusButton}
            onClick={() => props.setButtons(!props.buttons)}
            nativeButtonProps={{ id: 'plusButton' }}
          >
            {props.buttons ? down : up}
          </Button>
        </div>
      </form>
      <p>{message}</p>
      <Badge severity="info">
        Actuellement, il y a 0 conférences et 0 participants.
      </Badge>
      <hr />
      <Alert
        closable={false}
        description="Il est recommandé de ne pas dépasser 40 participants par conférence pour
        optimiser le confort de vos différents échanges."
        severity="info"
        small
        title=""
      />
      <br />
      <p>
        En savoir plus sur la <strong>WebConf</strong> de l'Etat
      </p>
      <div className={fr.cx('fr-accordions-group')}>
        <Accordion label="Pré-requis">Content of the Accordion 1</Accordion>
        <Accordion label="Démarrer avec la WebConf">
          Content of the Accordion 2
        </Accordion>
        <Accordion label="Ressources supplémentaires">
          Content of the Accordion 1
        </Accordion>
        <Accordion label="le MOOC de la WebConf">
          Content of the Accordion 2
        </Accordion>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <AlertMui />
      </Snackbar>
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

function generateRoomName() {
  return (
    Math.random().toString(36).slice(2).toUpperCase() +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10)
  );
}
