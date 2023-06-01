import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import Jitsi from './pages/login/Jitsi';
import { useState, useEffect, ReactNode } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FAQ from './pages/FAQ/FAQ.md';
import DonneesPerso from './pages/DonneesPerso/DonneesPerso.md';
import Contact from './pages/Contact/Contact.md';
import Cgu from './pages/Cgu/Cgu.md';
import Apropos from './pages/Apropos/Apropos.md';
import Accessibilite from './pages/Accessibilite/Accessibilite.md';
import Mentionslegales from './pages/MentionsLegales/MentionsLegales.md';
import StaticPagesBuilder from './pages/staticPagesBuilder/StaticPagesBuilder';
import Feedback from './pages/feedback/Feedback';
import BrowserTest from './pages/browserTest/BrowserTest';
import Jitsi_meet from './pages/Jitsi_meet/Jitsi_meet';
import api from './axios/axios';
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import LoginCallback from './pages/login/LoginCallback';
import LogoutCallback from './pages/login/LogoutCallback';
import Error from './pages/Error/Error';
type errorObj = {
  message: string;
  error?: {
    status: string;
    stack: string;
  };
};
function App() {
  const [roomName, setRoomName] = useState('');
  const [jwt, setJwt] = useState('');
  const [hide, setHide] = useState(false);
  const [error, setError] = useState<errorObj>({
    message: "la page que vous demandez n'existe pas",
    error: { status: 'bad request page not found', stack: '' },
  });
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState();
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [conferenceNumber, setConferenceNumber] = useState(0);
  const [participantsNumber, setparticipantsNumber] = useState(0);
  const [msg, setMsg] = useState<ReactNode>(<></>);

  const sendEmail = (room: string) => {
    api
      .post('conference/create/byemail', { conference: room, email: email })
      .then(res => {
        if (res.data.error) {
          setError(res.data);
          navigate('/error');
        } else {
          setIsWhitelisted(res.data.isWhitelisted);
        }
      })
      .catch(error => {
        if (error.response) {
          setIsWhitelisted(false);
        } else {
          if (error.request) {
            navigate('/error');
          } else {
            navigate('/error');
          }
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem('auth') == 'true') {
      setAuthenticated(true);
    }
    if (localStorage.getItem('auth') == 'false') {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    api
      .get('/stats/homePage')
      .then(res => {
        if (!res.data.authenticated) {
          setAuthenticated(false);
        }
        setConferenceNumber(res.data.conf);
        setparticipantsNumber(res.data.part);
      })
      .catch(error => {
        if (error.response) {
          setMsg(
            <Badge noIcon severity="error">
              erreur: les statistiques ne sont pas récupérables
            </Badge>
          );
        } else {
          if (error.request) {
            setError({
              message:
                "erreur d'envoi de la requete pour récupérer les statistiques",
              error: { status: '', stack: '' },
            });
            navigate('/error');
          } else {
            setError({
              message:
                "erreur d'envoi de la requete pour récupérer les statistiques",
              error: { status: '', stack: '' },
            });
            navigate('/error');
          }
        }
      });
  }, []);

  const joinConference = (roomName: string) => {
    api
      .get(`/${roomName}`)
      .then(res => {
        if (res.data.error) {
          setError(res.data);
          navigate('/error');
        } else {
          setRoomName(roomName);
          setJwt(res.data.jwt);
          if (res.data.jwt) {
            setHide(true);
          }
          return res;
        }
      })
      .then((res: any) => {
        if (res.data.jwt) {
          navigate(`/${res.data.roomName}?jwt=${res.data.jwt}`, {
            replace: true,
          });
          return window.location.reload();
        } else {
          if (!res.data.error && !res.data.login) {
            return navigate(`/${roomName}`);
          } else {
            if (res.data.login) {
              if (window.location.pathname.includes('/login')) {
                window.location.reload();
              }
              return navigate(`/login/${roomName}`);
            }
          }
        }
      })
      .catch(error => {
        if (error.response) {
          setError(error.response);
          navigate('/error');
        } else {
          if (error.request) {
            navigate('/error');
          } else {
            navigate('/error');
          }
        }
      });
  };

  const login = () => {
    setModal(!modal);
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setError={setError}
          />
        }
      >
        <Route
          index
          element={
            <Home
              roomName={roomName}
              setRoomName={setRoomName}
              setIsWhitelisted={setIsWhitelisted}
              isWhitelisted={isWhitelisted}
              email={email}
              setEmail={setEmail}
              sendEmail={sendEmail}
            />
          }
        />
        <Route
          path="login_callback"
          element={
            <LoginCallback
              setAuthenticated={setAuthenticated}
              setError={setError}
            />
          }
        />
        <Route path="error" element={<Error error={error} />} />
        <Route
          path="logout_callback"
          element={
            <LogoutCallback
              setAuthenticated={setAuthenticated}
              setError={setError}
            />
          }
        />
        <Route path="feedback" element={<Feedback setError={setError} />} />
        <Route path="browser_test" element={<BrowserTest />} />
        <Route
          path="faq"
          element={<StaticPagesBuilder markDown={FAQ} contentTable={true} />}
        />
        <Route
          path="donneespersonnelles"
          element={
            <StaticPagesBuilder markDown={DonneesPerso} contentTable={true} />
          }
        />
        <Route
          path="contact"
          element={
            <StaticPagesBuilder markDown={Contact} contentTable={false} />
          }
        />
        <Route
          path="apropos"
          element={
            <StaticPagesBuilder markDown={Apropos} contentTable={true} />
          }
        />
        <Route
          path="cgu"
          element={<StaticPagesBuilder markDown={Cgu} contentTable={true} />}
        />
        <Route
          path="accessibilite"
          element={
            <StaticPagesBuilder markDown={Accessibilite} contentTable={true} />
          }
        />
        <Route
          path="mentionslegales"
          element={
            <StaticPagesBuilder
              markDown={Mentionslegales}
              contentTable={true}
            />
          }
        />
      </Route>
      <Route
        path=":roomName"
        element={
          <Jitsi_meet
            joinConference={joinConference}
            setError={setError}
            setMsg={setMsg}
          />
        }
      />
    </Routes>
  );
}

export default App;
