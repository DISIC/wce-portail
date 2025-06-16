import { JitsiMeeting } from '@jitsi/react-sdk';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Feedback from '../Feedback/Feedback';

// type JitsiMeetProps = { roomName: string };

export default function JitsiMeet() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const { roomName } = useParams();

    const navigate = useNavigate();

    const handleJitsiIFrameRef1 = (iframeRef: HTMLElement) => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.position = 'absolute';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '100%';
        iframeRef.style.width = '100%';
    };

    const onClose = () => {
        setOpen(false);
        navigate('/');
    };

    return (
        <>
            {/* <Feedback
                open={open}
                onClose={onClose}
                value={value}
                setValue={setValue}
                roomName={roomName}
            /> */}
            <JitsiMeeting
                domain={import.meta.env.VITE_JITSI_DOMAIN}

                roomName={roomName ? roomName : ''}
                getIFrameRef={handleJitsiIFrameRef1}
                onApiReady={externalApi => {
                    // handleRecordingStatus(externalApi);
                }}
                onReadyToClose={onClose}
            />
        </>
    );
}
