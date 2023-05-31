import { JitsiMeeting } from '@jitsi/react-sdk';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './jitsi_meet.module.css';
import jwt_decode from 'jwt-decode';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { ReactNode } from 'react';

type errorObj = {
  message: string;
  error?: {
    status: string;
    stack: string;
  };
};

interface JitsiMeetProps {
  setError: (e: errorObj) => void;
  joinConference: (e: string) => void;
  setMsg: (e: ReactNode) => void;
}

const Jitsi_meet = ({ setError, joinConference, setMsg }: JitsiMeetProps) => {
  const apiRef = useRef();
  const [logItems, updateLog] = useState<any[]>();
  const [knockingParticipants, updateKnockingParticipants] = useState<any[]>(
    []
  );
  const navigate = useNavigate();
  const { roomNamevar } = useParams();
  const jwt = window.location.search.split('=')[1];
  const roomName = roomNamevar;

  // const printEventOutput = payload => {
  //   updateLog(items => [...items, JSON.stringify(payload)]);
  // };

  // const handleAudioStatusChange = (payload, feature) => {
  //   if (payload.muted) {
  //     updateLog(items => [...items, `${feature} off`]);
  //   } else {
  //     updateLog(items => [...items, `${feature} on`]);
  //   }
  // };

  // const handleChatUpdates = (payload: any) => {
  //   if (payload.isOpen || !payload.unreadCount) {
  //     return;
  //   }
  //   apiRef.current.executeCommand('toggleChat');
  //   updateLog((items: any) => [
  //     ...items,
  //     `you have ${payload.unreadCount} unread messages`,
  //   ]);
  // };

  // const handleKnockingParticipant = (payload: any) => {
  //   updateLog(items => [...items, JSON.stringify(payload)]);
  //   updateKnockingParticipants(participants => [
  //     ...participants,
  //     payload?.participant,
  //   ]);
  // };

  const handleJitsiIFrameRef1 = (iframeRef: any) => {
    iframeRef.style.border = '10px solid #3d3d3d';
    iframeRef.style.position = 'absolute';
    iframeRef.style.background = '#3d3d3d';
    iframeRef.style.height = '100%';
    iframeRef.style.width = '100%';
  };

  // const handleApiReady = (apiObj: any) => {
  //   apiRef.current = apiObj;
  //   apiRef.current.on('knockingParticipant', handleKnockingParticipant);
  //   apiRef.current.on('audioMuteStatusChanged', payload =>
  //     handleAudioStatusChange(payload, 'audio')
  //   );
  //   apiRef.current.on('videoMuteStatusChanged', payload =>
  //     handleAudioStatusChange(payload, 'video')
  //   );
  //   apiRef.current.on('raiseHandUpdated', printEventOutput);
  //   apiRef.current.on('titleViewChanged', printEventOutput);
  //   apiRef.current.on('chatUpdated', handleChatUpdates);
  //   apiRef.current.on('knockingParticipant', handleKnockingParticipant);
  // };

  const handleReadyToClose = () => {
    if (roomNameConstraintOk(roomName)) {
      //setHide(false);
    }
    navigate('/feedback');
  };

  function roomNameConstraintOk(roomName: string | undefined) {
    /**
     * Verify if the room name is valid
     * @param {String} roomName The room name
     * @return {Boolean}        True if the room name is valid, false otherwise
     */
    const regex = new RegExp(
      '^(?=(?:[a-zA-Z0-9]*[a-zA-Z]))(?=(?:[a-zA-Z0-9]*[0-9]){3})[a-zA-Z0-9]{10,}$'
    );
    return regex.test(roomName as string);
  }

  const renderSpinner = () => {
    return (
      <div className={styles.progress}>
        <CircularProgress style={{ height: '300px', width: '300px' }} />
      </div>
    );
  };

  let decodedToken: any;

  useEffect(() => {
    console.log(roomName, jwt);
    if (roomName && jwt) {
      try {
        decodedToken = jwt_decode(jwt);
        const currentDate = new Date();
        if (
          decodedToken.room === undefined ||
          decodedToken.room !== roomName ||
          decodedToken.exp * 1000 < currentDate.getTime()
        ) {
          setError({
            message:
              "le jwt est expiré ou le nom de la conférence n'est pas valide",
            error: { status: 'bad request page not found', stack: '' },
          });
          navigate('/error');
        }
      } catch (error) {
        setError({
          message: "le jwt n'est pas valid",
          error: { status: 'bad request page not found', stack: '' },
        });
        navigate('/error');
      }

      if (!roomNameConstraintOk(roomName)) {
        setError({
          message: "la page que vous demandez n'existe pas",
          error: { status: 'bad request page not found', stack: '' },
        });
        navigate('/error');
      }
    } else {
      if (roomName === 'error') {
        navigate('/error');
      }
      if (!roomNameConstraintOk(roomName)) {
        setMsg(
          <Badge
            noIcon
            severity="error"
          >{`Le nom de la conférence ${roomName} n'est pas valide. Merci de respecter la convention de nommage indiquée dans le formulaire.`}</Badge>
        );
        navigate('/');
      } else {
        joinConference(roomName as string);
      }
    }
  }, [roomNamevar]);

  return (
    <>
      <JitsiMeeting
        domain={import.meta.env.VITE_JITSI_DOMAIN}
        roomName={roomName as string}
        jwt={jwt ? jwt : undefined}
        spinner={renderSpinner}
        // config={{
        //   hideConferenceSubject: false,
        // }}
        onApiReady={externalApi => {
          if (typeof (window as any).setupRenderer === 'function') {
            (window as any).setupRenderer(externalApi, {});
          }
          //handleApiReady(externalApi);
        }}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={handleJitsiIFrameRef1}
      />
    </>
  );
};

export default Jitsi_meet;
