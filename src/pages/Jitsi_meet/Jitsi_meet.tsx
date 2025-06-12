import { JitsiMeeting } from '@jitsi/react-sdk';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './jitsi_meet.module.css';
import jwt_decode from 'jwt-decode';
import { ReactNode } from 'react';
import api from '../../axios/axios';
import { useRef } from 'react';
import Swal from 'sweetalert2';

type errorObj = {
  message: string;
  error: {
    status: string;
    stack: string;
  };
};
interface JitsiMeetProps {
  setError: (e: errorObj) => void;
  joinConference: (e: string) => void;
  setMsg: (e: ReactNode) => void;
  setRoomName: (e: string) => void;
  jwt: any;
}

const Jitsi_meet = ({
  setError,
  joinConference,
  setMsg,
  setRoomName,
  jwt,
}: JitsiMeetProps) => {
  const navigate = useNavigate();
  const { roomName } = useParams();
  const jwt1 = jwt ? jwt : window.location.search.split('=')[1];

  const handleJitsiIFrameRef1 = (iframeRef: any) => {
    iframeRef.style.border = '10px solid #3d3d3d';
    iframeRef.style.position = 'absolute';
    iframeRef.style.background = '#3d3d3d';
    iframeRef.style.height = '100%';
    iframeRef.style.width = '100%';
  };

  console.log('jwt', jwt);

  const handleReadyToClose = () => {
    navigate('/feedback');
  };

  //visioreplay------------------------------------------------
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const checkVideoInterval = useRef<NodeJS.Timeout | null>(null);
  const checkTimeout = useRef<NodeJS.Timeout | null>(null);

  const showLoadingToast = (message: string) => {
    Swal.fire({
      title: message,
      showCloseButton: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const startVideo = async () => {
    const conference_name = roomName;

    const status = "started";
    const message = "Utilisateur commence l'enregistrement";

    try {
      const response = await fetch(`${API_BASE_URL}/api/visioreplay/start_recording`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, message, conference_name }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Replay créé avec status:", result);
      } else {
        const errorData = await response.json();
        console.error("Erreur :", errorData);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const checkVideo = async () => {
    const conference_name = roomName!;

    try {
      const response = await fetch(`${API_BASE_URL}/api/visioreplay/findReplay/${encodeURIComponent(conference_name)}`);
      const data = await response.json();

      if (data === "terminated") {
        Swal.fire({
          title: 'Succès !',
          text: `La vidéo pour "${conference_name}" a été enregistrée avec succès.`,
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true
        });

        if (checkVideoInterval.current) clearInterval(checkVideoInterval.current);
        if (checkTimeout.current) clearTimeout(checkTimeout.current);
        checkVideoInterval.current = null;
        checkTimeout.current = null;

      } else if (data === "error-uploading-rsync") {
        Swal.fire({
          title: 'Erreur !',
          text: `Une erreur est survenue lors de l'enregistrement de la vidéo pour "${conference_name}". Veuillez contacter le support.`,
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true
        });

        if (checkVideoInterval.current) clearInterval(checkVideoInterval.current);
        if (checkTimeout.current) clearTimeout(checkTimeout.current);
        checkVideoInterval.current = null;
        checkTimeout.current = null;
      }

    } catch (error) {
      console.error('Erreur lors de la vérification du replay :', error);
    }
  };

  const handleRecordingStatus = (api: any) => {
    let isRecordingStarted = false;

    api.addEventListener('recordingStatusChanged', (event: any) => {
      const isRecordingOn = event.on;
      const error = event.error;

      console.info("Changement de statut d'enregistrement :", event);

      if (isRecordingOn) {
        console.info("Enregistrement démarré");
        isRecordingStarted = true;
        startVideo();

      } else if (error) {
        console.error(`Erreur d'enregistrement : ${error}`);

      } else if (isRecordingStarted) {
        console.info("Enregistrement arrêté");
        showLoadingToast("Upload de l'enregistrement en cours ...");

        if (!checkVideoInterval.current) {
          checkVideoInterval.current = setInterval(() => {
            console.log("Vérification en cours du statut du replay...");
            checkVideo();
          }, 1000);

          checkTimeout.current = setTimeout(() => {
            clearInterval(checkVideoInterval.current as NodeJS.Timeout);
            checkVideoInterval.current = null;
            checkTimeout.current = null;
            Swal.fire({
              title: 'Erreur !',
              text: `Une erreur est survenue lors de l'enregistrement de la vidéo. Veuillez contacter le support.`,
              icon: 'error',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              showCloseButton: true
            });
          }, 600000); // 10 min
        }
      }
    });
  };
  //----------------------------------------------------------

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
    if (roomName && jwt) {
      if (!roomNameConstraintOk(roomName)) {
        setError({
          message: `Le nom de la conférence ${roomName} n'est pas valide. Merci de respecter la convention de nommage indiquée dans le formulaire.`,
          error: { status: '404', stack: '' },
        });
        navigate('/error');
      }

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
            error: { status: '404', stack: '' },
          });
          navigate('/error');
        }
      } catch (error) {
        setError({
          message: "le jwt n'est pas valid",
          error: { status: '404', stack: '' },
        });
        navigate('/error');
      }
    } else {
      if (roomName === 'error') {
        navigate('/error');
      }
      if (roomName && !roomNameConstraintOk(roomName)) {
        setRoomName(roomName);
        setError({
          message: `Le nom de la conférence ${roomName} n'est pas valide. Merci de respecter la convention de nommage indiquée dans le formulaire.`,
          error: { status: '404', stack: '' },
        });
        navigate('/error');
      } else {
        api.get(`/${roomName}`).then(res => {
          if (res.data.error || res.data.login) {
            return navigate('/error');
          }
          if (res.data.jwt) {
            joinConference(roomName as string);
          }
        });
      }
    }
  }, [roomName]);

  return (
    <JitsiMeeting
      domain={import.meta.env.VITE_JITSI_DOMAIN}
      roomName={roomName as string}
      jwt={jwt1 ? jwt1 : undefined}
      spinner={renderSpinner}
      // config={{
      //   hideConferenceSubject: false,
      // }}
      onApiReady={externalApi => {
        if (typeof (window as any).setupRenderer === 'function') {
          (window as any).setupRenderer(externalApi, {});
        }
        handleRecordingStatus(externalApi);
        //handleApiReady(externalApi);
      }}
      onReadyToClose={handleReadyToClose}
      getIFrameRef={handleJitsiIFrameRef1}
    />
  );
};

export default Jitsi_meet;
