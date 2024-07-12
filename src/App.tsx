import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import { useState, useEffect, ReactNode } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useParams,
} from 'react-router-dom';
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
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import PlanDuSite from './pages/PlanDuSite/PlanDuSite';
import jwtDecode from 'jwt-decode';

type errorObj = {
  message: string;
  error: {
    status: string;
    stack: string;
  };
};

interface JwtPayload {
  exp: number;
}

function App() {
  const [roomName, setRoomName] = useState('');
  const [jwt, setJwt] = useState(null);
  const [hide, setHide] = useState(false);
  const [error, setError] = useState<errorObj>({
    message: "la page que vous demandez n'existe pas",
    error: { status: '404', stack: '' },
  });
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState();
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [conferenceNumber, setConferenceNumber] = useState(0);
  const [participantsNumber, setparticipantsNumber] = useState(0);
  const [msg, setMsg] = useState<ReactNode>(<></>);

  const sendEmail = (roomName: string) => {
    api
      .post('conference/create/byemail', { roomName, email: email })
      .then(res => {
        if (res.data.error) {
          setError({
            message: "la page que vous demandez n'existe pas",
            error: { status: '404', stack: '' },
          });
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
            setError({
              message: "la page que vous demandez n'existe pas",
              error: { status: '404', stack: '' },
            });
            navigate('/error');
          } else {
            setError({
              message: "la page que vous demandez n'existe pas",
              error: { status: '500', stack: '' },
            });
            navigate('/error');
          }
        }
      });
  };

  // const { exp } = jwtDecode(
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjQwMDAwMDAwMDB9.MtC2hJ9IZD0vpaW1algbUCDvd6HLXtJ6ayv_jqZfQY'
  // ) as JwtPayload;
  // console.log(exp);

  const verifyAccessToken = () => {
    console.log('tatatattaat');
    if (
      localStorage.getItem('auth') &&
      localStorage.getItem('auth') !== 'false'
    ) {
      const { exp } = jwtDecode(
        localStorage.getItem('auth') as string
      ) as JwtPayload;
      if (Date.now() <= exp * 1000) {
        setAuthenticated(true);
      } else {
        api
          .get('authentication/refreshToken')
          .then(res => {
            return localStorage.setItem('auth', res.data.accessToken);
          })
          .catch(err => {
            localStorage.setItem('auth', 'false');
            return setAuthenticated(false);
          });
      }
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    verifyAccessToken();
    setInterval(verifyAccessToken, 1000 * 3600);
  }, []);

  useEffect(() => {
    api
      .get('/stats/homePage')
      .then(res => {
        if (!res.data.authenticated) {
          // setAuthenticated(false);
        }
        setConferenceNumber(res.data.conf);
        setparticipantsNumber(res.data.part);
      })
      .catch(error => {
        setMsg(
          <Badge noIcon severity="error">
            erreur: les statistiques ne sont pas récupérables
          </Badge>
        );
      });
  }, []);

  const joinConference = (roomName: string) => {
    api
      .get(`/${roomName}`)
      .then(res => {
        if (res.data.error) {
          setError({
            message: "la page que vous demandez n'existe pas",
            error: { status: '404', stack: '' },
          });
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
          setJwt(res.data.jwt);
          console.log('--------------------', res.data.jwt);
          return navigate(`/${res.data.roomName}`, {
            replace: true,
          });
          // return window.location.reload();
        } else {
          if (!res.data.error && !res.data.login) {
            setJwt(null);
            return navigate(`/${roomName}`);
          } else {
            if (res.data.login) {
              setError({
                message: "Vous n'etes pas authentifié.",
                error: { status: '404', stack: '' },
              });
              return navigate('/error');
            }
          }
        }
      })
      .catch((error: any) => {
        if (error.response) {
          setError({
            message: "la page que vous demandez n'existe pas",
            error: { status: '404', stack: '' },
          });
          navigate('/error');
        } else {
          if (error.request) {
            setError({
              message: "la page que vous demandez n'existe pas",
              error: { status: '404', stack: '' },
            });
            navigate('/error');
          } else {
            setError({
              message: "la page que vous demandez n'existe pas",
              error: { status: '500', stack: '' },
            });
            navigate('/error');
          }
        }
      });
  };

  const login = () => {
    setModal(!modal);
  };

  function isAlphanumeric(str: any) {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  const Wrapper = () => {
    const { roomName } = useParams();

    if (isAlphanumeric(roomName)) {
      return (
        <Jitsi_meet
          joinConference={joinConference}
          setError={setError}
          setMsg={setMsg}
          setRoomName={setRoomName}
          jwt={jwt}
        />
      );
    }
    // else {
    //   return  <Navigate to={`/${roomName}`} />;
    // }
    return <></>;
  };

  const OtherRoutes = () => {
    api
      .get(`/backend/${window.location.href}`)
      .then(res => {
        <Navigate to={`/${roomName}`} replace={true} />;
        // window.location.href = `/${roomName}`;
        return window.location.reload();
      })
      .catch(res => {
        <Navigate to={`/error`} replace={true} />;
        //  window.location.href = `/error`;
        return window.location.reload();
      });

    return <></>;
  };

  return (
    <MuiDsfrThemeProvider>
      <Routes>
        <Route path=":roomName" element={<Wrapper />} />
        <Route
          path="login_callback"
          element={
            <LoginCallback
              setAuthenticated={setAuthenticated}
              setError={setError}
            />
          }
        />
        <Route
          path="logout_callback"
          element={
            <LogoutCallback
              setAuthenticated={setAuthenticated}
              setError={setError}
            />
          }
        />
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
                joinConference={joinConference}
                authenticated={authenticated}
                conferenceNumber={conferenceNumber}
                participantNumber={participantsNumber}
              />
            }
          />
          <Route
            path="/wce-api/*"
            element={
              <Navigate
                to={`/${import.meta.env.VITE_BASE_URL}`}
                replace={true}
              />
            }
          />
          <Route path="error" element={<Error error={error} />} />
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
              <StaticPagesBuilder
                markDown={Accessibilite}
                contentTable={true}
              />
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
          <Route path="plan-du-site" element={<PlanDuSite />} />
        </Route>
      </Routes>
    </MuiDsfrThemeProvider>
  );
}

export default App;
