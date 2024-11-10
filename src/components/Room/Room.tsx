import Peer, { DataConnection, MediaConnection } from "peerjs";
import {
  Button,
  Label,
  Video,
  VideoContainer,
  VideoWrapper,
} from "./Room.styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Room = () => {
  const { roomId } = useParams<{ roomId?: string }>();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [remoteUsername, setRemoteUsername] = useState<string | null>(null);
  const username = location.state?.username || "Аноним";

  useEffect(() => {
    if (!roomId) {
      console.error("ID комнаты не найден");
      return;
    }
    const peer = new Peer(roomId);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
        }

        // Обработка входящих видеовызовов
        peer.on("call", (call: MediaConnection) => {
          call.answer(stream);
          call.on("stream", (remoteStream: MediaStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        });

        peer.on("connection", (conn: DataConnection) => {
          conn.on("data", (data) => {
            if (typeof data === "string") {
              setRemoteUsername(data);
            }
          });
        });

        peer.on("open", () => {
          const call = peer.call(roomId, stream);

          const conn = peer.connect(roomId);
          conn.on("open", () => {
            conn.send(username);
          });

          call.on("stream", (remoteStream: MediaStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        });
      })
      .catch((err: any) => {
        console.error("Не удалось получить локальный поток", err);
      });

    return () => {
      peer.destroy();
    };
  }, [roomId, username]);

  const handleLeaveRoom = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <h3> Номер комнаты:{roomId}</h3>
      </div>
      <VideoContainer>
        <VideoWrapper>
          <Label>{username}</Label>
          <Video ref={localVideoRef} muted autoPlay />
        </VideoWrapper>
        <VideoWrapper>
          <Label>{remoteUsername}</Label>
          <Video ref={remoteVideoRef} autoPlay />
        </VideoWrapper>
      </VideoContainer>
      <Button onClick={handleLeaveRoom}>Выйти</Button>
    </div>
  );
};

export default Room;
